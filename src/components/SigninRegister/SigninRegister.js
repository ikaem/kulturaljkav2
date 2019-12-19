import React from 'react';
import {users} from '../../users'
// ({currentRoute, onChangeRoute})
class SigninRegister extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            password: "",
            email: "",
            currentRoute: "",

        }
    /*  SEEMS LIKE NOT NEEDED EITHER, SAME AS WITH ARTIST FORM
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this); */

    }
    componentDidMount(){
        this.setState({currentRoute: this.props.currentRoute})
    }

    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmitForm = (event) => {
        event.preventDefault();
        if(this.props.currentRoute === "signin"){
            return {email: this.state.email, password: this.state.password}
        }
        else{
            return {email: this.state.email, password: this.state.password, name: this.state.name}
        }
    }

    fetchUser = (user) => {
        if(this.state.currentRoute === "signin"){
            // ovdje bi se jos dalo provjeravat po vrijednosti message elementa, i usmjeravati korinika prema tome... mozda cak samo prebaciti poruku sa servera do korisnika, na hrvatskom...
            this.props.onEndpointFetch("post", "/login", user)
            .then(response => {
                if(response.message === "Login success"){
                    this.props.onSetStateProperty("loggedUser", response.data);
                    this.props.onSetStateProperty("currentRoute", "home");
                }
                else{
                    this.props.onSetStateProperty("message", "Nepostojeći korisnik ili netočna lozinka. Pokušajte ponovno");
                }
            })
            .catch(console.log);
        }
        else{
            this.props.onEndpointFetch("post", "/register", user)
            .then(response => {
                if(response.message === "registration success"){
                    this.props.onSetStateProperty("loggedUser", response.data);
                    this.props.onSetStateProperty("currentRoute", "home");
                }
                else if(response.message === "email already in use"){
                    this.props.onSetStateProperty("message", "Unešeni email se već koristi");
                }
                else{
                    this.props.onSetStateProperty("message", "molimo ispunite sva polja");
                }
            })
            .catch(console.log);
        }
    }

    render(){
        return (
            <form name="form" onSubmit={(event) => this.fetchUser(this.onSubmitForm(event))}>
                <legend>{this.props.currentRoute === "signin"? "Prijava": "Registracija"}</legend>
                
                {!(this.props.currentRoute === "signin")? (<div>
                    <label htmlFor="name">Ime</label>
                    <input 
                    required
                    value = {this.state.name}
                    onChange={this.onChangeHandler}
                    type="text" 
                    name="name" 
                    id="name"/>
                </div>): ""}

                <div>
                    <label htmlFor="password">Lozinka</label>
                    <input 
                    required
                    value = {this.state.password}
                    onChange={this.onChangeHandler}
                    type="password" 
                    name="password" 
                    id="password"/>
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                    required
                    value = {this.state.email}
                    onChange={this.onChangeHandler}
                    type="email" 
                    name="email" 
                    id="email"/>
                </div>

                {/* might change these submit types to some p element or something... */}
                {this.props.currentRoute === "signin"? (
                    <input 
                    type="submit" 
                    value="Pošalji"/>): 
                    (
                    <input 
                    type="submit" 
                    value="Register"/>)}
                {<div>{this.props.message}</div>}

            </form>
        )
    }
}

export default SigninRegister;