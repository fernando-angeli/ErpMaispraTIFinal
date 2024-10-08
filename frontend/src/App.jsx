import './App.css'
import './assets/css/texts.css'
import './assets/css/buttons.css'

import { useState } from 'react'
import HomePage from './pages/HomePage'
import Header from './components/header/header'
import ProtectedRoute from './components/ProtectedRoute'
import NavigationMenu from './components/navigationMenu/NavigationMenu'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  const[isLogged, log] = useState(true)

  return (
    <>
      <Router>
        <Header isLoggedIn={isLogged}/>
        <Routes>
          <Route path='/' element={
            <ProtectedRoute isLoggedIn={isLogged}>
              <NavigationMenu/>
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
