const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.send({
        name:'manish'
    })
})

const PORT = process.env.PORT || 4500;

app.listen(PORT)