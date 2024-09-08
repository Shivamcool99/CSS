// Write your javascript here

tracks = [
    {
      name: "Let me down slowly",
      artist: "Alec Benjamin",
      cover: "images/letmedown.jpg",
      source: "audio/let me down slowly.mp3",
    },
    {
      name: "Let me love you",
      artist: "DJ Snake/Justin Beiber",
      cover: "images/letmelove.jpg",
      source: "audio/let me love you.mp3",
    },
    {
      name: "Perfect",
      artist: "Ed Sheeran",
      cover: "images/perfect.jpg",
      source: "audio/perfect.mp3",
    },
  ];
  let track_name = document.querySelector(".audio-title");
  let track_artist = document.querySelector(".audio-singer");
  let track_art = document.querySelector(".img");
  
  let playpause_btn = document.querySelector(".play");
  let next_btn = document.querySelector(".skip-forward");
  let prev_btn = document.querySelector(".skip-back");
  
  let seek_slider = document.querySelector(".seek_slider");
  let curr_time = document.querySelector(".current-time");
  let total_duration = document.querySelector(".duration");
  
  let track_index = 0;
  let isPlaying = false;
  let updateTimer;
  
  function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
  }
  
  let curr_track = document.createElement("audio");
  function loadTrack(track_index) {
    clearInterval(updateTimer);
    resetValues();
    curr_track.src = tracks[track_index].source;
    curr_track.load();
    track_name.textContent = tracks[track_index].name;
    track_artist.textContent = tracks[track_index].artist;
    track_art.src = tracks[track_index].cover;
    updateTimer = setInterval(seekUpdate, 1000);
    curr_track.addEventListener("ended", nextTrack);
  }
  
  function playTrack() {
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class= "fa fa-pause-circle fa-5x"></i>';
  }
  function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class= "fa fa-play-circle fa-5x"></i>';
  }
  function playpauseTrack() {
    if (!isPlaying) playTrack();
    else pauseTrack();
  }
  
  function nextTrack() {
    if (track_index < tracks.length - 1) {
      track_index += 1;
    } else track_index = 0;
    loadTrack(track_index);
    playTrack();
  }
  
  function prevTrack() {
    if (track_index > 0) {
      track_index -= 1;
    } else track_index = tracks.length - 1;
    loadTrack(track_index);
    playTrack();
  }
  
  function seekTo() {
    let seekto = curr_track.duration * (seek_slider.value / 100);
  
    curr_track.currentTime = seekto;
  }
  
  function seekUpdate() {
    let seekPosition = 0;
  
    if (!isNaN(curr_track.duration)) {
      seekPosition = curr_track.currentTime * (100 / curr_track.duration);
      seek_slider.value = seekPosition;
  
      // Calculate the time left and the total duration
      let currentMinutes = Math.floor(curr_track.currentTime / 60);
      let currentSeconds = Math.floor(
        curr_track.currentTime - currentMinutes * 60
      );
      let durationMinutes = Math.floor(curr_track.duration / 60);
      let durationSeconds = Math.floor(
        curr_track.duration - durationMinutes * 60
      );
  
      // Add a zero to the single digit time values
      if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
      }
      if (durationSeconds < 10) {
        durationSeconds = "0" + durationSeconds;
      }
      if (currentMinutes < 10) {
        currentMinutes = "0" + currentMinutes;
      }
      if (durationMinutes < 10) {
        durationMinutes = "0" + durationMinutes;
      }
  
      // Display the updated duration
      curr_time.textContent = currentMinutes + ":" + currentSeconds;
      total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
  }
  
  loadTrack(track_index);