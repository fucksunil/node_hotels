const express = require('express');
const MenuItem = require('../models/Menu');
const router = express.Router()


//POST route to add a MenuItem
router.post('/', async (req, res) => {
    try {
        const data = req.body //Assuming the request body contains the person data

        //Create a new MenuItem document using the Mongoose model
        const newMenuItem = new MenuItem(data);

        //Save the new MenuItem to the database
        const response = await newMenuItem.save();
        console.log('menuItem saved');
        res.status(200).json(response);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Sever Error' })
    }
});

//GET method to get the menuItem
router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log('data fetched')
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Sever Error' }) 
    }
})


router.get('/:testType', async (req, res)=>{
    try {
        const testType = req.params.testType;
        if(testType == 'sweet' || testType == 'spicy' || testType == 'sour'){
            const response = await MenuItem.find({taste: testType});
            console.log('response fetched');
            res.status(200).json(response)
        }else{
            res.status(404).json({error: 'invaild work type'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Sever Error' }) 
    }
})

module.exports = router;