// import {useEffect, useState} from "react";
// import SongComponent from "./component/song";

// function Login() {
//     const CLIENT_ID = "ee416f8946944eac93de1274207f1dad"
//     const REDIRECT_URI = "http://localhost:3000"
//     const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
//     const RESPONSE_TYPE = "token"
//     const SCOPE = "playlist-modify-private"

//     const [token, setToken] = useState("")
//     const [searchKey, setSearchKey] = useState("")
//     const [songs, setSongs] = useState([])

//     useEffect(() => {
//         const hash = window.location.hash
//         let token = window.localStorage.getItem("token")

//         if (!token && hash) {
//             token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

//             window.location.hash = ""
//             window.localStorage.setItem("token", token)
//         }

//         setToken(token)

//     }, [])

//     return (
//         <div className="App">
//             <header className="App-header">
//                 <h1>Spotify React</h1>
//                 {!token ?
//                     <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>Login
//                         to Spotify</a>
//                     : <button onClick={logout}>Logout</button>}

//                 {/* {token ?
//                     <form onSubmit={searchKey}>
//                         <input type="text" onChange={e => setSearchKey(e.target.value)}/>
//                         <button type={"submit"}>Search</button>
//                     </form>

//                     : <h2>Please login</h2>
//                 }

//                 {songs.map((data) => (
//                     <SongComponent key={data.id}
//                         images = { data.album.images[0].url }
//                         title = { data.name }
//                         artist = {data.artists.map((artist)=>(<span key={artist.id}>{artist.name}</span>))}
//                     />
//                 ))} */}

//             </header>
//         </div>
//     );
// }

// export default Login;