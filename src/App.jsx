// import "./style.css";
// import "./responsive.css";
// import Playlist from "./pages/home";
// import LoginPage from "./pages/login";

// export default function App() {
//   return (
//     <div className="App">
//       <Playlist />
//     </div>
//   );
// }

// import { Component } from "react";
// import HomePage from "./pages/home";
// import LoginPage from "./pages/login";
// import getToken from "./pages/login/getToken";

// class App extends Component {
//   state = {
//     accessToken: null
//   };

//   componentDidMount() {
//     // console.log(getToken(window.location.hash));
//     const { access_token = null } = getToken(window.location.hash);
//     if (access_token) this.setState ({accessToken : access_token});
//   }
  
//   render() {
//     const { accessToken = null } = this.state;
//     if (accessToken)
//       return (
//         <div className="App">
//           <HomePage accessToken={accessToken} />
//         </div>
//       );
//       return (
//         <div className="App">
//           <LoginPage/>
//         </div>
//       );
//   }
// }
// export default App;

import {useEffect, useState} from "react";

function App() {
    const CLIENT_ID = "ee416f8946944eac93de1274207f1dad"
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    const [token, setToken] = useState("")
    const [searchKey, setSearchKey] = useState("")
    const [songs, setSongs] = useState([])

    // const getToken = () => {
    //     let urlParams = new URLSearchParams(window.location.hash.replace("#","?"));
    //     let token = urlParams.get('access_token');
    // }

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")
        console.log("token atas", token)
        // getToken()


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

    const searchArtists = async (e) => {
        const Authorization = `Bearer ${token}`;
        e.preventDefault()
        const songs = await fetch(`https://api.spotify.com/v1/search?q=ariana&type=track`, {
            // method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization
            }
          });

        console.log("tokek", token);
        console.log("ieu", songs);
        setSongs(songs);
    }

    // const renderArtists = () => {
    //     return artists.map(artist => (
    //         <div key={artist.id}>
    //             {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
    //             {artist.name}
    //         </div>
    //     ))
    // }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Spotify React</h1>
                {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                        to Spotify</a>
                    : <button onClick={logout}>Logout</button>}

                {token ?
                    <form onSubmit={searchArtists}>
                        <input type="text" onChange={e => setSearchKey(e.target.value)}/>
                        <button type={"submit"}>Search</button>
                    </form>

                    : <h2>Please login</h2>
                }

                {/* {renderArtists()} */}

            </header>
        </div>
    );
}

export default App;