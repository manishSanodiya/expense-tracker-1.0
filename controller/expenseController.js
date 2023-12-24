const db = require('../model');
const Expense = db.expenses;


const addExpense = async(req,res)=>{
try{
    const {name,price,type} = req.body;
    const newExpense = await Expense.create({name,price,type})
    res.status(201).send(newExpense)
}catch(error){
    res.status(500).json({error: error.message});
}
}

const getExpense = async (req, res) => {
    try {
     
      const expenses = await Expense.findAll();
      res.status(200).send(expenses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const deleteExpense = async(req,res)=>{
    try{
        const {id} = req.params;
        await Expense.destroy({ where: { id: id } });
        res.status(200).send("deleted");
    }catch(error){
        res.status(500).json({error: error.message});
    }
}


module.exports = {
    addExpense,
    getExpense,
    deleteExpense
}