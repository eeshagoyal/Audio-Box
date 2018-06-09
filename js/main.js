 window.onload=function(){
     $(function(){
         if(window.location.protocol==="https:")
             window.location.protocol="http";
     });
 }



const artistURLbyName = "http://www.theaudiodb.com/api/v1/json/1/search.php?s=";
const albumURL = "http://www.theaudiodb.com/api/v1/json/1/album.php?i=";
const trackURL = "http://www.theaudiodb.com/api/v1/json/1/track.php?m=";

var SearchInput = document.getElementById("search-bar");
var submit = document.getElementById("search-button");


 var url = window.location.href;
 var qparts = url.split("?")

var page_number; 
 if(qparts.length > 1 ){
 	page_number = qparts[1];
 }
 else if(qparts.length ==1 || qparts[2]=="#"){
 	page_number = 1;

 }
 	
var  	page_size =4,
		pgno = page_number-1,
 		i = pgno*page_size, 
 		j = (pgno+1)*page_size,
 		max_page_number;

console.log(page_number, page_size, i, j)

//-------------------------------------------------------------------------

function ArtistPage(id) {
	console.log('Artist ID is : '+ id);
	location.href = "artist.html?"+id+"+1";
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
	var api_url = artistURLbyName + SearchInput.value;

	// Cancel the default action, if needed
	event.preventDefault();

	var request = new XMLHttpRequest();
	request.open('GET',api_url , true); //async=true

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
		console.log(data);

		if ( data["artists"] != null)	
		{	
			console.log(data["artists"][0].strArtist);

			max_page_number = Math.ceil(data["artists"].length/page_size);


			document.getElementById("result-list").innerHTML = `
						<table style="width:100%;">
						<tr>
							<td>
								<a href=" ${page_number>1 ? `index.html?${parseInt(page_number-1)}` : `#`}">
									<i class="fa fa-angle-left icon-3x" style="font-size: 80px;"></i>
								</a>
							</td>
							<td>
								<div id="nomore" class="text--center"></div>
								<ul id = "card" class="card">
									${data["artists"].slice(`${i}`,`${j}`).map(renderList).join('')}
								</ul>
							</td>
							<td>
								<a href= " ${page_number<max_page_number ? `index.html?${parseInt(page_number)+1}` : `#`}">
									<i class="fa fa-angle-right icon-3x" style="font-size:80px;"></i>
								</a>
							</td>
						</tr>
						</table>
			
						<div class="text--center">
						  <p class="text--muted">No more results.</p>
						</div>	
					`;

			if(page_number==max_page_number)
			{
				document.getElementById("nomore").innerHTML = `
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
		else
		{
			document.getElementById("result-list").innerHTML = ``;
			window.alert("Artist not found. Please try searching for another music artist.");
		}
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



