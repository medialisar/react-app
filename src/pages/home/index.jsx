// import { Component } from "react";
// import SongComponent from "../../component/song";

// class Home extends Component {
//   state = { songs: [], keyword: "" };

//   handleSubmit = async (e) => {
//     e.preventDefault();
//     const { keyword } = this.state;
//     const { accessToken } = this.props;
//     console.log("ini", accessToken);
//     const Authorization = `Bearer ${accessToken}`;
//     const headers = { 'Content-Type': 'application/json', Authorization }
//     const songs = await fetch(
//       `https://api.spotify.com/v1/search?q=${keyword}&type=track`, { headers }
//     )
//       .then((res) => res.json())
//       .then((result) => {
//           this.setState({ songs: result.tracks.itemes });
//       });
//     console.log("lagu", songs);
//   };

//   handleInputChange = (e) => {
//     this.setState({
//       keyword: e.target.value
//     });
//   };

//   render() {
//     const { songs = [] } = this.state;

//     return (
//       <>
//         <form style={{ marginBottom: "20px" }} onSubmit={this.handleSubmit}>
//           <input onChange={this.handleInputChange} type="text" />
//           <button>search</button>
//         </form>
//         {songs.map((data) => (
//             <SongComponent key={data.id}
//                 images = { data.album.images[0].url }
//                 title = { data.name }
//                 artist = {data.artists.map((artist)=>(<span key={artist.id}>{artist.name}</span>))}
//             />
//         ))}
//       </>
//     );
//   }
// }

// export default Home;

// import { useEffect, useState } from "react";
// import SongComponent from "../../component/song";

// const Home = () => {
//   const [songs, setSongs] = useState([]);
//   const [Keyword, setKeyword] = useState(null);

//   useEffect(() => {
//     getSongs();
//   }, []);

//   const getSongs = async () => {
//     const songs = await fetch(
//       `https://api.giphy.com/v1/gifs/search?q=${Keyword}&api_key=9V4YqJpwVJzOgdn8xbakWUECObdbD9Qx&limit=12`
//     )
//       .then((res) => res.json())
//       .then((res) => res.data);
//     setSongs(songs);
//   };
//   console.log("lagunya", songs);
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     getSongs();
//   };

//   return (
//     <>
//       <form style={{ marginBottom: "20px" }} onSubmit={handleSubmit}>
//         <input onChange={(e) => setKeyword(e.target.value)} type="text" />
//         <button>search</button>
//       </form>

//       {songs.map((data) => (
//         <SongComponent key={data.id}
//           images = { data.album.images[0].url }
//           title = { data.name }
//           artist = {data.artists.map((artist)=>(<span key={artist.id}>{artist.name}</span>))}
//         />
//       ))}
//     </>
//   )
// }

// export default Home;