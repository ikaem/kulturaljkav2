import React from "react";

const Navigation = ({onSignoutAndResetState, onChangeRoute, loggedUser, loggedInRouter, currentArtist}) => {
    return (
        <div>
                <ul>
                    <li onClick={() => onChangeRoute("home")}>Početna</li>
                    <li onClick={() => loggedInRouter("addArtist", "signin", "", "Za pristup je potrebna prijava")}>Dodaj izvođača</li>

                    {/* <li onClick={() => onChangeRoute("addArtist")}>Dodaj izvođača</li> */}

                {!loggedUser.name?
                        (<div><li onClick={() => onChangeRoute("signin")}>Prijava</li>
                        <li onClick={() => onChangeRoute("register", currentArtist.name)}>Registracija</li></div>):
                        (<div>
                        <li onClick={onSignoutAndResetState}>Odjava</li>
                        <li style={{listStyleType: "none"}}>Dobar dan, <strong>{loggedUser.name}</strong>.</li></div>
                        )
                }
                </ul>
        </div>
    )
}

export default Navigation;