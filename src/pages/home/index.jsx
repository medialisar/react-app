import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Songs from "../../components/song";
import formatParameter from "../../utils/formatParameter";
import ModalCreatePlaylist from "./modal-create-playlist";

const Home = () => {
  const accToken = useSelector((state) => state.spotify.accessToken);
  const [Albums, setAlbums] = useState([]);
  const [Keyword, setKeyword] = useState(null);
  const [SelectedTracks, setSelectedTracks] = useState([]);
  const [ShowCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [Success, setSuccess] = useState(null);
  const history = useHistory();
  const Search = async (e) => {
    e.preventDefault();
    const Authorization = `Bearer ${accToken}`;
    fetch(
      `https://api.spotify.com/v1/search?${formatParameter({
        q: Keyword,
        type: "track",
      })}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization,
        },
      }
    )
      .then((response) => response.json())
      .then((res) => {
        setAlbums(res.tracks.items);
      });
  };

  useEffect(() => {
    if (!accToken) history.push("/");
  }, [accToken, history]);

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-10 sm:px-0 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Home
        </h2>
        {Success && (
          <div className="px-4 py-2 rounded w-full text-black bg-green-500">
            {Success}
          </div>
        )}
        <form onSubmit={Search} className="my-4 flex gap-3">
          <input
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full border px-2 py-3"
            type="text"
          />
          <button className="bg-indigo-800 hover:bg-indigo-900 px-4 py-2 text-white rounded">
            Search
          </button>
        </form>
        <button
          disabled={SelectedTracks.length < 1}
          onClick={() => setShowCreatePlaylist(true)}
          className="bg-indigo-800 hover:bg-indigo-900 disabled:opacity-50 px-4 py-2 text-white rounded"
        >
          Buat Playlist
        </button>
        <ModalCreatePlaylist
          tracks={SelectedTracks}
          isOpen={ShowCreatePlaylist}
          setIsOpen={setShowCreatePlaylist}
          accessToken={accToken}
          setSuccess={setSuccess}
        />
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {Albums.map((data) => (
            <Songs
              tracks={SelectedTracks}
              setTracks={setSelectedTracks}
              key={data.id}
              data={data}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
