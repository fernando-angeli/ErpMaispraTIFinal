import './App.css'
import './assets/css/texts.css'
import './assets/css/buttons.css'
import './assets/css/inputs.css'

import { useState } from 'react'
import Header from './components/header/header'
import ProtectedRoute from './components/ProtectedRoute'
import NavigationMenu from './components/navigationMenu/NavigationMenu'
import AddClientPage from './pages/addClientPage/AddClientPage'
import FormNewClient from './components/formNewClient/FormNewClient'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  const[isLogged, log] = useState(true)

  return (
    <>
      <Router>
        <Header isLoggedIn={isLogged}/>
        <ProtectedRoute isLoggedIn={isLogged}>
          <NavigationMenu/>
        </ProtectedRoute>
        <Routes>
          <Route path='/cliente' element={
            <ProtectedRoute isLoggedIn={isLogged}>
              <AddClientPage/>
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
