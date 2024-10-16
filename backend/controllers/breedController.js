const breed = require('../models/breeds')
const sequelize = require("../models/connection");
const { Sequelize } = require('sequelize'); // Import Sequelize for QueryTypes

class breedController {

 static async getBreeds (req , res){
    const bred = await breed.findAll()
    res.send(bred)
 }


 static async addABreed(req , res){
   const { رقم_السلالة,اسم_السلالة , عدد_الأغنام } = req.body;

     await breed.create({
      اسم_السلالة: اسم_السلالة,
    });
    res.send("added a new breed successfully");
 }

 static async getSheepsOfOneBreed(req, res) {
  try {
    const breedID = req.body.اسم_السلالة; // Use req.body for POST data
    const [result, metadata] = await sequelize.query(
      `SELECT s.رقم_الغنم, s.تاريخ_الميلاد, s.تاريخ_الدخول, s.الجنس, s.العمر, s.الوزن, s.رقم_السلالة, s.رقم_الغرفة, s.نوع_الإنتاج, s.رقم_الأم, s.رقم_الأب, s.الهدف_من_التربية, s.مرحلة_النمو, s.التلقيحات_والتحصينات, s.الاحتياج_الغذائي, s.الحالة_الظاهرة, s.التكلفة_المحلية
       FROM الأغنام s
       INNER JOIN السلالات b ON s.رقم_السلالة = b.رقم_السلالة
       WHERE b.اسم_السلالة = :breedID`,
      {
        replacements: { breedID: breedID }, // Use correct replacement parameter
        type: Sequelize.QueryTypes.SELECT, // Correct query type
      }
    );

    res.json(result); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching sheeps');
  }
}


}

module.exports = breedController