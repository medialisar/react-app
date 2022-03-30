import { Component } from "react";
import SongComponent from "../../component/song";

class Home extends Component {
  state = { songs: [], keyword: "" };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { keyword } = this.state;
    const { accessToken } = this.props;
    console.log("ini", accessToken);
    const Authorization = `Bearer ${accessToken}`;
    const headers = { 'Content-Type': 'application/json', Authorization }
    const songs = await fetch(
      `https://api.spotify.com/v1/search?q=${keyword}&type=track`, { headers }
    )
      .then((res) => res.json())
      .then((result) => {
          this.setState({ songs: result.tracks.itemes });
      });
    console.log("lagu", songs);
  };

  handleInputChange = (e) => {
    this.setState({
      keyword: e.target.value
    });
  };

  render() {
    const { songs = [] } = this.state;

    return (
      <>
        <form style={{ marginBottom: "20px" }} onSubmit={this.handleSubmit}>
          <input onChange={this.handleInputChange} type="text" />
          <button>search</button>
        </form>
        {songs.map((data) => (
            <SongComponent key={data.id}
                images = { data.album.images[0].url }
                title = { data.name }
                artist = {data.artists.map((artist)=>(<span key={artist.id}>{artist.name}</span>))}
            />
        ))}
      </>
    );
  }
}

export default Home;
