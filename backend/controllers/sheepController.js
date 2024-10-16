const { where } = require("sequelize");
const breed = require("../models/breeds");
const chambers = require("../models/chambers");
const sequelize = require("../models/connection");
const sheep = require("../models/sheep");
const calculateSheepAge = require("../funs/calculateAge");
const growing = require("../models/growing");

// nchuf lekbash
class sheepController {
  static async getallsheeps(req, res) {
    const [results, metadata] = await sequelize.query(
      " SELECT الأغنام.رقم_الغنم, الأغنام.تاريخ_الميلاد, الأغنام.تاريخ_الدخول, الأغنام.الجنس, الأغنام.العمر, الأغنام.الوزن, السلالات.اسم_السلالة, الأغنام.نوع_الإنتاج, الأغنام.رقم_الأم, الأغنام.رقم_الأب, أهداف_التربية.اسم_الهدف, الأغنام.مرحلة_النمو, الأغنام.التلقيحات_والتحصينات, الأغنام.الاحتياج_الغذائي, الأغنام.الحالة_الظاهرة, الأغنام.التكلفة_المحلية, غرف_الأغنام.اسم_الغرفة FROM الأغنام INNER JOIN غرف_الأغنام ON الأغنام.رقم_الغرفة = غرف_الأغنام.رقم_الغرفة INNER JOIN أهداف_التربية ON الأغنام.الهدف_من_التربية = أهداف_التربية.رقم_الهدف INNER JOIN السلالات ON الأغنام.رقم_السلالة = السلالات.رقم_السلالة"

      /*
      "SELECT الأغنام.*[except رقم_الغرفة],غرف_الأغنام.اسم_الغرفة FROM الأغنام INNER JOIN غرف_الأغنام ON الأغنام.رقم_الغرفة = غرف_الأغنام.رقم_الغرفة  "
    */
    );
    /*
    const today = new Date();
    const currentMonth = today.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
    const currentYear = today.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    results.forEach((sheep) => {
      const birthDate = new Date(sheep.تاريخ_الميلاد);
      const ageInMilliseconds = today - birthDate;
      const ageInMonths = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * daysInMonth)); // Calculate age in months
      const remainingDays = Math.floor((ageInMilliseconds % (1000 * 60 * 60 * 24 * daysInMonth)) / (1000 * 60 * 60 * 24)); // Calculate remaining days
      sheep.العمر_بالشهور = `${ageInMonths} شهر و ${remainingDays} يوم`;
  }),
  */
    calculateSheepAge(results);

    res.send(results);
  }

  //zyadat kabsh
  static async addSheep(req, res) {
    const {
      رقم_الغنم,
      تاريخ_الميلاد,
      تاريخ_الدخول,
      الجنس,
      العمر,
      الوزن,
      رقم_السلالة,
      رقم_الغرفة,
      نوع_الإنتاج,
      رقم_الأم,
      رقم_الأب,
      الهدف_من_التربية,
      مرحلة_النمو,
      التلقيحات_والتحصينات,
      الاحتياج_الغذائي,
      الحالة_الظاهرة,
      التكلفة_المحلية,
      حالة_الغرفة,
    } = req.body;

    const newSheep = await sheep.create({
      رقم_الغنم: رقم_الغنم,
      تاريخ_الميلاد: تاريخ_الميلاد,
      تاريخ_الدخول: تاريخ_الدخول,
      الجنس: الجنس,
      العمر: العمر,
      الوزن: الوزن,
      رقم_السلالة: رقم_السلالة,
      رقم_الغرفة: رقم_الغرفة,
      نوع_الإنتاج: نوع_الإنتاج,
      رقم_الأم: رقم_الأم,
      رقم_الأب: رقم_الأب,
      الهدف_من_التربية: الهدف_من_التربية,
      مرحلة_النمو: مرحلة_النمو,
      التلقيحات_والتحصينات: التلقيحات_والتحصينات,
      الاحتياج_الغذائي: الاحتياج_الغذائي,
      الحالة_الظاهرة: الحالة_الظاهرة,
      التكلفة_المحلية: التكلفة_المحلية,
      حالة_الغرفة: حالة_الغرفة,
    });

    const breedID = newSheep.رقم_السلالة;
    const roomId = newSheep.رقم_الغرفة;
    await chambers.increment("عدد_الأغنام", { where: { رقم_الغرفة: roomId } });
    await breed.increment("عدد_الأغنام", { where: { رقم_السلالة: breedID } });
    await sequelize.sync();
    await growing.increment("عدد_الأغنام",{ where:{رقم_المرحلة:newSheep.مرحلة_النمو}})

    res.send(newSheep);
  }

