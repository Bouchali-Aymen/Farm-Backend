const chambers = require("../models/chambers");
const sequelize = require("../models/connection");
const sheep = require("../models/sheep");

class chambersController {
  static async getAllChambers(req, res) {
    const chamber = await chambers.findAll();
    res.send(chamber);
  }

  static async getOneChamber(req, res) {
    const chamberid = req.params.chamberid;
    const [result, metadata] = await sequelize.query(
      "SELECT s.رقم_الغنم AS رقم_الغنم, r.اسم_الغرفة AS اسم_الغرفة, b.اسم_السلالة AS اسم_السلالة, s.نوع_الإنتاج AS نوع_الإنتاج FROM الأغنام s INNER JOIN غرف_الأغنام r ON s.رقم_الغرفة = r.رقم_الغرفة INNER JOIN السلالات b ON s.رقم_السلالة = b.رقم_السلالة WHERE r.رقم_الغرفة = :roomId",
      {
        replacements: { roomId: chamberid },
        type: sequelize.QueryTypes.findAll,
        
      }
    );
   
   


    res.send(result);
  }

  static async addChamber(req, res) {
    const { رقم_الغرفة, اسم_الغرفة, عدد_الأغنام } = req.body;

    const newRoom = await chambers.create({
      رقم_الغرفة: رقم_الغرفة,
      اسم_الغرفة: اسم_الغرفة,
      عدد_الأغنام: عدد_الأغنام,
    });
    res.send(newRoom);
  }











}

module.exports = chambersController;
