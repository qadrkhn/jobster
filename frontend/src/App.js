import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Landing, Register, Error, ProtectedLayout } from "./pages";
import { ToastContainer } from "react-toastify";
import { Stats, SharedLayout, Profile, AddJob, AllJobs } from './pages/dashboard';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter future={{
      v7_startTransition: true,
    }}>
      <Routes>
        <Route path='/' element={
          <ProtectedLayout>
            <SharedLayout />
          </ProtectedLayout>
          }>
          <Route index element={ <Stats /> } />
          <Route path='all-jobs' element={ <AllJobs /> } />
          <Route path='add-job' element={ <AddJob /> } />
          <Route path='profile' element={ <Profile /> } />
        </Route>
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
