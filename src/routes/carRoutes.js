const express = require('express');
const router = express.Router();
const carController = require('../controllers/carControllers');

router.post('/cars', carController.createCar);
router.get('/cars', carController.getCars);
router.get('/cars/search', carController.searchCars);
router.get('/cars/modelTypes', carController.getModelTypes); // New route for model types
router.get('/cars/driveTypes', carController.getDriveTypes); // New route for drive types
router.get('/cars/filteredCars', carController.getFilteredCars);
router.get('/cars/:id', carController.getCarbyID);
router.put('/cars/:id', carController.updateCar);
router.delete('/cars/:id', carController.deleteCar);

module.exports = router;
