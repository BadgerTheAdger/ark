const { Animal } = require("../../db/index");
const paginate = require("jw-paginate");
const dryMatterFormulation = require("../core/calculations");

exports.createAnimal = async (req, res, next) => {
    const { herdNumber, species, age, weight } = req.body;
    const newAnimal = new Animal({
        herdNumber,
        species,
        age,
        weight,
        _hostCompanyId: req.params.companyId
    })
    try {
        await newAnimal.save();
        res.send(newAnimal);
    } catch (error) {
        next(error);
    }

}

exports.getAnimal = async (req, res, next) => {
    try {
        const animal = await Animal.findOne({ _id: req.params.animalId });
        if(animal) {
            res.send(animal);
        }
    } catch (error) {
       next(error); 
    }
}

exports.getAnimals = async (req, res, next) => {
    try {
        console.log('test2');
        const animals = await Animal.find({ _hostCompanyId: req.params.companyId });
        filteredAnimals = animals.filter((animal) => {
            console.log('inside filter')
            if(req.query.search) {
                return animal.herdNumber
                    .toLowerCase()
                    .includes(req.query.search.toLowerCase());
            } else {
                return true;
            }
        })

        const animalsNumber = filteredAnimals.length;
        const page = parseInt(req.query.page) || 1;
        const pageSize = 4;
        const pager = paginate(animalsNumber, page, pageSize);
        const pageOfItems = filteredAnimals.slice(pager.startIndex, pager.endIndex + 1);

        res.send({ pager, pageOfItems})

    } catch (error) {
       next(error); 
    }
}

exports.deleteAnimal = async (req, res, next) => {
    try {
       const deletedAnimal = await Animal.findOneAndRemove({ _id: req.params.animalId });
       res.send(deletedAnimal);
    } catch (error) {
       next(error); 
    }
}

exports.updateAnimal = async (req, res, next) => {
    try {
        const updatedAnimal = await Animal.findOneAndUpdate({ _id: req.params.animalId }, req.body);
        console.log(updatedAnimal);
        res.send();
    } catch (error) {
        next(error);
    }
}

exports.getDryMatter = async (req, res, next) => {
    console.log('test');
    const { cowWeight, milkPerDayKg } = req.body;
    console.log(cowWeight, milkPerDayKg);
    try {
        const dryMatterResult = dryMatterFormulation(cowWeight, milkPerDayKg);
        res.send({ dryMatterResult });
    } catch (error) {
       next(error); 
    }

}



