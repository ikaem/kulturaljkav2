import React from "react";

const Navigation = ({setCurrentRoute, loggedUser, setInitialState, onSetStateProperty}) => {
    return (
        <div>
                <ul>
                    <li onClick={() => onSetStateProperty("currentRoute", "home")}>Početna</li>
                    {/* add loggedUser.name condition instead */}
                    <li onClick={() =>loggedUser.name? onSetStateProperty("currentRoute", "addartist"): onSetStateProperty("currentRoute", "signin")}>Dodaj izvođača</li>

{/*                     <li onClick={() => onSetStateProperty("currentRoute", "addartist")}>Dodaj izvođača</li> */}

                {!loggedUser.name?
                        (<div><li onClick={() => onSetStateProperty("currentRoute", "signin")}>Prijava</li>
                        <li onClick={() => onSetStateProperty("currentRoute", "register")}>Registracija</li></div>):
                        (<div>
                        <li onClick={() => {
                            onSetStateProperty("loggedUser");
                            onSetStateProperty("currentArtist", {});
                        }}>Odjava</li>
                        <li style={{listStyleType: "none"}}>Dobar dan, <strong>{loggedUser.name.charAt(0).toUpperCase() + loggedUser.name.slice(1)}</strong>.</li></div>
                        )





                }
                </ul>
        </div>
    )
}

export default Navigation;