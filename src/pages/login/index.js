// function Login() {
//     const CLIENT_ID = "9006556b2e954a06b6ee20a8738789cd"
//     const REDIRECT_URI = "http://localhost:3000"
//     const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
//     const RESPONSE_TYPE = "token"
//     const SCOPE = "playlist-modify-private"
//     return (
//         <div className="Login">
//             <header className="Login-header">
//             <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>Login to Spotify</a>
//             </header>
//         </div>
//     );
// }

// export default Login;

import {useEffect, useState} from "react";

const Login = () => {
	const CLIENT_ID = "9006556b2e954a06b6ee20a8738789cd"
	const REDIRECT_URI = "http://localhost:3000"
	const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
	const RESPONSE_TYPE = "token"
	const SCOPE = "playlist-modify-private"

	const [token, setToken] = useState("")
	const [searchKey, setSearchKey] = useState("")
	const [artists, setArtists] = useState([])

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
		const searchArtists = async (e) => {
			e.preventDefault()
			const {data} = fetch("https://api.spotify.com/v1/search", {
					headers: {
							Authorization: `Bearer ${token}`
					},
					params: {
							q: searchKey,
							type: "artist"
					}
			})

			setArtists(data.artists.items)
	}

	const renderArtists = () => {
			return artists.map(artist => (
					<div key={artist.id}>
							{artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
							{artist.name}
					</div>
			))
	}

	return (
			<div>
					<header>
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

							{renderArtists()}

					</header>
			</div>
	);

}