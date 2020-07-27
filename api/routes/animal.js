const express = require('express');
const router = express.Router();
const animalController = require("../routes/controllers/animal.controller");
const { authenticate } = require("../routes/middlewares/middleware");

router.post('/companies/:companyId/animals', authenticate, animalController.createAnimal);

router.get('/companies/:companyId/animals', authenticate, animalController.getAnimals);

router.get('/companies/:companyId/animals/:animalId', authenticate, animalController.getAnimal);

router.patch('/companies/:companyId/animals/:animalId', authenticate, animalController.updateAnimal);

router.delete('/companies/:companyId/animals/:animalId', authenticate, animalController.deleteAnimal);

router.post('/dry-matter', animalController.getDryMatter);

module.exports = router;