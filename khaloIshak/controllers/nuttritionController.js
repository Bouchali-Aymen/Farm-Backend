const sequelize = require("../models/connection");
const nuttrtion = require("../models/nuttrition");

const raising = require("../models/nuttrition");

class nuttritionController {
    /*
  static async addNuttrition(req, res) {
    // for later 
    await sequelize.query(`
        ALTER TABLE nuttrition 
        ADD COLUMN new_column_name DOUBLE
        AFTER المغنيزيوم
    `);
  }
  */
 
  static addvaluees(req , res ) {
    const {اعلاف , المقدار_الجاف , الالياف_الخام ,  البروتين , الكالسيوم , الفسفور , المغنيزيوم } = req.body
   
    try{
      const addValue = nuttrtion.create({
        اعلاف : اعلاف , 
        المقدار_الجاف : المقدار_الجاف , 
        الالياف_الخام : الالياف_الخام , 
        البروتين : البروتين , 
        الكالسيوم : الكالسيوم , 
        الفسفور : الفسفور , 
        المغنيزيوم : المغنيزيوم 
    })
    if(addValue){
      res.send(" added succefully ")
    }
    }
    catch(e){
      res.json({error:e.message})
    }

  
  

  


}

static async findvalues (req , res ) {
    const [resluts , metadata ] = await sequelize.query(
        "SELECT اعلاف.العلف , المقدار_الجاف , الالياف_الخام , البروتين , الكالسيوم , الفسفور , المغنيزيوم FROM nuttrition INNER JOIN اعلاف on nuttrition.اعلاف = اعلاف.id "
    )
    const formattedResults = resluts.map(result => {
      return {
          العلف: result['العلف'],
          المقدار_الجاف: '% ' + result['المقدار_الجاف'] ,
          الالياف_الخام:  '% ' + result['الالياف_الخام'] ,
          البروتين: '% ' + result['البروتين'] ,
          الكالسيوم: '% ' + result['الكالسيوم'] ,
          الفسفور:  '% ' + result['الفسفور'] ,
          المغنيزيوم: '% ' + result['المغنيزيوم'] 
      };
  });
    res.send(formattedResults)
}


 static async changeValues (req , res ) {
    const {اعلاف , المقدار_الجاف , الالياف_الخام ,  البروتين , الكالسيوم , الفسفور , المغنيزيوم } = req.body

      const updated = await nuttrtion.update(
        { المقدار_الجاف , الالياف_الخام ,  البروتين , الكالسيوم , الفسفور , المغنيزيوم} , 
        {where : {اعلاف}}
      )

      res.send(updated)
 }





}


module.exports = nuttritionController