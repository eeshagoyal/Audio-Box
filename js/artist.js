 window.onload=function(){
     $(function(){
         if(window.location.protocol==="https:")
             window.location.protocol="http";
     });
 }



const artistURLbyID = "http://www.theaudiodb.com/api/v1/json/1/artist.php?i=";
const albumURL = "http://www.theaudiodb.com/api/v1/json/1/album.php?i=";
const trackURL = "http://www.theaudiodb.com/api/v1/json/1/track.php?m=";
//-------------------------------------------------------------------------

 var url = window.location.href;
 var qparts = url.split("?")
 qparts = qparts[1].split("+");

 if(qparts.length > 1){
 	var ArtistID = qparts[0],
 		page_number = qparts[1],
 		pgno = page_number-1,
 		page_size =4,
 		i = pgno*page_size, 
 		j = (pgno+1)*page_size,
 		max_page_number;
 	console.log(pgno, ArtistID ,i,j);
 }
 else
 	console.log('ERROR : no artist ID found.');




loadArtistDetails();

loadAllAlbums();

//-------------------------------------------------------------------------



function callModalWindow(){
	// Get the modal
	var modal = document.getElementById('ModalWindow');

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks the button, open the modal 
	modal.style.display = "block";

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	    modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == modal) {
	        modal.style.display = "none";
	    }
	}
}

function renderTracks(data){
	return `
		<li class="Track"> 
			<p id = "trackname" class= "text--medium"> ${data.strTrack}
			<span id="duration" class="text--muted"> ${parseFloat(data.intDuration/60000).toFixed(2)} minutes </span>
			</p>	
		</li>
	`;

}

function loadTracksDetails(AlbumID, AlbumYear){
	console.log(AlbumID);

	var request = new XMLHttpRequest();
	request.open('GET', trackURL + AlbumID, true); 
	//async=true
/*
	//CORS
	request.withCredentials = true;
	request.responseType = "json";

	//CONTENT TYPE - Preflight Response
	request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	request.setRequestHeader('Accept', 'application/json');
*/

	request.send();

	request.onload = function () {

		var data = JSON.parse(request.responseText);
		console.log(data["track"][0].strTrack);

		document.getElementById("ModalWindow").innerHTML = `
			<div class="modal-content">
				<span class="close">&times;</span>
				
				<h1>${data["track"][0].strAlbum} <span class="text--muted">( ${AlbumYear} )</span> </h1>
				<h2>-------------------------------------------------------</h2>
				<ol class= "TrackList">
					${data["track"].map(renderTracks).join('')}
				</ol>
			</div>
		`;
		callModalWindow();
	}

	request.onerror = function () {
		console.log(request);
	}
}


function renderList(data) {
	return `
		<li class="result_item">
			<div class="result_item__image">
				<img src ="${data.strAlbumThumb}" height="100" width="100"/>  
			</div>

			<div class="result_item__content">
				<p class="text--medium"> ${data.strAlbum}		</p>
				<p class="text--muted">  ${data.intYearReleased} </p>
				<p class="text--muted">  ${data.strGenre}		</p>
			</div>
			
			<div class="result_item__button">	
				<button id="TracksButton" class="button" 
					onclick = "loadTracksDetails(${data.idAlbum},${data.intYearReleased});"> 
						View Tracks 	
				</button>	
			</div>
		</li>
	`;
}


function loadAllAlbums(event) {
	//loading 
	document.getElementById("result-list").innerHTML = `<div class="loader"></div>`;

	var request = new XMLHttpRequest();
	request.open('GET', albumURL + ArtistID, true); //async=true

/*
	//CORS
	request.withCredentials = true;
	request.responseType = "json";

	//CONTENT TYPE - Preflight Response
	request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	request.setRequestHeader('Accept', 'application/json');
*/
	request.send();

	request.onload = function () {
		var data = JSON.parse(request.responseText);
		console.log(data["album"][0].strAlbum);
		max_page_number = Math.ceil(data["album"].length/page_size);
		console.log(max_page_number);
		

		document.getElementById("result-list").innerHTML = `
					<table style="width:100%;"><tr>
						<td> <a href="artist.html?${ArtistID+`+${page_number>1? parseInt(page_number-1) : page_number}`}"><i class="fa fa-angle-left icon-3x" style="font-size: 80px;"></i></a></td>
						<td>
							<div id="nomore" class="text--center"></div>
							<ul id = "card" class="card">
								${data["album"].slice(`${i}`,`${j}`).map(renderList).join('')};
							</ul>
						</td>
						<td><a href="artist.html?${ArtistID+`+${page_number<max_page_number? parseInt(page_number)+1 : page_number}`}"><i class="fa fa-angle-right icon-3x" style="font-size:80px;"></i></a></td></tr>
					</table>
			`;

		if(page_number==max_page_number)
		{
			document.getElementById("nomore").innerHTML = `
				<p class="text--muted">No more results.</p>
				<p class="text--muted">-------${page_number} / ${max_page_number}-------</p>
			`;
		}
		else if(page_number < max_page_number)
		{
			document.getElementById("nomore").innerHTML = `
				<p class="text--muted">-------${page_number} / ${max_page_number}-------</p>
			`;
		}
		else
		{
			document.getElementById("nomore").innerHTML = `
				<p class="text--muted"> no result found ! go back to home page.</p>
			`;
		}


	}
	request.onerror = function () {
		console.log(request);
	}
}



function renderArtist(data){
	return `
		<div id="profile-wrap">
			<div class="profile-overlay"></div>
			<div class="profile-image" >
				<img src = "${data["artists"][0].strArtistThumb}" height="300" width="300"/>
			</div>
			<div class="profile-name">
				<h2> ${data["artists"][0].strArtist} 			</h2>
				<h4> Genre : ${data["artists"][0].strGenre}		</h4>
				<h4> Country : ${data["artists"][0].strCountry}	</h4>
				<h4> Year : ${data["artists"][0].intFormedYear}	</h4>
			</div>
			<div class="profile-social">
				<ul>
					<li>
						<a href="http://${data["artists"][0].strTwitter}" title="Twitter" target="_blank">
							<i class="fa fa-twitter"></i>
						</a>
					</li>
					<li>
						<a href="http://${data["artists"][0].strFacebook}" title="Facebook" target="_blank">
							<i class="fa fa-facebook"></i>
						</a>
					</li>
					<li>
						<a href="http://${data["artists"][0].strWebsite}" title="Website" target="_blank">
							<i class="fa fa-link"></i>
						</a>
					</li>
				</ul>
			</div>
		</div>
	`;
}


function loadArtistDetails(event){

	var request = new XMLHttpRequest();
	request.open('GET', artistURLbyID + ArtistID, true); 
	//async=true
/*
	//CORS
	request.withCredentials = true;
	request.responseType = "json";

	//CONTENT TYPE - Preflight Response
	request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	request.setRequestHeader('Accept', 'application/json');
*/
	request.send();

	request.onload = function () {

		var data = JSON.parse(request.responseText);
		console.log(data["artists"][0].strArtist);
		document.getElementById("artist_details").innerHTML = renderArtist(data);
	}
	request.onerror = function () {
		console.log(request);
	}
}

