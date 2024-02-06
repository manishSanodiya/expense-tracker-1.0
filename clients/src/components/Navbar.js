// import React from "react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <>
//       <nav className="navbar navbar-expand-lg bg-body-tertiary">
//         <div className="container-fluid">
//           <a className="navbar-brand" href="#">
//             Expense-Tracker
//           </a>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarSupportedContent"
//             aria-controls="navbarSupportedContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarSupportedContent">
//             <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//               <li className="nav-item">
//                 <Link
//                   className="nav-link active"
//                   to="/signup"
//                   aria-current="page"
              
//                 >
//                   Home
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link
//                   className="nav-link active"
//                   to="/login"
//                   aria-current="page"
             
//                 >
//                   Login
//                 </Link>
//               </li>

//               <li className="nav-item">
//                 <Link
//                   className="nav-link active"
//                   to="/"
//                   aria-current="page"
               
//                 >
//                   Expense
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Navbar;

import './Navbar.css'; // Create a CSS file for styling
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="left-section">
        <h1>Expense Tracker</h1>
      </div>
      <div className="right-section">
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
        <Link to="/">Home</Link>
      </div>
    </nav>
  );
};

export default Navbar;

