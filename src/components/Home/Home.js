import React from 'react';
import SummaryCard from '../SummaryCard/SummaryCard';

const Home = ({artists, onChangeRoute}) => {
    

    const summaryCards = artists.map(artist => {
/*         const randomAlbum = artist.albums[Math.floor(Math.random()*artist.albums.length)]; */
        return <SummaryCard
                key={artist.id}
                image={artist.image}
                alt={artist.alt}
                name={artist.name}
                genre={artist.genre}
                // randomAlbum={randomAlbum.title}
                // randomSong={randomAlbum.songs[Math.floor(Math.random()*randomAlbum.songs.length)]}
                web={artist.web}
                onChangeRoute={onChangeRoute}
            />
    })

    return(
        <div>
            {summaryCards}
        </div>
    )
}

export default Home;