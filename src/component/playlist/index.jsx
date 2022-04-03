const PlaylistItem = ({images, name, totalSong, onPress, onPressContainer}) => {
  return (
    <div
      style={{
        cursor: onPressContainer && 'pointer'
      }}
      onMouseDown={onPressContainer}
      className="list">
      <div className="list-img">
        <img id="song-image" src={images} alt="coverImage" />
      </div>
      <div className="list-detail">
        <p className="playlist-title">{name}</p>
        <p className="playlist-count">Total Lagu: {totalSong}</p>
        {onPress && <button onClick={onPress}>Masukan Ke Playlist Ini</button>}
      </div>
    </div>
  );
};

export default PlaylistItem;
