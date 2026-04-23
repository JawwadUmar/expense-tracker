

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Toast from './components/Toast'
import { AuthProvider } from './context/AuthContext'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Toast />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<ProtectedRoute />}>

          </Route>
        </Routes>
      </BrowserRouter>

    </AuthProvider>

  )
}

export default App
