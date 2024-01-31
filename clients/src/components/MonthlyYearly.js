import React from 'react'
import './table.css'
const MonthlyYearly = () => {
    const tableData = [
        { id: 1, name: 'John Doe', age: 25, occupation: 'Developer' },
        { id: 2, name: 'Jane Smith', age: 30, occupation: 'Designer' },
        { id: 3, name: 'Bob Johnson', age: 28, occupation: 'Tester' },
      ];
    
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
              {tableData.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.age}</td>
                  <td>{row.occupation}</td>
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
              {tableData.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.age}</td>
                  <td>{row.occupation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };
export default MonthlyYearly