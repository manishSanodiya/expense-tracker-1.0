const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes')

const app = express();

app.use(bodyParser.urlencoded({extended:false}))

app.use(cors());
app.use(express.json());

app.use('/api/user',userRoutes);

app.use('/',(req,res,next)=>{
    res.send({
        name:'manish'
    })
})

const PORT = process.env.PORT || 4600;

app.listen(PORT)