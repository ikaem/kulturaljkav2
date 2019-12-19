import React from 'react';

const SummaryCard = ({currentArtist, onSetStateProperty}) => {
    const {image, alt, name, genre} = currentArtist;
    
    return (
        <div>
            <h1>{name}</h1>
            <img 
            src={image} 
            alt={alt}
            style={{width:"500px", height:"auto"}}
            />
            <p>Žanr: <strong>{genre}</strong></p>
            <input 
            type="button" 
            value="Detaljnije"
            onClick={()=> {
                onSetStateProperty("currentRoute", "band")
                onSetStateProperty("currentArtist", currentArtist)
                console.log(currentArtist);
                }}
            />
        </div>
    )
}

export default SummaryCard;