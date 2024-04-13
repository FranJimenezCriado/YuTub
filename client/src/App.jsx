import './App.css'

import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';

import HomePage from "./pages/HomePage/HomePage"
import LoginPage from './pages/LoginPage/LoginPage';

function App() {

  return (
    <>
      <Header />

      <Toaster
        position='top-center'
        toastOptions={{
          duration: 3000,
        }}
      />

      <Routes>
        <Route path='/' element={<HomePage />} />
        {/* <Route path='/register' element={<RegisterPage />} /> */}
        {/* <Route path='/users/validate/:registrationCode' element={<ValidateUserPage />} /> */}
        <Route path='/login' element={<LoginPage />} />
        {/* <Route path='/profile' element={<UserProfilePage />} /> */}
        {/* <Route path='/videos/:videoId' element={<EntryDetailsPage />} /> */}
        {/* <Route path='/upload' element={<NewEntryPage />} /> */}
        {/* <Route path='*' element={<NotFoundPage />} /> */}
      </Routes>
    </>
  )
}

export default App
