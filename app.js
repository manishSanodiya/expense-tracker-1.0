const express = require('express');
const path = require('path');
const fs = require('fs')
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require("./routes/expenseRoutes")
 const purchaseRouter = require('./routes/purchase')
const premiumRouter = require('./routes/premiumFeature');
const frogotPassword = require('./routes/forgotPassword')
const helmet = require('helmet')
const compression = require('compression')
const morgan = require('morgan');


const app = express();

app.use(bodyParser.urlencoded({extended:false}))

app.use(cors());
app.use(express.json());
app.use(helmet())
app.use(compression())

const accesslogstream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})

app.use(morgan('combined',{stream:accesslogstream}))

app.use('/api/user',userRoutes);
app.use('/api/expense',expenseRoutes);
 app.use('/api/purchase',purchaseRouter);
 app.use('/api/premium',premiumRouter);
 app.use('/api/password',frogotPassword);


app.use('/',(req,res,next)=>{
    res.send({
        name:'manish'
    })
})

const PORT = process.env.PORT || 4600;

app.listen(PORT)