import React from 'react'

import './table.css'
const MonthlyYearly = ({data}) => {
    console.log(data)
   
    
      return (
        <div className="table-container">
          <h2>This month</h2>
          <table className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>name</th>
                <th>price</th>
                <th>type</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row,index) => (
                <tr key={row.id}>
                  <td>{index}</td>
                  <td>{row.name}</td>
                  <td>{row.price}</td>
                  <td>{row.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2>This Year</h2>
          <table className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>name</th>
                <th>price</th>
                <th>type</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row,index) => (
                <tr key={row.id}>
                  <td>{index}</td>
                  <td>{row.name}</td>
                  <td>{row.price}</td>
                  <td>{row.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };
export default MonthlyYearly;