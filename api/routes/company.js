const express = require('express');
const router = express.Router();
const companyController = require("./controllers/company.controller");
const { verifySession, authenticate } = require("../routes/middlewares/middleware");

router.post("/companies", authenticate, companyController.createCompany);

router.get("/companies", authenticate, companyController.getCompanies);

router.get("/companies/:companyId", authenticate, companyController.getCompany);

router.delete("/companies/:companyId", authenticate, companyController.deleteCompany);

router.post("/companies/:companyId/workers", authenticate, companyController.createWorker);

router.get("/companies/:companyId/workers", authenticate, companyController.getWorkers);

router.delete("/companies/:companyId/workers/:workerId", authenticate, companyController.deleteWorker);

module.exports = router;