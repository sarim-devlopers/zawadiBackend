const express = require('express');
const router = express.Router();
const carController = require('../controllers/carControllers');

router.post('/cars', carController.createCar);
router.get('/cars', carController.getCars);
router.get('/cars/:id', carController.getCarbyID);
router.put('/cars/:id', carController.updateCar);
router.delete('/cars/:id', carController.deleteCar);

module.exports = router;
