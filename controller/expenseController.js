const db = require('../model');
const Expense = db.expenses;


const addExpense = async(req,res)=>{
try{
    const {name,price,type} = req.body;
    const userId = req.user.id;
    const newExpense = await Expense.create({name,price,type,userId:userId})
    res.status(201).send(newExpense)
}catch(error){
    res.status(500).json({error: error.message});
}
}

const getExpense = async (req, res) => {
    try {
     const user = req.user;
     const expenses = await Expense.findAll({where:{userId:user.id}})
      //const expenses = await Expense.findAll();
      res.status(200).send(expenses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const deleteExpense = async(req,res)=>{
    try{
        const user = req.user;
        const {id} = req.params;
        const result=await Expense.destroy({ where: { id: id,userId:user.id } });
        if(result==0){
            return response.status(401).json({ message: 'You are not Authorized' });
        }else{
            response.status(200).json({ message: 'Succeffully deleted'});
        }
    }catch(error){
        res.status(500).json({error: error.message});
    }
}


module.exports = {
    addExpense,
    getExpense,
    deleteExpense
}