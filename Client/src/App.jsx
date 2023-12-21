import { useEffect, useState } from 'react'
import "./App.css"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Link
} from "react-router-dom";
import Home from './components/Home';
import FlashCards from './components/FlashCards';
import ContactMe from './components/ContactMe';

function App() {

  return (
    <Router>
      <div className='navbar'>
        <NavLink exact to="/" className="navbarItem" activeClassName='activeNavbarItem'>Home</NavLink>
        <NavLink exact to="/cards" className="navbarItem" activeClassName='activeNavbarItem'>Flash Cards</NavLink>
        <NavLink exact to="/contact" className="navbarItem" activeClassName='activeNavbarItem'>Contact Me</NavLink>
      </div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/cards">
          <FlashCards />
        </Route>
        <Route exact path="/contact">
          <ContactMe />
        </Route>
      </Switch>
    </Router>

  )
}

export default App
