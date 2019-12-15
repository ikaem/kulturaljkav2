import React from 'react';

const SummaryCard = ({image, alt, name, genre, web, onChangeRoute}) => {
    return (
        <div>
            <h1>{name}</h1>
            <img 
            src={image} 
            alt={alt}
            style={{width:"500px", height:"auto"}}
            />
            <p>Žanr: <strong>{genre}</strong></p>
{/*             <p>Slučajna pjesma: <strong>{randomSong}</strong> s albuma <strong>{randomAlbum}</strong></p>
            <p><a href={"http://www." + web}>{web}</a></p> */}
            <input 
            type="button" 
            value="Detaljnije"
            onClick={()=> onChangeRoute("band", name)}
            />
        </div>
    )
}

export default SummaryCard;