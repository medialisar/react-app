import datas from "./datas";

const Home = () => {
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
              <div class="list">
                <div class="list-img">
                  <img
                    id="song-image"
                    src={datas.album.images[0].url}
                    alt="Image"
                  />
                </div>
                <div class="list-detail">
                  <p class="song-title">{datas.album.name}</p>
                  <p class="song-artist">{datas.artists.map((data)=>(
                    <span key={data.id}>{data.name}</span>
                ))}</p>
                  <input type="button" value="Select" class="custom-btn btn-2" />
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
    );
};

export default Home;