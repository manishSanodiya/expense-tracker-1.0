import React, { useState } from 'react'
import "./expense.css";
import 'bootstrap/dist/css/bootstrap.min.css'


const ExpenseList = ({list,loading,error,deleteHandler}) => {
    // const [currentPage,setCurrentPage] = useState(1);
    // const recordsPerpage = 5;
    // const lastIndex = currentPage*recordsPerpage;
    // const firstIndex = lastIndex-recordsPerpage;
    // const records = list.slice(firstIndex,lastIndex);
    // const nPage = Math.ceil(list.length/recordsPerpage);
    // const numbers = [...Array(nPage+1).keys()].slice(1)
  return (
    <>
    {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="list-container">
          <h1>Expenses :</h1>
   
          {error && <p>{error}</p>}
          <table className='table'>
            <thead>
                <th>name</th>
                <th>price</th>
                <th>category</th>
                <th>delete</th>
            </thead>
            <tbody>
            {list.map((item,index) => (
           <tr key={item.id}>
            <td>{item.name}</td>
            <td> {item.price}</td>
            <td>{item.type}</td>
            <td><button onClick={() => deleteHandler(item.id)}>
                delete item
                </button></td>
  
                
           </tr>
               
        
            ))}
            </tbody>
          </table>
        </div>
      )}
    </>
    
  )
}

export default ExpenseList