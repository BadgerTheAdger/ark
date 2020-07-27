const Company = require("../../db/models/company.model");
const User = require("../../db/models/user.model");
const sharp = require("sharp");
const path = require("path");
const pathToDefaultImage = path.join(
  process.cwd(),
  "assets",
  "images",
  "default.png"
);
const paginate = require("jw-paginate");

exports.createCompany = async (req, res, next) => {
  const newCompany = new Company({
    companyName: req.body.companyName,
    _supervisorId: req.user_id,
  });

  try {
    await newCompany.save();
    res.send(newCompany);
  } catch (error) {
    next(error);
  }
};

exports.getCompanies = async (req, res, next) => {
  const companies = await Company.find({ _supervisorId: req.user_id });
  const companiesNumber = companies.length;
  const page = parseInt(req.query.page) || 1;
  const pageSize = 4;
  const pager = paginate(companiesNumber, page, pageSize);
  const pageOfItems = companies.slice(pager.startIndex, pager.endIndex + 1);

  res.send({ pager, pageOfItems });
};

exports.getCompany = async (req, res, next) => {
  try {
    const company = await Company.findOne({ _id: req.params.companyId });
    if (company) {
      res.send(company);
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteCompany = async (req, res, next) => {
  const company = await Company.findOneAndRemove({
    _id: req.params.companyId,
  });

  // delete all workers of the company
  await deleteUsersFromCompany(company._id);

  // delete all animals of the company
  res.send(company);
};

exports.getWorkers = async (req, res, next) => {
  const workers = await User.find({ _hostCompanyId: req.params.companyId });
  let filteredWorkers = workers.filter((worker) => {
    if (req.query.search) {
      return worker.username
        .toLowerCase()
        .includes(req.query.search.toLowerCase());
    } else {
      return true;
    }
  });

  if(req.query.role) {
    filteredWorkers = filteredWorkers.filter((worker) => {
        if(req.query.role === "all") return true;
        return worker.role === req.query.role;
    });
  }
  

  const workersNumber = filteredWorkers.length;
  const page = parseInt(req.query.page) || 1;
  const pageSize = 4;
  const pager = paginate(workersNumber, page, pageSize);
  const pageOfItems = filteredWorkers.slice(
    pager.startIndex,
    pager.endIndex + 1
  );

  res.status(200).send({ pager, pageOfItems });
};

exports.createWorker = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;
    const newWorker = new User({
      username,
      email,
      password,
      role,
      _hostCompanyId: req.params.companyId,
      avatar: await defaultImageBuffer(),
    });
    await newWorker.save();
    res.send(newWorker);
  } catch (error) {
    next(error);
  }
};

exports.deleteWorker = async (req, res, next) => {
  try {
    const deletedWorker = await User.findOneAndRemove({
      _id: req.params.workerId,
      _hostCompanyId: req.params.companyId,
    });
    res.send(deletedWorker);
  } catch (error) {
    next(error);
  }
};

/* HELPER METHODS */
let deleteUsersFromCompany = async (_hostCompanyId) => {
  await User.deleteMany({ _hostCompanyId });
};

async function defaultImageBuffer() {
  return await sharp(pathToDefaultImage).toBuffer();
}
