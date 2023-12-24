import axios from "axios";
import React, { useEffect, useState } from "react";

const Expense = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState();
  const [list,setList] = useState([])
  const submitHandler =async(e)=>{
    e.preventDefault();
    try{
        await axios.post('api/expense/addExpense',{name,price,type})
        console.log("expense added")
        getExpense()
    }catch(err){
        console.log("error in adding expense",err.message)
    }
   
  }

  const getExpense = async()=>{
    const res = await axios.get('api/expense/getExpense')
    setList(res.data)

  }

  useEffect(()=>{
    getExpense()
  },[])

  const deleteHandler=async(id)=>{
     try{
        await axios.delete(`api/expense/deleteExpense/${id}`)
        console.log("deleted")
        getExpense()
     }catch(err){
        console.log('delete not happen' ,err.message)
     }
  }
  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="number"
          name="name"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <label htmlFor="type">Choose type of expense: </label>

        <select name="type" id="type"  value={type} onChange={(e)=>setType(e.target.value)}>
          <option value="grocery">Grocery</option>
          <option value="medical">Medical</option>
          <option value="food">Food</option>
          <option value="games">Games</option>
        </select>
        <button type="submit">Add Expense</button>
      </form>
      <div>
        <h1>Expenses :</h1>
        <ul>
        {list.map((item)=>{
            return <li key={item.id}>{item.name} {item.price} {item.type} <button onClick={()=>deleteHandler(item.id)}>delete item</button></li>
        })}
        </ul>
      </div>
    </div>
  );
};

export default Expense;
