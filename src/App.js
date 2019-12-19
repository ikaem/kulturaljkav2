import React from 'react';
import './App.css';
// import SummaryCard from './components/SummaryCard/SummaryCard';
import Home from './components/Home/Home';

//import {artists} from './artists';
import DetailedCard from './components/DetailedCard/DetailedCard';
import Navigation from './components/Navigation/Navigation';
import AddUpdateArtist from './components/AddUpdateArtist/AddUpdateArtist';
import SigninRegister from './components/SigninRegister/SigninRegister';

class App extends React.Component {
  constructor(){
    super();
      this.state = {
        artists: [],
        // currentRoute: "home",
        currentRoute: "home",
        // currentRoute: "band",
        currentArtist: {
          alt: "",
          city: "",
          genre: "",
          id: "",
          image: "",
          name: "",
          submittedBy: "",
          submittedOn: "",
          lastUpdatedOn: "",
          lastUpdatedBy: "",
          web: "",
        },
        loggedUser: {
/*           name: "Karlo",
          email: "karlo@gmail.com" */
        },
        message: "",
      };
  }
  componentDidMount(){
    // ROOT GET
    this.onEndpointFetch("get","/",)
    .then(artists => this.onSetStateProperty("artists", artists));
  }
  onEndpointFetch = (method, param="", data) => {
    return fetch(`http://localhost:5000${param}`,{
      method: method,
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(err => console.log(err));
  }
  setLoggedUser = (user={}) => {
    this.setState({loggedUser: user});
  }
  setCurrentArtist = (artist={}) => {
    this.setState({currentArtist: artist});
  }
  // dont think i need this one
  setInitialState = () => {
    this.setState({
      artists: [],
      // currentRoute: "home",
      currentRoute: "home",
      // currentRoute: "band",
      currentArtist: {
        alt: "",
        city: "",
        genre: "",
        id: "",
        image: "",
        name: "",
        submittedBy: "",
        submittedOn: "",
        lastUpdatedOn: "",
        lastUpdatedBy: "",
        web: "",
      },
      loggedUser: {},
      message: "",
    })
  }
  /* DONT NEED THIS ONE
  setCurrentRoute = (route="home") => {
    this.setState({currentRoute: route});
  } */
  setMessage = (message="") => {
    this.setState({message: message});
  }
  
  // ===  would this work instead of all setstate functions? with default value being "", even for objects? === //
  onSetStateProperty = (property, value={}) => {
    this.setState({[property]: value});
    // just for testing
    console.log(value)
  }
  // ======================================================================== // 


  routeSwitcher = () => {
    switch(this.state.currentRoute){
      case "home": 
        return <div>
            <Home 
            artists={this.state.artists}
            onSetStateProperty={this.onSetStateProperty}
            key={this.state.currentRoute}
            currentArtist={this.currentArtist}
            />
          </div>
      case "band": 
        return <div>
            <DetailedCard 
            currentArtist={this.state.currentArtist}
            loggedUser={this.state.loggedUser}
            onSetStateProperty={this.onSetStateProperty}
            />
          </div>
      case "addartist":
      case "updateartist": 
        return <div>
          <AddUpdateArtist
            currentArtist={this.state.currentArtist}
            currentRoute={this.state.currentRoute}
            key={this.state.currentRoute}
            onEndpointFetch={this.onEndpointFetch}
            onSetStateProperty={this.onSetStateProperty}
            loggedUser={this.state.loggedUser}
            //
          />
          </div>
      case "signin":
      case "register": 
        return <div>
          <SigninRegister
            currentRoute={this.state.currentRoute}
            currentArtist={this.state.currentArtist}
            onEndpointFetch={this.onEndpointFetch}
            loggedUser={this.state.loggedUser}
            onSetStateProperty={this.onSetStateProperty}
            message={this.state.message}
            key={this.state.currentRoute}
          />
          </div>
      default: 
        return null;
    }
  }


  render(){
    return (
      <div>
        <h1>Kulturaljka</h1>
        <Navigation
          setCurrentRoute={this.setCurrentRoute}
          loggedUser={this.state.loggedUser}
          setInitialState={this.setInitialState}
          onSetStateProperty={this.onSetStateProperty}
        />
{/*         
        <Search/> */}
        {this.routeSwitcher()}
        <h6>{"Zaštićen sadržaj se koristi za samoedukaciju i nije odobren od strane autora"}</h6>
      </div>

    )
  }
}

export default App;
