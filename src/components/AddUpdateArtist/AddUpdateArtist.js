import React from 'react';
import {artists} from "../../artists";

class AddUpdateArtist extends React.Component{
    constructor(props){
        super(props);

        this.formRef = React.createRef();

        this.state = {
            formArtist:{
                alt: "Creative Commons Credit",
                city: "",
                genre: "",
                id: Math.random(),
                image: "",
                name: "",
                submittedBy: "Karlo",
                submittedOn: new Date(),
                lastUpdatedOn: "How to do this?",
                lastUpdatedBy: "Who did it",
                web: "",
            },
            artistToUpdate: {}
        }
    }


    onChangeHandler = (event) => {
        this.setState(Object.assign(this.state.formArtist, {
            [event.target.name]: event.target.value
        }))
    }

    onSubmitForm = (event) => {
        event.preventDefault();
        artists.push(this.state.formArtist);
        console.log("artists", artists);
        console.log(this.formRef);
        console.log(this.formRef.current.length);
        // console.log("this.props:", this.props);
    }

    resetForm = () => {
        setTimeout(() => {
            this.formRef.current.reset();
            console.log(3);
        },1)
        
    }

    render(){

        return (
        <main>
            <form
            ref={this.formRef}
            name="form" onSubmit={this.onSubmitForm}>
                <legend>{this.props.currentRoute === "addArtist" ? "Dodaj izvođača": "Uredi izvođača"}</legend>

                <div>
                    <label htmlFor="name">Ime izvođača</label>
                    <input 
                    onChange={this.onChangeHandler}
                    defaultValue={this.props.currentArtist.name} type="text" name="name" id="name"/>
                </div>

                <div>
                    <label htmlFor="image">Poveznica na sliku</label>
                    <input 
                    onChange={this.onChangeHandler}
                    defaultValue={this.props.currentArtist.image} type="text" name="image"  id="image"/>
                </div>

                <div>
                    <label htmlFor="genre">Žanr</label>
                    <input 
                    onChange={this.onChangeHandler}
                    defaultValue={this.props.currentArtist.genre} type="text" name="genre"  id="genre"/>
                </div>

                <div>
                    <label htmlFor="city">Izvođač dolazi iz:</label>
                    <input 
                    onChange={this.onChangeHandler}
                    defaultValue={this.props.currentArtist.city} type="city" name="city"  id="city"/>
                </div>

                <div>
                    <label htmlFor="web">Poveznica na stranicu</label>
                    <input 
                    onChange={this.onChangeHandler}
                    defaultValue={this.props.currentArtist.web} type="web" name="web"  id="web"/>
                </div>

                <input type="submit" value="Pošalji"/>

            </form>
        </main>
        )
    }
}

export default AddUpdateArtist;