  // tbedel kabsh
  static async changeSRoom(req, res) {
    const { رقم_الغرفة: newRoomid, رقم_الغنم } = req.body;

    const sheepData = await sheep.findOne({ where: { رقم_الغنم } });
    const oldRoomId = sheepData.رقم_الغرفة;

    await sheep.update({ رقم_الغرفة: newRoomid }, { where: { رقم_الغنم } });

    await chambers.increment("عدد_الأغنام", {
      where: { رقم_الغرفة: newRoomid },
    });
    await chambers.decrement("عدد_الأغنام", {
      where: { رقم_الغرفة: oldRoomId },
    });

    res.json({success:"room changed successfully"});
  }

  // deleting kasbh

  static async deleteSheep(req, res) {
    const { رقم_الغنم } = req.body;

    const deadSheep = await sheep.findOne({ where: { رقم_الغنم } });

    const sheepNum = deadSheep.رقم_الغنم;
    const sheepBreed = deadSheep.رقم_السلالة;
    const sheepRoom = deadSheep.رقم_الغرفة;
    await sheep.destroy({ where: { رقم_الغنم: sheepNum } });

    await chambers.decrement("عدد_الأغنام", {
      where: { رقم_الغرفة: sheepRoom },
    });
    await breed.decrement("عدد_الأغنام", {
      where: { رقم_السلالة: sheepBreed },
    });

    res.send("sheep dead seuccessfully");
  }
}

/*
  
  static async addSheep(req, res) {
    /*
    const رقم_الغنم  //req.body.sheepnum;
    const تاريخ_الميلاد // req.body.birthday;
    const تاريخ_الدخول  //req.body.entrydate;
    const الجنس // req.body.sex;
    const العمر // req.body.age;
    const الوزن // req.body.weight;
    const رقم_السلالة // = req.body.breednum;
    const رقم_الغرفة  //= req.body.chambernum;
    const نوع_الإنتاج  //= req.body.producetype;
    const رقم_الأم  //= req.body.momnum;
    const رقم_الأب  //= req.body.dadnum;
    const  الهدف_من_التربية  //=  req.body.raisinggoal;
    const مرحلة_النمو //= req.body.raisingperiod;
    const التلقيحات_والتحصينات //= req.body.vaccines;
    const الاحتياج_الغذائي //= req.body.food;
    const الحالة_الظاهرة //= req.body.appearance;
    const التكلفة_المحلية //= req.body.cost;
    const حالة_الغرفة //= req.body.chamberstate;
    */
/*
    const { رقم_الغنم,
      تاريخ_الميلاد,
      تاريخ_الدخول,
      الجنس,
      العمر,
      الوزن,
      رقم_السلالة,
      رقم_الغرفة,
      نوع_الإنتاج,
      رقم_الأم,
      رقم_الأب,
      الهدف_من_التربية,
      مرحلة_النمو,
      التلقيحات_والتحصينات,
      الاحتياج_الغذائي,
      الحالة_الظاهرة,
      التكلفة_المحلية,
      حالة_الغرفة} = req.body;





    var added = await SheepModel.addsheep(
      رقم_الغنم,
      تاريخ_الميلاد,
      تاريخ_الدخول,
      الجنس,
      العمر,
      الوزن,
      رقم_السلالة,
      رقم_الغرفة,
      نوع_الإنتاج,
      رقم_الأم,
      رقم_الأب,
      الهدف_من_التربية,
      مرحلة_النمو,
      التلقيحات_والتحصينات,
      الاحتياج_الغذائي,
      الحالة_الظاهرة,
      التكلفة_المحلية,
      حالة_الغرفة
    );

    if (added) {
      res.send(added);
    } else {
      // Handle error if needed
      console.log("ZBINJOOO");
    }
  }
}
*/

module.exports = sheepController;
