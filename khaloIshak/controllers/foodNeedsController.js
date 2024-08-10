const sequelize = require("../models/connection");
const food = require("../models/food");
const growing = require('../models/growing');
const foodNeeds = require('../models/foodNeeds'); // Ensure the correct path

class foodNeedsController {
  static async addFoodNeed(req, res) {
    try {
      const { mthode_id, المقدار_الجاف, الالياف_الخام, البروتين, الكالسيوم, الفسفور, المغنيزيوم, علف } = req.body;
      
      const foodNeedAdded = await foodNeeds.create({
        mthode_id:mthode_id
        ,المقدار_الجاف :المقدار_الجاف,
         الالياف_الخام:الالياف_الخام,
          البروتين:البروتين,
         الكالسيوم:الكالسيوم,
         الفسفور:الفسفور,
         المغنيزيوم:المغنيزيوم,
         علف:علف 
      });

      const foodAdded = await food.findByPk(علف);

      if (foodNeedAdded) {
        res.send(`الاحتياج الغذائي للعلف تمت اضافته بنجاح ${foodAdded.العلف}`);
      } else {
        res.send("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }


  static async getFoodNeeds(req,res){
    const [result,metadata] = await sequelize.query(
        "SELECT مراحل_النمو.وصف_المرحلة , الاحتياج_الغذائي.المقدار_الجاف,الاحتياج_الغذائي.الالياف_الخام,الاحتياج_الغذائي.البروتين,الاحتياج_الغذائي.المغنيزيوم, الاحتياج_الغذائي.الفسفور, الاحتياج_الغذائي.الكالسيوم FROM الاحتياج_الغذائي INNER JOIN مراحل_النمو ON  الاحتياج_الغذائي.mthode_id = مراحل_النمو.رقم_المرحلة"
    )
    res.send(result);
  }
}

module.exports = foodNeedsController;