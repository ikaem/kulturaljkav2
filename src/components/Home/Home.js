import React from 'react';
import SummaryCard from '../SummaryCard/SummaryCard';

const Home = ({artists, currentArtist, onSetStateProperty}) => {
    

    const summaryCards = artists.map(artist => {
        return <SummaryCard
                key={artist.id}
                image={artist.image}
                alt={artist.alt}
                name={artist.name}
                genre={artist.genre}
                web={artist.web}
                onSetStateProperty={onSetStateProperty}
                currentArtist={artist}
            />
    })

    return(
        <div>
            {summaryCards}
        </div>
    )
}

export default Home;