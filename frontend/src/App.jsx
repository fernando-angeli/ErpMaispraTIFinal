import './App.css'
import './assets/css/texts.css'
import './assets/css/buttons.css'
import './assets/css/inputs.css'

import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Header from './components/header/header'
import ProtectedRoute from './components/ProtectedRoute'
import NavigationMenu from './components/navigationMenu/NavigationMenu'
import AddClientPage from './pages/addClientPage/AddClientPage'
import HomePage from './pages/HomePage'
import Login from './pages/LoginPage/Login'
import { useAuth } from './components/AuthContext';


function App() {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated)
  const[isLogged, log] = useState(isAuthenticated)
  return (
    <>
      <Router>
        {isLogged && <Header isLoggedIn={isLogged}/>}
        <ProtectedRoute isLoggedIn={isLogged}>
          <NavigationMenu/>
        </ProtectedRoute>
        <Routes>
          <Route path='/cliente' element={
            <ProtectedRoute isLoggedIn={isLogged}>
              <AddClientPage/>
            </ProtectedRoute>
          }/>

      {!isLogged && (
        <Route path='/login' element={<Login />} />
      )}

            <Route path='/home' element={
              <ProtectedRoute isLoggedIn={isLogged}>
                <HomePage/>
              </ProtectedRoute>
            }/>
        </Routes>
      </Router>
    </>
  )
}

export default App

/*
[{
  nome: "nome",
  desc: "desc"
},
{
  nome: "nome",
  desc: "desc"
}]
obj.map(() => {

})

// usar firstChield
// context api / useZustends
*/
