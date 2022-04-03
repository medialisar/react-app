const renderButtonComponent = (isAddedToPlaylist = false, onPressAdd, onPressRemove) => {
  if (isAddedToPlaylist) {
    return (
      <button type="button" onClick={onPressRemove} className="custom-btn btn-2">
        Remove From Playlist
      </button>
    );
  }

  return (
    <button type="button" onClick={onPressAdd} value="Add To Playlist" className="custom-btn btn-2">
      Add To Playlist
    </button>
  );
};

const SongComponent = ({
  images,
  title,
  artist,
  isAddedToPlaylist,
  onPressAdd,
  onPressRemove,
  disableAdd
}) => {
  return (
    <div className="list">
      <div className="list-img">
        <img id="song-image" src={images} alt="coverImage" />
      </div>
      <div className="list-detail">
        <p className="song-title">{title}</p>
        <p className="song-artist">{artist}</p>
        {!disableAdd && renderButtonComponent(isAddedToPlaylist, onPressAdd, onPressRemove)}
      </div>
    </div>
  );
};

export default SongComponent;
