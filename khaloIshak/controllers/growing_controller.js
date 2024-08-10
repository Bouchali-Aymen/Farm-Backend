const sequelize = require("../models/connection");
const growing = require("../models/growing");
const nuttrition_goals = require("../models/nuttrition_goals");

class growingController {
  static async getGrowMethod(req, res) {
    const growingMeth = await growing.findAll();
    
    res.send(growingMeth);
  }

  static async addGrowMethod(req, res) {
    const {  وصف_المرحلة } = req.body;

    await growing.create({
      وصف_المرحلة: وصف_المرحلة,
    });
    res.send(" Added succefully");
  }


  static async deleteGrowMethod(req,res) {
    const {وصف_المرحلة} = req.body

    const deadMeth = await growing.findOne({ where : {وصف_المرحلة : وصف_المرحلة}})

    
    if(deadMeth)
    {
        const deadMethId = deadMeth.رقم_المرحلة 

        const nutriMethdead = await nuttrition_goals.findOne({where : {مرحلة_النمو :deadMethId}})
       
        if(nutriMethdead)
        {
            await nutriMethdead.destroy();
        }
    
        await deadMeth.destroy()
        res.send(" deleted phase successfully")
    }else{
        res.send("didnt find any phase to delete")
    }
  }

}

module.exports = growingController;
