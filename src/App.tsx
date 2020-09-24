import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Todo from './pages/Todo'
import About from './pages/About'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Switch>
          <Route component={Todo} path="/" exact />
          <Route component={About} path="/about" />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
