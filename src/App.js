import React from 'react';
import './App.css';
// import SummaryCard from './components/SummaryCard/SummaryCard';
import Home from './components/Home/Home';

//import {artists} from './artists';
import DetailedCard from './components/DetailedCard/DetailedCard';
import Navigation from './components/Navigation/Navigation';
import AddUpdateArtist from './components/AddUpdateArtist/AddUpdateArtist';
import SigninRegister from './components/SigninRegister/SigninRegister';

const initialState = {
  artists: [],
  currentRoute: "home",
  // currentRoute: "addArtist",
  // currentRoute: "band",
  currentArtist: {
  },
  emptyArtist: {
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
  notLoggedMessage: "",
}

class App extends React.Component {
  constructor(){
    super();
      this.state = initialState;
  }

  componentDidMount(){
    // fetching data for the artist state
    fetch("http://localhost:5000/")
    .then(response => response.json())
    .then(artists => this.setState({artists: artists}))
    .catch(err => console.log(err))

  }

  onSignoutAndResetState = () => {
    this.setState(initialState);
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

  addArtistToDB = (artist) => {
    let add = true;
    let index;

    this.state.artists.forEach((artistDB, indexDB) => {
      if(artistDB.id === artist.id){
        console.log("We have that user...");
        add = false;
        index = indexDB;
      }
    })

    if(add){
      artists.push(artist);
      console.log(artists);
    }
    else{
      artists[index] = artist;
      console.log(artists);
    }
  }

  loggedUserToState = (user) => {
    this.setState({loggedUser: user});
  }
  
  routeSwitcher = () => {
    switch(this.state.currentRoute){
      case "home": 
        return <div>
            <Home 
            artists={this.state.artists}
            onChangeRoute={this.onChangeRoute}
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
            addArtistToDB={this.addArtistToDB}
            currentArtist={this.state.currentArtist}
            onChangeRoute={this.onChangeRoute}
            // key={this.state.currentRoute}
            key={this.state.currentRoute}
          />
          </div>
      case "signin":
      case "register": 
        return <div>
          <SigninRegister
            currentRoute={this.state.currentRoute}
            onChangeRoute={this.onChangeRoute}
            loggedUserToState={this.loggedUserToState}
            notLoggedMessage={this.state.notLoggedMessage}
            currentArtist={this.state.currentArtist}

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
