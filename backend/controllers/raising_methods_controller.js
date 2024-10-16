const sequelize = require("../models/connection");

const raising = require("../models/raising_method");

class raisingController {
  static async getAllMethods(req, res) {
    const raise = await raising.findAll();

    res.send(raise);
  }

  static async getOneMethod(req, res) {
    const goalId = req.params.goalId;
    const [result, metadata] = await sequelize.query(
      `SELECT s.رقم_الغنم AS رقم_الغنم, c.اسم_الغرفة AS اسم_الغرفة, b.اسم_السلالة AS اسم_السلالة, s.نوع_الإنتاج AS نوع_الإنتاج FROM الأغنام s INNER JOIN غرف_الأغنام c ON s.رقم_الغرفة = c.رقم_الغرفة INNER JOIN السلالات b ON s.رقم_السلالة = b.رقم_السلالة WHERE s.الهدف_من_التربية = :goalId`,
      {
        replacements: { goalId: goalId },
        type: sequelize.QueryTypes.findAll,
      }

      /*
         
           "SELECT رقم_الغنم , رقم_الغرفة , رقم_السلالة , نوع_الإنتاج FROM الأغنام INNER JOIN غرف_الأغنام ON الأغنام.رقم_الغرفة = غرف_الأغنام.رقم_الغرفة INNER JOIN السلالات ON الأغنام.رقم_السلالة = السلالات.رقم_السلالة WHERE الهدف_من_التربية = 6"
            */

      /*
             "SELECT s.رقم_الغنم AS رقم_الغنم, c.اسم_الغرفة AS اسم_الغرفة, b.اسم_السلالة AS اسم_السلالة, s.نوع_الإنتاج AS نوع_الإنتاج FROM الأغنام s INNER JOIN غرف_الأغنام c ON s.رقم_الغرفة = c.رقم_الغرفة INNER JOIN السلالات b ON s.رقم_السلالة = b.رقم_السلالة WHERE s.الهدف_من_التربية = goalId"
           */

      /*
             `SELECT s.رقم_الغنم AS رقم_الغنم, c.اسم_الغرفة AS اسم_الغرفة, b.اسم_السلالة AS اسم_السلالة, s.نوع_الإنتاج AS نوع_الإنتاج FROM الأغنام s INNER JOIN غرف_الأغنام c ON s.رقم_الغرفة = c.رقم_الغرفة INNER JOIN السلالات b ON s.رقم_السلالة = b.رقم_السلالة WHERE s.الهدف_من_التربية = goalId`,{ replacements: { goalId: goalId }, type: sequelize.QueryTypes.SELECT }
             */
    );

    res.send(result);
  }



  static async addOneMehtod(req , res){

    const {رقم_الهدف , اسم_الهدف} = req.body

     raising.create({
        رقم_الهدف : رقم_الهدف ,
        اسم_الهدف : اسم_الهدف
     })
    
     res.send(" Added seccussfully")

  }
  static async getGoals(req, res){
    const goals = await raising.findAll();
    
    res.send(goals);
  }




}

module.exports = raisingController;
