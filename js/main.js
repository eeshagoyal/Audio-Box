const artistURLbyName = "http://www.theaudiodb.com/api/v1/json/1/search.php?s=";
const albumURL = "http://www.theaudiodb.com/api/v1/json/1/album.php?i=";
const trackURL = "http://www.theaudiodb.com/api/v1/json/1/track.php?m=";

var SearchInput = document.getElementById("search-bar");
var submit = document.getElementById("search-button");


function ArtistPage(id) {
	console.log('Artist ID is : '+ id);
	location.href = "artist.html?"+id;
}


function renderList(obj) {
	return `
		<li class="result_item">
			<div class="result_item__image">
				<img src ="${obj.strArtistThumb}" height="100" width="100"/>  
			</div>

			<div class="result_item__content">
				<p class="text--medium">
					${obj.strArtist}
				</p>
				<p class="text--muted"> ${obj.strCountry}</p>
				<p class="text--muted"> ${obj.intFormedYear}</p>
				<p class="text--muted"> ${obj.strGenre}</p>
			</div>

			<div class="result_item__button">
				<button class="button" onclick="ArtistPage(${obj.idArtist});"> View Albums </button>
			</div>
		</li>
	`;
}


function loadcards(event) {
	document.getElementById("result-list").innerHTML = `
	<div class="loader"></div>
	`;
	console.log(SearchInput.value);


	// Cancel the default action, if needed
	event.preventDefault();

	var request = new XMLHttpRequest();
	request.open('GET', artistURLbyName + SearchInput.value, true); 
	//async=true
	
	
	//CONTENT TYPE - main errors !
	request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	request.setRequestHeader('Accept', 'application/json');

	request.send();

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
	}
	request.onerror = function () {
		console.log(request);
	}
}


SearchInput.addEventListener("keyup", function (event) {
	// Cancel the default action, if needed
	event.preventDefault();
	// Number 13 is the "Enter" key on the keyboard
	if (event.keyCode === 13) {
		// Trigger the button element with a click
		submit.click();
	}
});

submit.addEventListener("click", loadcards);



