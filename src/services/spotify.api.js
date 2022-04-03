export const searchSongs = async (searchValue) => {
  const token = window.localStorage.getItem('token');
  const Authorization = `Bearer ${token}`;
  const songs = await fetch(
    `https://api.spotify.com/v1/search?limit=50&q=track:${searchValue}&type=track`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization
      }
    }
  ).then((res) => res.json());
  console.log('songs', songs);
  return songs.tracks.items;
};

export const getPlaylist = async () => {
  const token = window.localStorage.getItem('token');
  const Authorization = `Bearer ${token}`;
  const playlists = await fetch(`https://api.spotify.com/v1/me/playlists?limit=50`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization
    }
  }).then((res) => res.json());
  console.log('playlist', playlists);
  return playlists.items;
};

export const getPlaylistSong = async (playlistId) => {
  const token = window.localStorage.getItem('token');
  const Authorization = `Bearer ${token}`;
  const playlists = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization
    }
  }).then((res) => res.json());
  console.log('playlist', playlists);
  return playlists.items;
};

export const addToPlaylist = async (playlistId, trackUri) => {
  const token = window.localStorage.getItem('token');
  const Authorization = `Bearer ${token}`;

  const tracks = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization
    }
  }).then((res) => res.json());
  const trackIsAvalailable = tracks.items.some((item) => item.track.uri === trackUri);

  if (trackIsAvalailable) {
    alert('Lagu tersebut sudah ada di dalam playlist ini.');
    return;
  }

  const playlists = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    method: 'POST',
    body: JSON.stringify({
      position: 0,
      uris: [trackUri]
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization
    }
  }).then((res) => res.json());
  console.log('playlist', playlists);
  return playlists;
};
