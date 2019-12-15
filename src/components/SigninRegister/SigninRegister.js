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
        }
    }

    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmitForm = (event) => {
        event.preventDefault();

        console.log(this.props);
            if(this.props.currentRoute === "signin"){
                const loggedUser = () => {
                    let foundLoginUser = false;
                    for(this.user of users){
                        if(this.user.email === this.state.email && this.user.password === this.state.password){
                            foundLoginUser = true;

                            this.props.onChangeRoute("home", this.props.currentArtist.name);
                            console.log(this.props.currentArtist);

                            return {email: this.user.email, name: this.user.name};
                        }
                    }
                    if(!foundLoginUser){
                        this.props.onChangeRoute("signin", "", "Nepostojeći korisnik. Molimo provjerite unos ili se registrirajte.")
                        return {};
                    }
                }
                return loggedUser();
            }
            else if(this.props.currentRoute === "register"){

                // trebao bi pregledati korisnike i vidjeti postoji li ijedan s istim tim emailom

                if(!users.some(user => user.email === this.state.email)){
                    users.push(this.state);
                    console.log(users);
                    this.props.onChangeRoute("home", this.props.currentArtist.name)
                    return {email: this.state.email, name: this.state.name};
                }
                else{
                    console.log("A user with this email already exists");
                    this.props.onChangeRoute("register", this.props.currentArtist.name, "A user with this email already exists");
                    return {};
                }


            }
    }

    render(){
        return (
        <main>
            <form name="form" onSubmit={(event) => this.props.loggedUserToState(this.onSubmitForm(event))}>
                <legend>{this.props.currentRoute === "signin"? "Prijava": "Registracija"}</legend>
                
                {!(this.props.currentRoute === "signin")? (<div>
                    <label htmlFor="name">Ime</label>
                    <input 
                    required
                    onChange={this.onChangeHandler}
                    type="text" 
                    name="name" 
                    id="name"/>
                </div>): ""}

                <div>
                    <label htmlFor="password">Lozinka</label>
                    <input 
                    required
                    onChange={this.onChangeHandler}
                    type="password" 
                    name="password" 
                    id="password"/>
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                    required
                    onChange={this.onChangeHandler}
                    type="email" 
                    name="email" 
                    id="email"/>
                </div>
                {this.props.notLoggedMessage}

                {/* might change these submit types to some p element or something... */}
                {this.props.currentRoute === "signin"? (
                    <input 
                    type="submit" 
                    value="Pošalji"/>): 
                    (
                    <input 
                    type="submit" 
                    value="Register"/>)}

            </form>
        </main>
        )
    }
}

export default SigninRegister;