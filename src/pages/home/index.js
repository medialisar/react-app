import SongComponent from "../../component/song";
import SongData from "../../data/datas";

const PlaylistPage = () => {    
    return (
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
                  

{SongData.map((data) => (
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
    );
};

export default PlaylistPage;

