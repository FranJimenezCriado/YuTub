import './App.css'

import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';

import HomePage from "./pages/HomePage/HomePage"
import LoginPage from './pages/LoginPage/LoginPage';

function App() {

  return (
    <>
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
        {/* <Route path='/entries/:entryId' element={<EntryDetailsPage />} /> */}
        {/* <Route path='/entries' element={<NewEntryPage />} /> */}
        {/* <Route path='*' element={<NotFoundPage />} /> */}
      </Routes>
    </>
  )
}

export default App
