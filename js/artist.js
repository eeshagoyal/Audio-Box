const artistURL = "http://www.theaudiodb.com/api/v1/json/1/search.php?s=";
const albumURL = "http://www.theaudiodb.com/api/v1/json/1/album.php?i=";
const trackURL = "http://www.theaudiodb.com/api/v1/json/1/track.php?m=";

 var url = window.location.href;
 var qparts = url.split("?");

 if(qparts.length > 0 ){
 	ArtistID = qparts[1];
 	console.log(ArtistID);
 }
 else
 	console.log('ERROR : no artist ID found.');

loadcards(ArtistID);


function Tracks(AlbumID){
	console.log(AlbumID);
}

function renderList(obj) {
	return `
		<li class="result_item">
			<div class="result_item__image">
				<img src ="${obj.strAlbumThumb}" height="100" width="100"/>  
			</div>

			<div class="result_item__content">
				<p class="text--medium">
					${obj.strAlbum}
				</p>
				<p class="text--muted"> ${obj.intYearReleased}</p>
				<p class="text--muted"> ${obj.strGenre}</p>
			</div>

			<div class="result_item__button">
				<button class="button" onclick="Tracks(${obj.idAlbum});"> View Tracks </button>
			</div>
		</li>
	`;
}


function loadcards(event) {

	var request = new XMLHttpRequest();
	request.open('GET', albumURL + ArtistID, true); 
	//async=true
	
	
	//CONTENT TYPE - main errors !
	request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	request.setRequestHeader('Accept', 'application/json');

	request.send();

	request.onload = function () {

		var data = JSON.parse(request.responseText);
		console.log(data["album"][0].strAlbum);

		document.getElementById("result-list").innerHTML = `
					<ul class="card">
						${data["album"].map(renderList).join('')}
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

