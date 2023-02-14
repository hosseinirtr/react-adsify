import React, { useEffect, useRef, useState } from "react";

const Discover = () => {
  const [files, setFiles] = useState([]);
  const [musicFiles, setMusicFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const musicExtensions = [".mp3", ".flac", ".m4a"];
  const videoExtensions = [".mp4", ".mkv", ".avi"];
  const [currentPlayName, setCurrentPlayName] = useState();

  const handleFileSelect = (event) => {
    const newFiles = Array.from(event.target.files);
    console.log("newFiles", newFiles);

    setFiles([...files, ...newFiles]);

    setMusicFiles([
      ...musicFiles,
      ...newFiles.filter((file) => {
        return (
          !musicFiles.find((existingFile) => existingFile.name === file.name) &&
          musicExtensions.includes(file.name.substr(-4).toLowerCase())
        );
      }),
    ]);

    console.log(
      "files",
      newFiles.filter((file) => {
        return (
          !musicFiles.find((existingFile) => existingFile.name === file.name) &&
          musicExtensions.includes(file.name.substr(-4).toLowerCase())
        );
      })
    );

    setVideoFiles([
      ...videoFiles,
      ...newFiles.filter((file) => {
        return (
          !videoFiles.find((existingFile) => existingFile.name === file.name) &&
          videoExtensions.includes(file.name.substr(-4).toLowerCase())
        );
      }),
    ]);
  };

  const handleChoose = (file) => {
    setCurrentPlayName(fixName(file?.name));
    handlePause();
    audioRef.current.src = URL.createObjectURL(file);
    handlePlay();
  };
  if (audioRef?.current?.src) {
    console.log(audioRef, audioRef?.current?.src);
  }
  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };
  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  useEffect(() => {
    if (musicFiles.length > 0 && !audioRef) {
      audioRef.current.src = URL.createObjectURL(musicFiles[0]);
    }
  }, [musicFiles]);

  const fixName = (name) => {
    return name
      .replace(
        new RegExp([...musicExtensions, "320", "(1)", "(", ")"].join("|"), "g"),
        ""
      )
      .replace(/[-_]/g, " ");
  };
  return (
    <>
      <div className="banner">
        <div>{`//`} TRENDING</div>
        <div className="quote">
          I can’t fall back, I came too far. Hold myself up, and love my scars.
        </div>
        <div className="quote-user"> - Linkin Park</div>
      </div>
      <div className="user-song">
        <br />
        <div className="file-input">
          <input
            type="file"
            webkitdirectory="true"
            directory="true"
            multiple={true}
            onChange={handleFileSelect}
            className="file custom-file-input"
            id="file"
          />
          <label for="file">
            Select file
            <p className="file-name"></p>
          </label>
        </div>
        <h2>Music Files:</h2>
        <ul>
          {musicFiles.map((file) => (
            <li className="song-list" key={file.name}>
              <button onClick={() => handleChoose(file)} className="song-item">
                {fixName(file.name)}
              </button>
            </li>
          ))}
        </ul>
        <h2>Video Files:</h2>
        <ul>
          {videoFiles.map((file) => (
            <li key={file.name}>{file.name}</li>
          ))}
        </ul>
      </div>
      {musicFiles.length > 0 && <audio ref={audioRef} />}
      {musicFiles.length > 0 && (
        <div>
          <p>Now playing: {currentPlayName}</p>
          <button onClick={isPlaying ? handlePause : handlePlay}>
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>
      )}
    </>
  );
};

export default Discover;
