import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
import Cities from "./components/Cities";
import Home from "./components/Home";
import SignIn from "./components/SignIn/SignIn";
import NewUser from "./components/NewUser";
import Trips from "./components/Trips/Trips";
import CreateTrip from "./components/CreateTrip";
import Navtabs from "./components/Navtabs";
import Header from "./components/Header";
import Profile from "./components/Profile";
import "./App.css";

const DisplayLinks = props => {
  if (props.loggedIn) {
    return (
      <nav className="navbar">
        <ul className="nav">
          <li>
            <Link to="#" className="nav-link" onClick={props._logout}>
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      user: null
    };
    this._logout = this._logout.bind(this);
    this._login = this._login.bind(this);
  }
  componentDidMount() {
    axios.get("/auth/user").then(response => {
      if (!!response.data.user) {
        // console.log("THERE IS A USER");
        // console.log(response.data);
        const userId = response.data.user._id;
        const thumbnail = response.data.user.thumbnail;
        // console.log(userId);
        // console.log(thumbnail);
        // This sets the user's mongo id to local storage

        localStorage.setItem("userId", response.data.user._id);
        localStorage.setItem("userName", response.data.user.name);
        localStorage.setItem("email", response.data.user.email);
        localStorage.setItem("thumbnail", response.data.user.thumbnail);
        this.setState({
          loggedIn: true,
          user: response.data.user
        });
      } else {
        this.setState({
          loggedIn: false,
          user: null
        });
      }
    });
  }

  _logout(event) {
    event.preventDefault();
    console.log("logging out");
    axios.post("/logout").then(response => {
      console.log(response.data);
      if (response.status === 200) {
        this.setState({
          loggedIn: false,
          user: null
        });
      }
    });
  }

  _login(username, password) {
    axios
      .post("/auth/login", {
        username,
        password
      })
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          // update the state
          this.setState({
            loggedIn: true,
            user: response.data.user
          });
        }
      });
  }

  render() {
    return (
      <Router>
        <div>
          <Header user={this.state.user} />
          <Route exact path="/" component={Home} />
          <Route exact path="/Home" component={Home} />
          <Route exact path="/Cities/:city" component={Cities} />
          <Route exact path="/SignIn" component={SignIn} />
          <Route exact path="/NewUser" component={NewUser} />
          <Route exact path="/Trips" component={Trips} />
          <Route exact path="/CreateTrip" component={CreateTrip} />
          <Route exact path="/Navtabs" component={Navtabs} />
          <Route exact path="/Profile" component={Profile} />
        </div>
      </Router>
    );
  }
}

export default App;
