const sequelize = require("../models/connection");
const growing = require("../models/growing");
const nuttrition_goals = require("../models/nuttrition_goals");



class nutriGoalsController {
  

    static addvaluees(req , res ) {
        const {مرحلة_النمو , المقدار_الجاف , الالياف_الخام ,  البروتين , الكالسيوم , الفسفور , المغنيزيوم } = req.body
       
        
    
        const addValue = nuttrition_goals.create({
            مرحلة_النمو : مرحلة_النمو , 
            المقدار_الجاف : المقدار_الجاف , 
            الالياف_الخام : الالياف_الخام , 
            البروتين : البروتين , 
            الكالسيوم : الكالسيوم , 
            الفسفور : الفسفور , 
            المغنيزيوم : المغنيزيوم 
        })
    
        res.send(" added succefully ")
    
    
    }



    static async findvalues (req , res ) {
        const [resluts , metadata ] = await sequelize.query(
            "SELECT مراحل_النمو.وصف_المرحلة , المقدار_الجاف , الالياف_الخام , البروتين , الكالسيوم , الفسفور , المغنيزيوم FROM nuttrition_goals INNER JOIN مراحل_النمو on nuttrition_goals.مرحلة_النمو = مراحل_النمو.رقم_المرحلة "
        )
        const formattedResults = resluts.map(result => {
          return {
            وصف_المرحلة: result['وصف_المرحلة'],
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
        const {مرحلة_النمو , المقدار_الجاف , الالياف_الخام ,  البروتين , الكالسيوم , الفسفور , المغنيزيوم } = req.body
    
          const updated = await nuttrtion.update(
            { المقدار_الجاف , الالياف_الخام ,  البروتين , الكالسيوم , الفسفور , المغنيزيوم} , 
            {where : {مرحلة_النمو}}
          )
    
          res.send(updated)
     }
    
    







}

module.exports = nutriGoalsController