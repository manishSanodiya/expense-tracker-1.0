const { CompaniesApi } = require("sib-api-v3-sdk");
const db = require("../model");
const Expense = db.expenses;
const User = db.users;
const Download = db.downloads;
const sequelize = db.sequelize;
const S3services = require('../services/S3services')


//download url request handler
const downloadexpense = async (req, res) => {
  try{
    const user = req.user;
    const userId = user.id;
    const expenses = await Expense.findAll({ where: { userId: user.id } });
    console.log(expenses);
    const stringifiedExpenses = JSON.stringify(expenses);
    const filename = `expenses${userId}/${new Date()}.txt`;
    const fileUrl =await S3services.uploadtoS3(stringifiedExpenses, filename);
    console.log(fileUrl)
    await user.createDownload({
      downloadUrl:fileUrl
    })
    await res.status(200).json({ fileUrl: fileUrl, success: true });
  }catch(err){
    console.log(err)
    res.status(500).json({success:false, data:err})
    
  }
   
};

//getting download history in frontend
const getDownloadhistory = async(request,response,next) =>{
  try {
    const user = request.user;
    const history = await Download.findAll({ where: { userId: user.id } });
    response.status(200).json(history);
    
  } catch (error) {
    console.log(error);
    return response.status(401).json({ message: 'Unable to fetch history' });
  }
}


//adding the expenses
const addExpense = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { name, price, type } = req.body;

    const user = req.user;
    await user.createExpense(
      {
        name: name,
        price: price,
        type: type,
      },
      { transaction: t }
    );
    const totalExpense = Number(req.user.totalexpense) + Number(price);
    await User.update(
      {
        totalexpense: totalExpense,
      },
      {
        where: { id: user.id },
        transaction: t,
      }
    );
    await t.commit();
    res.status(200).json({ message: "Data succesfully added" });
    //     const userId = req.user.id;
    //    console.log("manish<<<<<<<<<",userId)
    //     const newExpense = await Expense.create({name,price,type,userId:userId})
    //     res.status(201).send(newExpense)
  } catch (error) {
    await t.rollback();
    res.status(500).json({ error: error.message });
  }
};

const getExpense = async (req, res) => {
  try {
    const user = req.user;
    const expenses = await Expense.findAll({ where: { userId: user.id } });
    //const expenses = await Expense.findAll();
    res.status(200).send(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteExpense = async (req, res) => {
   
  const t = await sequelize.transaction();
  try {
    const user = req.user;
    const { id } = req.params;
    const result = await Expense.destroy({
      where: { id: id, userId: user.id },
    });
    const totalExpense = await Expense.sum("price", {
      where: { userId: user.id },
      transaction: t,
    });

    if (totalExpense) {
      await user.update({ totalexpense: totalExpense }, { transaction: t });
    } else {
      await user.update({ totalExpense: 0 });
    }

    if (result === 0) {
      return res.status(401).json({ message: "You are not Authorized" });
    }
    res.status(200).json({ message: "Succeffully deleted" });
    (await t).commit();
  } catch (error) {
    await t.rollback();
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addExpense,
  getExpense,
  deleteExpense,
  downloadexpense,
  getDownloadhistory
};
