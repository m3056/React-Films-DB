import React, {Component} from "react"
import TopNavigation from "./TopNavigation"
import {Route} from "react-router-dom";
//import Film from "./films/Film";
import {Async, lazyImport} from "./Async";
import {setAuthorizationHeader} from "../utils";

import jwtDecode from "jwt-decode";


const HomePage = Async(lazyImport("./HomePage"))
const FilmsPage = Async(lazyImport("./FilmsPage"))
const SignupPage = Async(lazyImport("./SignupPage"))
const LoginPage = Async(lazyImport("./LoginPage"))



export class App extends Component {

  state = {
    user: {
      token: undefined,
      role: "user"
    }
  }

  componentDidMount() {
    if (localStorage.filmsToken) {
      this.setState({user: {
        token: localStorage.filmsToken,
        role: jwtDecode(localStorage.filmsToken).user.role
        
        }})
      setAuthorizationHeader(localStorage.filmsToken)
    }
  }
  
  login = token => {
    this.setState({
      user:{token, role: jwtDecode(token).user.role}
    })
    localStorage.filmsToken = token
    setAuthorizationHeader(token)
  }

  logout = () => {
    this.setState({user: {token: null}})
    setAuthorizationHeader()
    delete localStorage.filmsToken
  }

  render() {
    return (
      <div className="ui container pt-3">
        <TopNavigation logout={this.logout} isAuth={this.state.user.token} isAdmin={this.state.user.role === "admin"}/>
        <Route exact path="/">
          <HomePage/>
        </Route>
        <Route path="/films" render={props => (
          <FilmsPage {...props} user={this.state.user} />
        )}/>
        {/* <Route path="/films/:_id" exact component={Film}/> */}
        <Route path="/signup" exact component={SignupPage}/>
        <Route path="/login" exact render={
          props => <LoginPage {...props} login={this.login}/>
        }
        />
      
      </div>
    )
  }
}

export default App