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
        if(this.props.currentRoute === "signin"){
            return {email: this.state.email, password: this.state.password}
        }
        else{
            return {email: this.state.email, password: this.state.password, name: this.state.name}
        }
    }

    fetchUser = (user) => {
        this.props.onEndpointFetch("post", "/login", "", user)
        .then(response => {
            if(response.message === "Login success"){
                console.log(response.data)
                this.props.loginUser(response.data);
            }
            else{
                console.log(response.message);
            }
        })
        .catch(console.log);
    }

/*     

onEndpointFetch = (method, param1="", param2="", data) => {
  return fetch(`http://localhost:5000${param1}${param2}`,{
    method: method,
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  }) */



    render(){
        return (
        <main>
            <form name="form" onSubmit={(event) => this.fetchUser(this.onSubmitForm(event))}>
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