const Car = require('../models/Car');
const mongoose = require('mongoose');
exports.createCar = async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getCarbyID = async (req, res) => {
    try {
      const car = await Car.findOne({ id:  parseInt(req.params.id, 10) });   //req.params.id
      if (!car) {
        return res.status(404).json({ message: 'Car not found' });
      }
      res.json(car);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


// Add search functionality
exports.searchCars = async (req, res) => {
  try {
    const { term } = req.query;
    const regex = new RegExp(term, 'i'); // case-insensitive search
    const cars = await Car.find({
      $or: [
        { name: regex },
        { make: regex },
        { model: regex }
      ]
    });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getModelTypes = async (req, res) => {
  try {
    const modelTypes = await Car.distinct('model');
    res.json(modelTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get available drive types
exports.getDriveTypes = async (req, res) => {
  try {
    const driveTypes = await Car.distinct('driveType');
    res.json(driveTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get filtered cars
exports.getFilteredCars = async (req, res) => {
  try {
    const { modelType, driveType, mileage } = req.query;
    const filters = {};

    if (modelType) filters.model = modelType;
    if (driveType) filters.driveType = driveType;
    if (mileage) filters.mileage = { $lte: Number(mileage) };

    const cars = await Car.find(filters);
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
