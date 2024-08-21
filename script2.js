async function Mymusic(inputdata) {
    let hello = inputdata || 'hindi song';

    const url = `https://shazam.p.rapidapi.com/search?term=${hello}&locale=en-US&offset=0&limit=5`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'ab7c50179dmsh2f52b7754163372p121ca8jsn0bbdf3356bf9',
            'x-rapidapi-host': 'shazam.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        let fivesong = result.tracks.hits;

        console.log(fivesong[0].track)

        // Clear previous song cards
        let songcard = document.getElementById('songcard');
        songcard.innerHTML = '';

        // Generate song UI for each song
        fivesong.forEach((song) => {
            SongUi(song);
        });

        // Play the first song
        // const audioElement = document.getElementById('audio-player');
        // audioElement.src = fivesong[0].track.hub.actions[1].uri;
        // audioElement.play();
        // song play on sonui function 
        
    } catch (error) {
        console.error(error);
    }
}

function SongUi(song) {
   
    let playersong = document.querySelector('.playersong');
    let songcard = document.getElementById('songcard');
    songcard.style.display = 'flex'
    songcard.style.flexWrap = 'wrap'
    songcard.style.justifyContent = 'center'
    songcard.style.padding = '10px 20px'

    let card = document.createElement('div');
    card.classList.add('card');
    

    let songname = document.createElement('h2');
    let singarname = document.createElement('h4');
    let songimage = document.createElement('img');
    let palybtn = document.createElement('button')
    songimage.classList.add("songimage");
    songname.classList.add('songname');
    palybtn.classList.add('palybtn')
    palybtn.textContent = 'PLAY'
    palybtn.style.border = 'none'
    palybtn.style.backgroundColor = 'orangered'
    palybtn.style.color = 'white'
    palybtn.style.padding = '7px 10px'
    palybtn.style.margin = '10px 0px'
    palybtn.style.textAlign = 'end'


    songimage.style.width = '100%';
    songname.style.padding = '10px 0px';
    
    songcard.appendChild(card);
    card.appendChild(songimage);
    card.appendChild(songname);   
    card.appendChild(singarname);
    card.appendChild(palybtn);

    songname.textContent = song.track.title;
    singarname.textContent = song.track.subtitle;
    songimage.src = song.track.images.coverart;
    // songimage.src = song.track.images.background;
    songimage.alt = 'song poster';
    palybtn.onclick = function playSong(){
        let playimg = document.getElementById('playimg')
        // alert(song.track.title + ' clicked');
        const audioElement = document.getElementById('audio-player');
        audioElement.src = song.track.hub.actions[1].uri;
        audioElement.play();
        playersong.textContent = 'Now Playing : ' + song.track.title + ' BY : ' + song.track.subtitle;
        playimg.src = song.track.images.background   
        let playimgdiv = document.getElementById('playimgdiv');   
        playimgdiv.style.display = 'inline-block'
        playimgdiv.style.bottom = '50px' 
        let playcenterimg = document.getElementById('playcenterimg')
        playcenterimg.src = song.track.images.coverarthq;

    }
}

function inputFunction(){
    let searchinglist = document.querySelector('.searchinglist')
    var inputdata = this.value;
    searchinglist.textContent = ' Your Searching is: ' + inputdata
    Mymusic(inputdata);
};

document.getElementById('songsearch').addEventListener('focusout' ||'keydown', function(){
    let searchinglist = document.querySelector('.searchinglist')
    var inputdata = this.value;
    searchinglist.textContent = ' Your Searching is: ' + inputdata
    Mymusic(inputdata);
})

// document.getElementById('searchsong').addEventListener('click',  function(){
//     let searchinglist = document.querySelector('.searchinglist')
//     var inputdata = this.value;
//     searchinglist.textContent = ' Your Searching is: ' + inputdata
//     Mymusic(inputdata);
// });

let dropbtn = document.getElementById('dropbtn')
let playimgdiv = document.getElementById('playimgdiv');

dropbtn.addEventListener('click', function(){
    playimgdiv.style.bottom = '-400px'

})





// Initial call
Mymusic();
