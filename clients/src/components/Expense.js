

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./expense.css";
import MonthlyYearly from "./MonthlyYearly";
import DownloadHistory from "./DownloadHistory";



const Expense = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState(0);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [premium,setPremium] = useState(false);
  const [leader,setLeader] = useState(false)
  const [leaderboard,setLeaderboard] = useState([])

  function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

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
      const decodeToken = parseJwt(token)
      if(decodeToken.ispremiumuser){
        setPremium(!premium);
      }
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


  //premium handler
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
        setPremium(true)
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

//leaderboard
const leaderboardHandler=async()=>{
  try{
    const token = localStorage.getItem("token");
    setLeader(!leader);
     const res = await axios.get('api/premium/getPremium',{
      headers: {'Authorization':token}
     })
     
      console.log(res.data)
      setLeaderboard(res.data)
  }catch(err){
    alert(err)
  }

}

//download expense 
const downloadHandle = ()=>{
  const token = localStorage.getItem("token");
axios.get('api/user/download', {headers: {'Authorization':token}})
  .then((response) => {
    if(response.status === 200){
        //the bcakend is essentially sending a download link
        //  which if we open in browser, the file would download
        console.log(response)
        var a = document.createElement("a");
        a.href = response.data.fileUrl;
        a.download = 'myexpense.csv';
        a.click();
    } else {
        throw new Error(response.data.message)
    }

})
.catch((err) => {
  alert(err)
});
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
      {!loading && !premium && (
        <p className="premium" >
          for premium features click here..<button onClick={premiumHandler}>Premium</button>
        </p>
      )}
      {
        !loading && premium && (
          <p className="premium" >
          you are a premium user ..<button onClick={leaderboardHandler}>Leaderboard</button>
        </p>
        )
      }
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
      {premium && leader && <div className="list-container">
        <h2>Leaderboard :</h2>
        <ul>
        {leaderboard.map((item,index)=>{
           return <li key={index} className="list-items">
            {item.username} : {item.totalexpense}
          
          </li>
        })}
        </ul>
       
        </div>
        }
           {!loading && premium && (
         <MonthlyYearly data={list}/>
      )}
       
         {!loading && premium && (
        <p className="download" >
          to download expenses click here..<button onClick={downloadHandle}>Download</button>
        </p>
      )}

{!loading && premium && (
       <DownloadHistory premium={premium} />
      )}
    </div>

  );
};

export default Expense;
