const express = require('express');
const Person = require('../models/Person');
const router = express.Router()


const bodyParser = require('body-parser');
router.use(bodyParser.json()); // req.body


//POST route to add a person
router.post('/', async (req, res) => {
    try {
        const data = req.body //Assuming the request body contains the person data

        //Create a new Person document using the Mongoose model
        const newPerson = new Person(data);

        //Save the new person to the database
        const response = await newPerson.save();
        console.log(response);
        res.status(200).json(response);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Sever Error' })
    }
});

//GET method to get the person
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('data fetched')
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Sever Error' })
    }
})


router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
            const response = await Person.find({ work: workType });
            console.log('response fetched');
            res.status(200).json(response)
        } else {
            res.status(404).json({ error: 'invaild work type' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Sever Error' })
    }
})


router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id; // Extract the id from the URL parameter
        const updatedPersonData = req.body; // Update data for the person

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, // Return the update document
            runValidators: true,  // Run Mongoose validation
        })

        if (!response) {
            return res.status(404).json({ error: 'Person not found' })
        }

        console.log("data updated");
        //Send the update person data as a JSON response
        res.status(200).json(response)

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Sever Error' })
    }
})

//DELETE THE OBJECT FROM DATABASE
router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id; // Extract the person's ID from the URL parameter

        // Assuming you have a Person model
        const deletedPerson = await Person.findByIdAndDelete(personId);

        if (!deletedPerson) {
            return res.status(404).json({ error: 'Person not found' });
        }

        // Send a success message as a JSON response
        console.log('data delete')
        res.json({ message: 'Person deleted successfully' });

    } catch (error) {
        console.log('Error deleting person:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})


module.exports = router;




