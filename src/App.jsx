import {useEffect, useState} from "react";
import SongComponent from "./component/song";
import "./style.css";
import "./responsive.css"

function App() {
    const CLIENT_ID = "ee416f8946944eac93de1274207f1dad"
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    const [token, setToken] = useState("")
    const [searchKey, setSearchKey] = useState("")
    const [songs, setSongs] = useState([])

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }

        setToken(token)

    }, [])

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }

    const searchSongs = async (e) => {
      const Authorization = `Bearer ${token}`
        e.preventDefault()
        const songs = await fetch(`https://api.spotify.com/v1/search?q=${searchKey}&type=track`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization
          }
        }).then(res=>res.json());
        setSongs(songs.tracks.items);
        // console.log("lagu", songs.tracks.items)
    }


    return (
        <div className="App">
            <header className="App-header">
                <h1>Spotify React</h1>
                {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                        to Spotify</a>
                    : <button onClick={logout}>Logout</button>}

                {token ?
                    <form onSubmit={searchSongs}>
                        <input type="text" onChange={e => setSearchKey(e.target.value)}/>
                        <button type={"submit"}>Search</button>
                    </form>
                    : <h2>Please login</h2>
                }
                
                <div id="container">
            <div class="header">
                <h1>The Playlist</h1>
            </div>
            <div class="main">
                <div class="playlist">
                    <div class="playlist-title">
                    <h3>Your Album</h3>
                    </div>
                    <div id="playlist-body">
                  

{songs.map((data) => (
        <SongComponent key={data.id}
        images = { data.album.images[0].url }
        title = { data.name }
        artist = {data.artists.map((artist)=>(<span key={artist.id}>{artist.name}</span>))}
    />
      ))}
                    </div>
                </div>
            </div>
        </div>
              

            </header>
        </div>
    );
}

export default App;