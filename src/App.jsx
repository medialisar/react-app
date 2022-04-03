import {useEffect, useState} from 'react';
import SongComponent from './component/song';
import './style.css';
import './responsive.css';
import {addToPlaylist, getPlaylist, getPlaylistSong, searchSongs} from './services/spotify.api';
import PlaylistItem from './component/playlist';
import ReactModal from 'react-modal';

function App() {
  const CLIENT_ID = 'ee416f8946944eac93de1274207f1dad';
  const REDIRECT_URI = 'http://localhost:3000';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';
  const SCOPE = 'playlist-modify-public playlist-modify-private';

  const [token, setToken] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalSong, setShowModalSong] = useState(false);
  const [showModalSearch, setShowModalSearch] = useState(false);
  const [selectedSongId, setSelectedSongId] = useState('');

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem('token');

    if (!token && hash) {
      token = hash
        .substring(1)
        .split('&')
        .find((elem) => elem.startsWith('access_token'))
        .split('=')[1];

      window.location.hash = '';
      window.localStorage.setItem('token', token);
    }

    setToken(token);
    getPlaylists();
  }, []);

  const logout = () => {
    setToken('');
    window.localStorage.removeItem('token');
  };

  const doSearchSong = async (searchValue) => {
    setShowModalSearch(true);
    const songs = await searchSongs(searchValue);

    setSongs(songs);
  };

  const doAddPlaylist = async (playlistId, trackUri) => {
    const addPlaylist = await addToPlaylist(playlistId, trackUri);

    if (addPlaylist.error) {
      alert('Terjadi Kesalahan, Cek log');
      return;
    }

    setShowModal(false);
    alert('Berhasil Menambahkan Lagu ke dalam Playlist');
    getPlaylists();
  };

  const getPlaylists = async () => {
    const playlists = await getPlaylist();

    if (playlists.error) {
      console.log('error', playlists.error);
      window.localStorage.removeItem('token');
      setToken('');
      return;
    }

    setPlaylists(playlists);
  };

  const getTracksFromPlaylist = async (playlistId) => {
    setPlaylistSongs([]);
    const playlists = await getPlaylistSong(playlistId);

    if (playlists.error) {
      console.log('error', playlists.error);
      window.localStorage.removeItem('token');
      setToken('');
      return;
    }

    setPlaylistSongs(playlists);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify React</h1>
        {!token ? (
          <a
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>
            Login to Spotify
          </a>
        ) : (
          <button onClick={logout}>Logout</button>
        )}

        {token ? (
          <div className="form-input">
            <input type="text" onChange={(e) => setSearchValue(e.target.value)} />
            <button onClick={() => doSearchSong(searchValue)}>Search</button>
          </div>
        ) : (
          <h2>Please login</h2>
        )}

        {token && (
          <div id="container">
            <div className="main">
              <div className="playlist">
                <div className="playlist-title">
                  <h3>Playlist</h3>
                </div>
                <div id="playlist-body">
                  {playlists.map((data) => (
                    <PlaylistItem
                      onPressContainer={() => {
                        setShowModalSong(true);
                        getTracksFromPlaylist(data.id);
                      }}
                      key={data.id}
                      images={data.images[0]?.url}
                      name={data.name}
                      totalSong={data.tracks.total}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      <ReactModal isOpen={showModalSearch} onRequestClose={() => setShowModalSearch(false)}>
        <div className="modal-title-container">
          <h3 className="playlist-title">Pencarian Lagu</h3>
          <button onClick={() => setShowModalSearch(false)}>Tutup</button>
        </div>
        <div id="playlist-body">
          {songs.map((data) => (
            <SongComponent
              key={data.id}
              images={data.album.images[0].url}
              title={data.name}
              onPressAdd={() => {
                setShowModal(true);
                setSelectedSongId(data.uri);
              }}
              artist={data.artists.map((artist) => (
                <span key={artist.id}>{artist.name}</span>
              ))}
            />
          ))}
        </div>
      </ReactModal>

      <ReactModal isOpen={showModal} onRequestClose={() => setShowModal(false)}>
        <div className="modal-title-container">
          <h3 className="playlist-title">Lagu Dalam Playlist</h3>
          <button onClick={() => setShowModal(false)}>Tutup</button>
        </div>
        <div id="playlist-body">
          {playlists.map((data) => (
            <PlaylistItem
              key={data.id}
              images={data.images[0]?.url}
              name={data.name}
              totalSong={data.tracks.total}
              onPress={() => doAddPlaylist(data.id, selectedSongId)}
            />
          ))}
        </div>
      </ReactModal>

      <ReactModal isOpen={showModalSong} onRequestClose={() => setShowModalSong(false)}>
        <div className="modal-title-container">
          <h3 className="playlist-title">Lagu Dalam Playlist</h3>
          <button onClick={() => setShowModalSong(false)}>Tutup</button>
        </div>
        <div id="playlist-body">
          {playlistSongs.map((data) => (
            <SongComponent
              disableAdd
              key={data.track.id}
              images={data.track.album.images[0].url}
              title={data.track.name}
              artist={data.track.artists.map((artist) => (
                <span key={artist.id}>{artist.name}</span>
              ))}
            />
          ))}
        </div>
      </ReactModal>
    </div>
  );
}

export default App;
