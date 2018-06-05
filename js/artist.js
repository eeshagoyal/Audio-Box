const artistURL = "http://www.theaudiodb.com/api/v1/json/1/search.php?s=";
const albumUrl = "http://www.theaudiodb.com/api/v1/json/1/album.php?i=";
const trackUrl = "http://www.theaudiodb.com/api/v1/json/1/track.php?m=";

var SearchInput = document.getElementById("search-bar");
var submit = document.getElementById("search-button");
/*

function ArtistPage(){
	console.log('in artist fn');
	location.href = "artist.html";
}


function renderList(obj){
	return `
		<li class="result_item">
			<div class="result_item__image">
				<img src ="${obj.strArtistThumb}" height="100" width="100"/>  
			</div>

			<div class="result_item__content">
				<p class="text--medium">
					${obj.strArtist}
				</p>
				<p class="text--muted"> ${obj.intFormedYear}</p>
				<p class="text--muted"> ${obj.strGenre}</p>
			</div>

			<div id="ViewAlbums" class="result_item__button">
				<button class="button"> View Albums </button>
			</div>
		</li>
	`;
}


function loadcards(){

	console.log(SearchInput.value);

	var request = new XMLHttpRequest();
	//
	request.open('GET',artistURL + SearchInput.value );

	request.onload = function () {
		var data = JSON.parse(request.responseText);
		console.log(data["artists"][0].strArtist);

		document.getElementById("result-list").innerHTML = `
			<ul class="card">
				${data["artists"].map(renderList).join('')}
			</ul>

			<div class="text--center">
			  <p class="text--muted">No more results.</p>
			</div>	
			`;
		
		ViewAlbums.addEventListener("click",ArtistPage,false);

	}
	request.send();
}


SearchInput.addEventListener("keyup", function(event){
	// Cancel the default action, if needed
  	event.preventDefault();
  	// Number 13 is the "Enter" key on the keyboard
  	if (event.keyCode === 13) {
    // Trigger the button element with a click
    	submit.click();
	}
},false);

submit.addEventListener("click", loadcards,false);

*/

