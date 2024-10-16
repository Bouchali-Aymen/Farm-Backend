const express = require('express')
const router = express.Router()
const sheep = require('../models/sheep')
const sheepController = require('../controllers/sheepController')
const breedController = require('../controllers/breedController')
const chambersController = require('../controllers/chambersController')
const raisingController = require('../controllers/raising_methods_controller')
const foodController = require('../controllers/foodController')
const nuttritionController = require('../controllers/nuttritionController')
const growingController = require('../controllers/growing_controller')
const nutriGoalsController = require('../controllers/nuttriGoalsController')
const foodNeedsController = require('../controllers/foodNeedsController')

router.get('/' , (req , res)=>{
    res.send('salam elike')
})

router.get('/sheep' , sheepController.getallsheeps )
router.get('/breed' , breedController.getBreeds)
router.get('/chambers' , chambersController.getAllChambers)
router.get('/raisinMth' , raisingController.getAllMethods)
router.get('/oneMeth/:goalId' , raisingController.getOneMethod)
router.get('/oneChamber/:chamberid' , chambersController.getOneChamber)
router.post('/add' , sheepController.addSheep)
router.post('/addChamber' , chambersController.addChamber)
router.post('/changeRoom' , sheepController.changeSRoom)
router.post('/removeSheep' , sheepController.deleteSheep)
router.post('/addAMethod' , raisingController.addOneMehtod)
router.get('/getGoals', raisingController.getGoals);

router.get('/findFood' , foodController.getAllFoods)
router.post('/addFood' , foodController.addFood )
router.post('/deletFood' , foodController.removefood )
router.post('/editFood' , foodController.editFood )




router.post('/addNutri' , nuttritionController.addvaluees)
router.get('/findNutri' , nuttritionController.findvalues)
router.post('/editNutri' , nuttritionController.changeValues)

router.get('/getGrow' , growingController.getGrowMethod)
router.post('/addGrow' , growingController.addGrowMethod)
router.post('/deletegrow', growingController.deleteGrowMethod)


router.get('/NutriGoals' , nutriGoalsController.findvalues)
router.post('/addNutriGoal' , nutriGoalsController.addvaluees)
router.post('/updatenutriGoal' , nutriGoalsController.changeValues)


router.post('/addBreed',breedController.addABreed)



router.post('/getSheepsOfOneBreed',breedController.getSheepsOfOneBreed)


router.post('/addFoodNeed',foodNeedsController.addFoodNeed)
router.get('/getFoodNeeds',foodNeedsController.getFoodNeeds);


module.exports = router