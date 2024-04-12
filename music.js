// Spotify API credentials (read from environment variables)
const clientId = "f3a744fe28b847e29b1fd58077aabba5";
const clientSecret = "1465918d221d4f5d9d7fc0c8dbd1f237";
let accessToken = null;

// Get access token
async function getAccessToken() {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  });
  const data = await response.json();
  accessToken = data.access_token;
}

// Get playlist tracks
async function getPlaylistTracks(playlistId) {
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }
  );
  const data = await response.json();
  return data.items;
}

// Play tracks continuously
async function playContinuousMusic(playlistId) {
  await getAccessToken();
  const tracks = await getPlaylistTracks(playlistId);
  let currentTrackIndex = 0;

  function playNextTrack() {
    const audio = new Audio(tracks[currentTrackIndex].track.preview_url);
    audio.play();
    audio.addEventListener("ended", () => {
      currentTrackIndex = (currentTrackIndex + 1) % tracks.length; // Loop back to the beginning
      playNextTrack();
    });
  }

  playNextTrack();
}

// Start continuous playback
playContinuousMusic("37i9dQZF1DX9RwfGbeGQwP");
