
import { Route, Routes } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Navbar from './components/Navbar';
import Expense from './components/Expense';


function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/' element={<Login />}/>
      <Route path='/expense' element={<Expense />}/>
    </Routes>
    </>
  );
}

export default App;
