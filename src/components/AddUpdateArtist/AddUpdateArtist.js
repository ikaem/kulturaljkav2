import React from 'react';

class AddUpdateArtist extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            artist: {
                alt: "i ovo ce trebati namjestiti - mozda cak staviti opis slike input.. ili maknuti skroz",
                city: "",
                genre: "",
                id: Math.random(),
                image: "",
                name: "",
                submittedBy: "Kako ovo",
                submittedOn: new Date(),
                lastUpdatedOn: new Date(),
                lastUpdatedBy: this.props.loggedUser.name,
                web: " ",
            },
            // this property i dont need, but im leaving it because i busted my ass working around it to update just artist property
            currentRoute: "",
            obsoleteArtist: "",
        }
/*         BINDING APPARENTLY NOT NEEDED BECAUSE WE ARE USING ARROW FUNCTIONS FOR EVENT FUNCTIONS HERE, SO THIS.AUTOMATICALLY REFERS TO THIS OBJECT?
        this.onArtistChangeHandler = this.onArtistChangeHandler.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this); */
    }
    componentDidMount(){
        this.props.currentRoute === "addartist"? this.setState({currentRoute: this.props.currentRoute}): this.setState({artist: Object.assign({},this.props.currentArtist), obsoleteArtist: Object.assign({},this.props.currentArtist), currentRoute: this.props.currentRoute})
        console.log(this.state);
    }

    onArtistChangeHandler = (event) => {
        //this.setState({artist: {[event.target.name]: event.target.value}})
        this.setState({artist: Object.assign(this.state.artist, {[event.target.name]: event.target.value})})

    }
    onSubmitForm = (event) => {
        event.preventDefault();
        if(this.state.currentRoute === "addartist"){
            return this.state.artist; 
            // ovdje bi isto mogao ubaciti object.assign da dodam updateuser, createuser, i oba vremen isto....
        }
        else{
            return Object.assign({}, this.state.obsoleteArtist, this.state.artist);
        }
    }

    fetchArtist = (artist) => {
        if(this.state.currentRoute === "addartist"){
            this.props.onEndpointFetch("post", "/addartist", artist)
            .then(artists => {
                {   this.props.onSetStateProperty("artists", artists);
                    // ovo ispod bi moglo kiksat za postavljanje forme u updateu nakon stoj se ovaj new artist izvrsi...
                    this.props.onSetStateProperty("currentArtist");}})
            .then(() => this.props.onSetStateProperty("currentRoute", "home"))
            .catch(err => console.log(err))        

        }
        else{
            this.props.onEndpointFetch("put", "/updateartist", artist)
            .then(artists => 
                {   this.props.onSetStateProperty("artists", artists);
                    this.props.onSetStateProperty("currentArtist", artists.find(artist => artist.id === this.state.artist.id))})
            .then(() => this.props.onSetStateProperty("currentRoute", "band"))
            .catch(err => console.log(err));
        }
    }
    render(){
        return (
                <form
                name="form" onSubmit={(event) => this.fetchArtist(this.onSubmitForm(event))}>
                    <legend>{this.state.currentRoute === "addartist" ? "Dodaj izvođača": "Uredi izvođača"}</legend>

                    <div>
                        <label htmlFor="name">Ime izvođača</label>
                        <input 
                        required
                        value={this.state.artist.name} onChange={this.onArtistChangeHandler} type="text" name="name" />
                    </div>

                    <div>
                        <label htmlFor="image">Poveznica na sliku</label>
                        <input 
                        required 
                        value={this.state.artist.image} onChange={this.onArtistChangeHandler} type="text" name="image" />
                    </div>

                    <div>
                        <label htmlFor="genre">Žanr</label>
                        <input 
                        required 
                        value={this.state.artist.genre} onChange={this.onArtistChangeHandler} type="text" name="genre" />
                    </div>

                    <div>
                        <label htmlFor="city">Izvođač dolazi iz:</label>
                        <input 
                        required 
                        value={this.state.artist.city} 
                        onChange={this.onArtistChangeHandler}
                        type="text" name="city" />
                    </div>

                    <div>
                        <label htmlFor="web">Poveznica na stranicu</label>
                        <input 
                        required 
                        value={this.state.artist.web} onChange={this.onArtistChangeHandler} type="text" name="web" />
                    </div>

                    <input type="submit" value="Pošalji"/>

                </form>

        )
    }
}

export default AddUpdateArtist;



