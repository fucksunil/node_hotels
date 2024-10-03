const express = require('express')
const app = express()
const db = require('./db')

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req.body


app.get('/', function (req, res) {
    res.send('Welcome to my hotel... How i can help you')
})





//Import the router files
const personRoutes = require('./routes/personRoutes');

//Use the routers
app.use('/person', personRoutes)

const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/menuitem', menuItemRoutes)


app.listen(3000, () => {
    console.log(`listening on port http://localhost:${3000}`)
})


