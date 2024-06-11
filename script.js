import data from './data/data.js';

// Element definitions
const modal = document.getElementById('playlist-modal');
const modalContent = document.querySelector('.modal-content');

let playlists = data.playlists;
let playlistCardsContainer = document.getElementsByClassName("playlist-cards")[0];
let playlistSongsContainer = document.getElementsByClassName("playlist-songs")[0];
let modalContentContainer = document.getElementsByClassName("modal-content");
let modalDisplayContainer = document.getElementsByClassName("modal-display")[0];

populatePage(playlists);
// PLAN
// create function to make html elements - done
// write the code to add event listener to the playlist cards
document.querySelectorAll(".playlist-card").forEach((playlistCard) => {
    playlistCard.addEventListener('click', (event) => {
        console.log("playlist card clicked");

        event.target.id.split('-') // [playlist, card, 0]
        let foundPlaylistID = event.currentTarget.id.split('-')[2]
        // find the playlist object that matches the id
        let foundPlaylist = data.playlists.find(playlist => playlist.playlistID == foundPlaylistID)
        console.log(foundPlaylist);
        let playlistSongs = foundPlaylist.songs;
        console.log(playlistSongs);

        addCloseButtonListener();
        modalDisplayContainer.innerHTML = '';
        playlistSongsContainer.innerHTML = '';

        const playlistDisplayHeader = createPlaylistDisplayHeader(foundPlaylist);
        modalDisplayContainer.appendChild(playlistDisplayHeader);
        playlistSongs.forEach((song) => {
            appendSongCardToPlaylistSongsContainer(song);
        })
        modal.style.display = "flex";
    });
});

window.addEventListener('click', (event) => {
    console.log(event.target);
    if (event.target === document.getElementById("playlist-modal")) {
        modalContentContainer.innerHTML = '';
        modal.style.display = "none";
    }
});

// Populating the Page with Playlists
function populatePage(playlists) {
    // console.log(playlists);
    playlists.forEach((playlist, idx) => {
        let createdPlaylistHtml = document.createElement("div");
        createdPlaylistHtml.innerHTML = createPlaylistCardHtml(playlist);

        createdPlaylistHtml.classList.add("playlist-card");

        // Set a unique ID using idx and a prefix
        createdPlaylistHtml.id = `playlist-card-${idx}`;

        playlistCardsContainer.appendChild(createdPlaylistHtml);
    });
};

function createPlaylistCardHtml(playlist) {
    return `
            <img class="playlist-images" src=${playlist.playlist_art} alt="Our Sixth Song" my-data="${playlist.playlistID}">
            <div class="playlist-info orange-text">
                <p class="playlist-title orange-text">Album: ${playlist.playlist_name}</p>
                <p class="playlist-artist orange-text">Created By: ${playlist.playlist_creator}</p>
                <span><p class="like-button">&hearts;</p></span>
                <span><p class="like-count orange-text">${playlist.likeCount}</p></span>
            </div>
            `;
};

// Like Btn
// grab all the cards and put them in a variable
// const likeBtns = document.querySelectorAll(".like-button");
//
// Add event listener to like button
document.querySelectorAll(".like-button").forEach((likeButton) => {
    likeButton.addEventListener("click", (event) => {
        console.log("like button clicked");
      // Get the playlist object associated with the clicked like button
      let playlistCard = event.target.closest(".playlist-card");
      console.log(playlistCard);
      let foundPlaylistID = playlistCard.id.split("-")[2];
      console.log("foundplaylistid", foundPlaylistID);
      let foundPlaylistLikeBtn = data.playlists[foundPlaylistID].likeCount;
      console.log(foundPlaylistLikeBtn);

      // Increment like count and update UI
      foundPlaylistLikeBtn++;
      const likeCountElement = playlistCard.querySelector(".like-count");
      likeCountElement.textContent = foundPlaylistLikeBtn;
    });
  });


// Function to shuffle a playlist
function shufflePlaylist(playlist) {
    const shuffledPlaylist = playlist.slice();
    for (let i = shuffledPlaylist.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPlaylist[i], shuffledPlaylist[j]] = [shuffledPlaylist[j], shuffledPlaylist[i]];
    }
    console.log(shuffledPlaylist);
    return shuffledPlaylist;
  }

// Add event listener to shuffle button on modal
const shuffleButton = document.getElementById("shuffle-button");
shuffleButton.addEventListener("click", () => {
    // Find the playlist object associated with the currently open modal
    let playlistCard = modalDisplayContainer.firstElementChild.firstElementChild.id;
    console.log(playlistCard);

    const selectedPlaylist = data.playlists[playlistCard].songs;
    console.log(selectedPlaylist);

    let shuffledPlaylistSongs = shufflePlaylist(selectedPlaylist);
    playlistSongsContainer.innerHTML = '';
    shuffledPlaylistSongs.forEach((song) => {
        appendSongCardToPlaylistSongsContainer(song);
    });
});

const addCloseButtonListener = () => {
    const closeButton = document.getElementById('close');
    closeButton.addEventListener('click', () => {
        modal.style.display = "none";
    });
}

const createPlaylistDisplayHeader = (foundPlaylist) => {
    let createdPlaylistDisplay = document.createElement("div");
    createdPlaylistDisplay.classList.add("playlist-display");
    let playlistHeaderHtml = `
    <img class="modal-playlist-image" id="${foundPlaylist.playlistID}" src=${foundPlaylist.playlist_art} alt="Our Sixth Song">
    <div class="modal-playlist-info orange-text" my-data="${foundPlaylist.playlistID}">
        <p class="modal-playlist-title orange-text" my-data="${foundPlaylist.playlistID}">Album: ${foundPlaylist.playlist_name}</p>
        <p class="modal-playlist-artist orange-text" my-data="${foundPlaylist.playlistID}">Created By: ${foundPlaylist.playlist_creator}</p>
        <p class="like-count orange-text">Like Count: ${foundPlaylist.likeCount}</p>
    </div>
    `;
    createdPlaylistDisplay.innerHTML = playlistHeaderHtml;
    return createdPlaylistDisplay;
}

const appendSongCardToPlaylistSongsContainer = (song) => {
    let createdSongCardDisplay = document.createElement("div");
    createdSongCardDisplay.classList.add("song-card");
    let createdSongCardHtml = `
            <img class="song-images" src=${song.cover_art} alt="Our Sixth Song">
            <div class="song-info orange-text">
                <p class="song-title orange-text">Title: ${song.title}</p>
                <p class="song-artist orange-text">Created By: ${song.artist}</p>
                <p class="song-album orange-text">Album: ${song.album}</p>
                <span><p class="song-duration orange-text">${song.duration}</p></span>
            </div>
            `;
    createdSongCardDisplay.innerHTML = createdSongCardHtml;
    playlistSongsContainer.appendChild(createdSongCardDisplay);
}
