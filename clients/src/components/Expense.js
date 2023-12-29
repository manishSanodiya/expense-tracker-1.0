

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./expense.css";



const Expense = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState(0);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = useCallback((e, setValue) => {
    setValue(e.target.value);
  }, []);

  const clearInputs = useCallback(() => {
    setName("");
    setPrice(0);
    setType("");
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const obj = { name, price, type };
      const token = localStorage.getItem("token");
      await axios.post("api/expense/addExpense", obj, {
        headers: {"Authorization": token },
      });
      console.log("Expense added");
      clearInputs();
      getExpense();
    } catch (err) {
      console.error("Error adding expense:", err.message);
      setError("Error adding expense. Please try again.");
    }
  };

  const getExpense = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("api/expense/getExpense", {
        headers: { "Authorization": token },
      });
      setList(res.data);
    } catch (err) {
      console.error("Error fetching expenses:", err.message);
      setError("Error fetching expenses. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteHandler = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`api/expense/deleteExpense/${id}`, {
        headers: { "Authorization": token },
      });
      console.log("Deleted");
      getExpense();
    } catch (err) {
      console.error("Delete did not happen", err.message);
      setError("Error deleting expense. Please try again.");
    }
  };

  const premiumHandler =async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("api/purchase/premiummembership", {
        headers: { "Authorization": token },
      });
     
     console.log(response)
      var options = {
        "key": response.data.key_id,
        "order_id":response.data.order.id,
       "handler": async function (response){
        const premiumStatus = await axios.post('api/purchase/updatetransaction',{
          order_id: options.order_id,
          payment_id: response.razorpay_payment_id, 
        },{
          headers: {"Authorization": token}
        })
        console.log("you are a premium member now")
        console.log(response)
       }
       
      }
 
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
      rzp1.on('payment.failed', function(response){
        console.log(response)
        console.log('something went wrong')
      })
    } catch (err) {
      console.log("error premium in expense", err);
    }

}

  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getExpense();
    }
  }, [getExpense]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <label>name of expense</label>
        <input
          type="text"
          value={name}
          onChange={(e) => handleInputChange(e, setName)}
          className="form-input"
          placeholder="name"
        />
        <label>price of expense</label>
        <input
          type="number"
          value={price}
          onChange={(e) => handleInputChange(e, setPrice)}
          className="form-input"
        />
        <label htmlFor="type">Choose type of expense: </label>
        <select
          name="type"
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="form-select"
        >
          <option disabled selected value=''>
            Select Item
          </option>
          <option value="Groceries">Groceries</option>
          <option value="Utilities">Utilities</option>
          <option value="Rent">Rent</option>
          <option value="Fuel">Fuel</option>
          <option value="Clothes">Clothes</option>
          <option value="Drinks">Drinks</option>
          <option value="Food">Food</option>
          <option value="Education">Education</option>
          <option value="Gifts">Gifts</option>
        </select>
        <button type="submit">Add Expense</button>
      </form>
      {!loading && (
        <p className="premium" >
          for premium features click here..<button onClick={premiumHandler}>Premium</button>
        </p>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="list-container">
          <h1>Expenses :</h1>
          {error && <p>{error}</p>}
          <ul>
            {list.map((item) => (
              <li key={item.id} className="list-items">
                {item.name} {item.price} {item.type}
                <button onClick={() => deleteHandler(item.id)}>
                  delete item
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Expense;
