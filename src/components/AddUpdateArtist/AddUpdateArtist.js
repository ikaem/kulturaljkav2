import React from 'react';

const AddUpdateArtist = (props) => {
    const {currentRoute, onArtistToDB, currentArtist, loggedUser} = props;

    console.log(loggedUser);


    const onSubmitForm = (event) => {
        event.preventDefault();
        return {
            artist: {
                alt: "Creative Commons Credit",
                city: event.target.city.value,
                genre: event.target.genre.value,
                id: (currentRoute === "addArtist"? Math.random(): currentArtist.id),
                image: event.target.image.value,
                name: event.target.name.value,
                submittedBy: (currentRoute === "addArtist"? loggedUser.name: currentArtist.submittedBy),
                submittedOn: (currentRoute === "addArtist"? new Date(): currentArtist.submittedOn),
                lastUpdatedOn: new Date(),
                lastUpdatedBy: loggedUser.name,
                web: event.target.web.value,
            },
            cameFrom: currentRoute,
        }
    }
        
    return (
        <main>
            <form
            name="form" onSubmit={(event) => onArtistToDB(onSubmitForm(event))}>
                <legend>{currentRoute === "addArtist" ? "Dodaj izvođača": "Uredi izvođača"}</legend>

                <div>
                    <label htmlFor="name">Ime izvođača</label>
                    <input 
                    defaultValue={currentArtist.name} type="text" name="name" id="name"/>
                </div>

                <div>
                    <label htmlFor="image">Poveznica na sliku</label>
                    <input 
                    defaultValue={currentArtist.image} type="text" name="image"  id="image"/>
                </div>

                <div>
                    <label htmlFor="genre">Žanr</label>
                    <input 
                    defaultValue={currentArtist.genre} type="text" name="genre"  id="genre"/>
                </div>

                <div>
                    <label htmlFor="city">Izvođač dolazi iz:</label>
                    <input 
                    defaultValue={currentArtist.city} type="city" name="city"  id="city"/>
                </div>

                <div>
                    <label htmlFor="web">Poveznica na stranicu</label>
                    <input 
                    defaultValue={currentArtist.web} type="web" name="web"  id="web"/>
                </div>

                <input type="submit" value="Pošalji"/>

            </form>
        </main>
    )
}

export default AddUpdateArtist;



