import data from './data/data.js';

// Element definitions
const modal = document.getElementById('playlist-modal');
const modalContent = document.querySelector('.modal-content');

let playlists = data.playlists;
let playlistCardsContainer = document.getElementsByClassName("playlist-cards")[0];
let playlistSongsContainer = document.getElementsByClassName("playlist-songs")[0];
let modalContentContainer = document.getElementsByClassName("modal-content");
let modalDisplayContainer = document.getElementsByClassName("modal-display")[0];
console.log(playlistCardsContainer);

// Opening the modal on click
const openModal = (foundPlaylist) => {
    //console.log(clicked);
    //const = clickedCard(playlistCardsContainer)
    const closeButton = document.getElementById('close');
    // closeButton.textContent = 'X';
    closeButton.addEventListener('click', () => {
        modal.style.display = "none";
    });

    // const shuffleButton = document.getElementById('shuffle');
    // shuffleButton.addEventListener('click', () => {
    //     console.log("shuffle button clicked");
    // });

    console.log(foundPlaylist);
    populateModal(foundPlaylist);
    modal.style.display = "flex";
};

// PLAN
// create function to make html elements - done
// write the code to add event listener to the playlist cards
document.querySelectorAll(".playlist-card").forEach((playlistCard) => {
    playlistCard.addEventListener('click', (event) => {
        console.log("playlist card clicked");
        // if (playlistCard.event.target.id.includes("playlist-card")) {
        //     pl
        //     console.log(foundPlaylist);
        //     return foundPlaylist;
        // };
        // event.target.id playlist-card-0
        // extract 0 out of playlist-card-0
        event.target.id.split('-') // [playlist, card, 0]
        let foundPlaylistID = event.target.id.split('-')[2]
        // find the playlist object that matches the id
        foundPlaylist = data.playlists.find(playlist => playlist.playlistID == foundPlaylistID)
        console.log(foundPlaylist);
        openModal(foundPlaylist);
    });
});

window.addEventListener('click', (event) => {
    console.log(event.target);
    if (event.target === document.getElementById("playlist-modal")) {
        modalContentContainer.innerHTML = '';
        modal.style.display = "none";
    }
});
// in the callback of the event listener, look at event.target.id to match playlist-card
// in the callback function:
// - find playlist id
// - with the id, grab the playlist object that we want
// - pass the playlist object into populatemodal

// Function to populate the modal with intro information
function populateModal(clickedCard) {
    console.log(clickedCard);
    let clickedPlaylist = clickedCard.songs;
    // Clear existing song list items
    modalDisplayContainer.innerHTML = '';
    // Create HTML elements for displaying playlist information
    let createdPlaylistDisplay = document.createElement("div");
    createdPlaylistDisplay.innerHTML = createModalHeader(clickedCard);

    createdPlaylistDisplay.classList.add("playlist-display");
    // console.log(createdPlaylistHtml);
    modalDisplayContainer.appendChild(createdPlaylistDisplay);
    populatePlaylist(clickedPlaylist);
    //populatePlaylist(playlist);
}

// Populating the Page with Playlists
function populatePage(playlists) {
    // console.log(playlists);
    playlists.forEach((playlist, idx) => {
        let createdPlaylistHtml = document.createElement("div");
        createdPlaylistHtml.innerHTML = createPlaylistCardHtml(playlist);

        createdPlaylistHtml.classList.add("playlist-card");

        // Set a unique ID using idx and a prefix
        createdPlaylistHtml.id = `playlist-card-${idx}`;
        // createdPlaylistHtml.onclick = () => {
        //     // openModal(createdPlaylistHtml.id);
        //     openModal(playlist);
        // }

        // console.log(createdPlaylistHtml);
        playlistCardsContainer.appendChild(createdPlaylistHtml);
    });
};


// Populating the Playlist with Songs
function populatePlaylist(openedPlaylist) {
    console.log(openedPlaylist);
    playlistSongsContainer.innerHTML = '';
    let playlistSongs = openedPlaylist;
    // console.log(songs);
    // console.log(playlistSongs);

    if (!playlistSongsContainer) {
        console.error('Playlist songs container element is invalid or undefined');
        return;
    }

    playlistSongs.forEach((song) => {
        let createdSongHtml = document.createElement("div");
        createdSongHtml.innerHTML = createSongCardHtml(song);
        createdSongHtml.classList.add("song-card");

        // console.log(createdSongHtml);
        playlistSongsContainer.appendChild(createdSongHtml);
    });
}

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

// grab the parent of all the playlist cards
// create an event listener for each playlist card

function createSongCardHtml(song) {
    return `
            <img class="song-images" src=${song.cover_art} alt="Our Sixth Song">
            <div class="song-info orange-text">
                <p class="song-title orange-text">Title: ${song.title}</p>
                <p class="song-artist orange-text">Created By: ${song.artist}</p>
                <p class="song-album orange-text">Album: ${song.album}</p>
                <span><p class="song-duration orange-text">${song.duration}</p></span>
            </div>
            `;
}

function createModalHeader(foundPlaylist) {
    // Add a close button to the modal
    console.log(foundPlaylist);
    // const closeButton = document.createElement('button');
    // const closeButton = document.getElementById('close');
    // // closeButton.textContent = 'X';
    // closeButton.addEventListener('click', () => {
    //     modal.style.display = "none";
    // });

    return `
            <img class="modal-playlist-image" id="${foundPlaylist.playlistID}" src=${foundPlaylist.playlist_art} alt="Our Sixth Song">
            <div class="modal-playlist-info orange-text" my-data="${foundPlaylist.playlistID}">
                <p class="modal-playlist-title orange-text" my-data="${foundPlaylist.playlistID}">Album: ${foundPlaylist.playlist_name}</p>
                <p class="modal-playlist-artist orange-text" my-data="${foundPlaylist.playlistID}">Created By: ${foundPlaylist.playlist_creator}</p>
                <p class="like-count orange-text">Like Count: ${foundPlaylist.likeCount}</p>
            </div>
            `;
}


// Function calls
populatePage(playlists);

document.querySelectorAll(".playlist-card").forEach((playlistCard) => {
    console.log(playlistCard);
    playlistCard.addEventListener('click', (event) => {
        console.log("playlist card clicked");
        // if (playlistCard.event.target.id.includes("playlist-card")) {
        //     pl
        //     console.log(foundPlaylist);
        //     return foundPlaylist;
        // };
        // event.target.id playlist-card-0
        // extract 0 out of playlist-card-0
        // event.target.id.split('-') // [playlist, card, 0]
        // let foundPlaylistID = event.target.id.split('-')[2]
        console.log(event.target)
        let foundPlaylistID = event.target.getAttribute("my-data") // id of the playlist
        console.log("foundplaylistid", foundPlaylistID);
        // // find the playlist object that matches the id
        let foundPlaylist = data.playlists.find(playlist => playlist.playlistID == foundPlaylistID)
        // console.log(foundPlaylist);
        openModal(foundPlaylist);
    });
});
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

    // Shuffle the songs array inside the selected playlist object
    populatePlaylist( shufflePlaylist(selectedPlaylist));

    // Update the list of songs displayed in the modal to reflect the new order
});
