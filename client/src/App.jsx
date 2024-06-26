import './App.css'

import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import Header from './components/Header/Header';

import HomePage from "./pages/HomePage/HomePage"
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ValidateUserPage from './pages/ValidateUserPage/ValidateUserPage';

function App() {
  const [videosFiltrados, setVideosFiltrados] = useState([])

  return (
    <>
      <Header setViajesFiltrados={setVideosFiltrados}  />

      <Toaster
        position='top-center'
        toastOptions={{
          duration: 3000,
        }}
      />

      <Routes>
        <Route path='/' element={<HomePage videosFiltrados={videosFiltrados} />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/users/validate/:registrationCode' element={<ValidateUserPage />} />
        <Route path='/login' element={<LoginPage />} />
        {/* <Route path='/users/password/recover' element={<RecoverPasswordPage />} /> */}
        {/* <Route path='/profile' element={<UserProfilePage />} /> */}
        {/* <Route path='/videos/:videoId' element={<EntryDetailsPage />} /> */}
        {/* <Route path='/upload' element={<NewEntryPage />} /> */}        
        {/* <Route path='*' element={<NotFoundPage />} /> */}
      </Routes>
    </>
  )
}

export default App
