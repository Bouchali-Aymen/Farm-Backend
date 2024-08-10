const sequelize = require("../models/connection");
const food = require("../models/food");
const nuttrtion = require("../models/nuttrition");

class foodController {

  static async getAllFoods(req, res) {
    const [foods, metadata] = await sequelize.query(
        "SELECT id, العلف, CONCAT(الكمية, ' kg') AS 'الكمية',  تكلفة_الكيلو_الواحد ,  CONCAT(التكلفة, ' Da') AS 'التكلفة' FROM اعلاف"
    );

    res.send(foods);
}



  /*
  static async getAllFoods(req, res) {
    const ff = await food.findAll();
    res.send(ff);
  
  }
    */

  static async addFood(req, res) {
    const {  العلف, الكمية , التكلفة } = req.body;

    const existingfood = await food.findOne({ where: { العلف: العلف } });

    if (existingfood) {
      const newQuantity = existingfood.الكمية + الكمية;
      const newTotalprice = existingfood.التكلفة + التكلفة;
      const newPrice = (newTotalprice / newQuantity).toFixed(4);

      await existingfood.update({
        الكمية: newQuantity,
        التكلفة: newTotalprice,
        تكلفة_الكيلو_الواحد : newPrice
      });

      res.send(" values updated succefully");
    } else {
      await food.create({
        
        العلف: العلف,
        الكمية: الكمية,
        التكلفة: التكلفة,
        تكلفة_الكيلو_الواحد:التكلفة/الكمية
      });
      res.send(" 3alf succefully added ");
    }

   
  }

  static async removefood(req, res) {
    const { العلف } = req.body;

    const daedfood = await food.findOne({ where: { العلف: العلف } });
     
     if(daedfood)
     {
      const  deadid = daedfood.id

      const nutriDeadfood = await nuttrtion.findOne({where : {اعلاف : deadid}})
      if(nutriDeadfood)
      {
        await nutriDeadfood.destroy() ;
      }


      // delete food 
      await daedfood.destroy()
      res.send(" food deleted succefully")
     }else{
      res.send("didint find any food to delete ")
     } 

    
   
  }

  static async editFood(req, res) {
    const { العلف, الكمية, التكلفة } = req.body;

    // Update the food record
    const updatedFood = await food.update(
      { الكمية, التكلفة },
      { where: { العلف } }
    );
    res.send(" 3olf eddited succefully ");
  }
}

module.exports = foodController;
