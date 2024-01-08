import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Expense-Tracker
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to="/signup"
                  aria-current="page"
              
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to="/login"
                  aria-current="page"
             
                >
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to="/"
                  aria-current="page"
               
                >
                  Expense
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
// import React from "react";
// import { NavLink } from "react-router-dom";



// const Navbar = () => {
//   return (
//     <>
//       <div className="container-fluid nav_bg">
//         <div className="row">
//           <div className="col-10 mx-auto">
//             <nav className="navbar navbar-expand-lg bg-body-tertiary">
//               <div className="container-fluid">
//               <a className="navbar-brand" href="#">
// //             Expense-Tracker
// //           </a>
//                 <button
//                   className="navbar-toggler"
//                   type="button"
//                   data-bs-toggle="collapse"
//                   data-bs-target="#navbarSupportedContent"
//                   aria-controls="navbarSupportedContent"
//                   aria-expanded="false"
//                   aria-label="Toggle navigation"
//                 >
//                   <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div
//                   className="collapse navbar-collapse"
//                   id="navbarSupportedContent"
//                 >
//                   <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//                     <li className="nav-item">
//                       <NavLink
                
//                         className="nav-link "
//                         aria-current="page"
//                         to="/signup"
//                       >
//                         Home
//                       </NavLink>
//                     </li>
//                     <li className="nav-item">
//                       <NavLink className="nav-link" to="/login">
//                         Login
//                       </NavLink>
//                     </li>
//                     <li className="nav-item">
//                       <NavLink className="nav-link" to="/expense">
//                         Expenses
//                       </NavLink>
//                     </li>
                
//                     <li className="nav-item">
//                       <NavLink  className="nav-link" to="/contact">
//                         Contact Us
//                       </NavLink>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </nav>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;

