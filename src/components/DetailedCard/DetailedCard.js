import React from 'react';

const DetailedCard = ({currentArtist, onSetStateProperty, loggedUser}) => {
    const { name, image, alt, genre, city, web, submittedBy, submittedOn } = currentArtist;

    return (
        <div>
            <img 
            src={image} 
            alt={alt}
            style={{width:"1000px", height:"auto"}}
            />
            <h1>{name}</h1>
            <p>Žanr: <strong>{genre}</strong></p>
            <p>Dolaze iz : <strong>{city}</strong></p>
            <p><a href={"http://www." + web}>{web}</a></p>
            <p>Postavio {submittedBy} dana {submittedOn.toLocaleString()}</p>
            <input 
            onClick={() => 
                {
                    if(loggedUser.name){
                        onSetStateProperty("currentRoute", "updateartist");
                    }
                    else{
                        onSetStateProperty("currentRoute", "signin");
                        onSetStateProperty("message", "Molimo prijavite se");
                    }
                }
            }
            type="button" value="Uredi izvođača"/>

        </div>
    )
}

export default DetailedCard;





{/*             <div>
                {albums.map(album => {
                    return <div key={id++}>
                                <ol>
                                    {<p><strong>{album.title}</strong></p>}
                                    {<p><strong>{album.year}</strong></p>}
                                    {album.songs.map(song => {
                                        return <li key={song}>{song}</li>
                                    })}
                                </ol>
                                <hr/>
                            </div>
                })}
            </div> */}