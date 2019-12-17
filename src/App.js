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
      this.state = {};
  }
  componentDidMount(){
    this.setInitialState();
    // ROOT GET
    this.onEndpointFetch("get","/",)
    .then(artists => this.setState({artists: artists}))
}

  onEndpointFetch = (method, param1="", data) => {
    return fetch(`http://localhost:5000${param1}`,{
      method: method,
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(err => console.log(err));
  }


// UPDATE AND ADD ARTIST - this will move to add artist component
  onArtistToDB = (artistData) => {
    if(artistData.cameFrom === "updateArtist"){
      this.onEndpointFetch("put","/updateartist","",artistData.artist)
      .then(artist => this.setState({currentArtist: artist, currentRoute: "band"}))
    }
    else{
      this.onEndpointFetch("post", "/addartist", "", artistData.artist)
      .then(data => this.setState({currentRoute: "home"}));
    }
    // refetch artists in either case
    this.onEndpointFetch("get","/",)
    .then(artists => this.setState({artists: artists}))
  }
// -----------------------


// this will go away
  onSignoutAndResetState = () => {
    this.setInitialState();
    // refetch artists
    this.onEndpointFetch("get","/",)
    .then(artists => this.setState({artists: artists}))
  }

  setLoggedUser = (user={}) => {
    this.setState({loggedUser: user});
  }
  setCurrentArtist = (artist={}) => {
    this.setState({currentArtist: artists});
  }
  setInitialState = () => {
    this.setState({
      artists: [],
      // currentRoute: "home",
      currentRoute: "home",
      // currentRoute: "band",
      currentArtist: {
      },
      loggedUser: {
        // name: "Karlo",
        // email: "karlo@gmail.com"
      },
      message: "",
    })
  }
  setCurrentRoute = (route="home") => {
    this.setState({currentRoute: route});
  }
  setMessage = (message="") => {
    this.setState({message: message});
  }
  onChangeRoute = (route, artistName = "", notLoggedMessage = "") => {
    // used for creating currentArtist object, to be used for the state so detailedCard, addUpdateArtists are avaialble
    const onLoadCurrentArtist = (name) => {
      if(name){
        return this.state.artists.filter(artist => {
          return artist.name === name;
        })[0]
      }
      else{
         return this.state.emptyArtist;
      }
    }
    this.setState(Object.assign(this.state, {currentArtist: onLoadCurrentArtist(artistName), currentRoute: route, notLoggedMessage: notLoggedMessage}));

    console.log("currentArtist:", this.state.currentArtist);
    console.log("currentRoute:", this.state.currentRoute);
  }

  loggedInRouter = (logged, notLogged, artistName = "", notLoggedMessage = "") => {
    if(this.state.loggedUser.name){
        this.onChangeRoute(logged, artistName);
    }
    else{
        this.onChangeRoute(notLogged, artistName, notLoggedMessage);
        //this.setState({notLoggedMessage: notLoggedMessage});
    }
  }


  
  routeSwitcher = () => {
    switch(this.state.currentRoute){
      case "home": 
        return <div>
            <Home 
            artists={this.state.artists}
            onChangeRoute={this.onChangeRoute}
            key={this.state.currentRoute}
            />
          </div>
      case "band": 
        return <div>
            <DetailedCard 
            onChangeRoute={this.onChangeRoute}
            loggedInRouter={this.loggedInRouter}
            currentArtist={this.state.currentArtist}
            id={this.state.currentArtist.id}
            name={this.state.currentArtist.name}
            image={this.state.currentArtist.image}
            alt={this.state.currentArtist.alt}
            genre={this.state.currentArtist.genre}
            city={this.state.currentArtist.city}
            web={this.state.currentArtist.web}
            submittedBy={this.state.currentArtist.submittedBy}
            submittedOn={this.state.currentArtist.submittedOn}
            />
          </div>
      case "addArtist":
      case "updateArtist": 
        return <div>
          <AddUpdateArtist
            currentRoute={this.state.currentRoute}
            onArtistToDB={this.onArtistToDB}
            currentArtist={this.state.currentArtist}
            loggedUser={this.state.loggedUser}
            onChangeRoute={this.onChangeRoute}
            // key={this.state.currentRoute}
            key={this.state.currentRoute}
            onEndpointFetch={this.onEndpointFetch}
          />
          </div>
      case "signin":
      case "register": 
        return <div>
          <SigninRegister
            currentRoute={this.state.currentRoute}
            onChangeRoute={this.onChangeRoute}
            loginUser={this.loggedUserToState}
            notLoggedMessage={this.state.notLoggedMessage}
            currentArtist={this.state.currentArtist}
            onEndpointFetch={this.onEndpointFetch}
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
          onSignoutAndResetState={this.onSignoutAndResetState}
          onChangeRoute={this.onChangeRoute}
          loggedInRouter={this.loggedInRouter}
          loggedUser={this.state.loggedUser}
          currentArtist={this.state.currentArtist}
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
