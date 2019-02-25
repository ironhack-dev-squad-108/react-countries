import React, { Component } from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Countries from './pages/Countries';
import AddCountry from './pages/AddCountry';
import Secret from './pages/Secret';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CountryDetail from './pages/CountryDetail';
import EditCountry from './pages/EditCountry';
import api from '../api';
import logo from '../logo.svg';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: []
    }
    // api.loadUser();
  }

  handleLogoutClick(e) {
    api.logout()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">MERN Boilerplate</h1>
          <NavLink to="/" exact>Home</NavLink>
          <NavLink to="/countries">Countries</NavLink>

          {/* The NavLink "Add country" is displayed only when the user is connected */}
          {api.isLoggedIn() && <NavLink to="/add-country">Add country</NavLink>}

          {!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
          {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
          {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link>}
          <NavLink to="/secret">Secret</NavLink>
        </header>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/countries" component={Countries} />
          <Route exact path="/countries/:countryId" component={CountryDetail} />
          <Route exact path="/edit-country/:countryId" component={EditCountry} />
          <Route exact path="/add-country" component={AddCountry} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/secret" component={Secret} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
