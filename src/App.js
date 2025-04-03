import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Landing, Register, Error, Dashboard} from "./pages";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Dashboard /> }></Route>
        <Route path='landing' element={ <Landing /> }></Route>
        <Route path='register' element={ <Register /> }></Route>
        <Route path='*' element={ <Error /> }></Route>
      </Routes>
      <ToastContainer position="top-center"></ToastContainer>
    </BrowserRouter>
  )
  ;
}

export default App;
