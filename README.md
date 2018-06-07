# PrimaSeller-JS-test

Problem Statement :-

	We will build a small and simple artist search APP using the audiodb APIs http://www.theaudiodb.comforumviewtopic.php?f=6&t=7). 
	You can use the test API KEY “1” for testing.
	
	The app has three screen:
	
	1) The first screen is a search page where you can search for an artist by name.
	There could be multiple artists that match the name, so make sure that you handle pagination where the user can see the results page by page.

	2) Once you have found the artist you were searching for, click on the “View Albums” link will take you to an artist detail page where you will list (again, paginated) the albums of the artist.

	3) Clicking on the View Tracks of an album listing will open up a modal that shows the album name, the release date and a list of tracks in the album and the durationof each track.

Evaluation Criteria :-

	Your submission will be evaluated on your code – structure, organization and modularity, how closely it meets the requirements we have described above, error handling, visual layout. We encourage you to try and make the APP responsive so that it displays well on a mobile browser.


## Documentation :
Page 1 : 

	Page 1 consists of a search bar that can be used to search for any artist.
		To submit a search the user can either press the enter key or click on the search icon.
	The search results are loaded dynamically using template literals in the JS code. 
		The results are showed in a paginated manner with each page consisting of 4 cards(results)
		Arrow keys on either side of the result can be used to navigate
		The last page shows that there are no more results. 
		Each result consists of artist picture, details, and a View Albums button.
		The view albums button is stylised using CSS and sends a request to load the next page.

Page 2: 

	Page 2 consists of 2 main frames.
	The left side of the page contains details about the selected Artist.
		Hovering over the artist icon gives provides details about the artist 
		It also contains all the social links 
	The right side of the page consists od all the album details
		The search results are loaded dynamically using template literals in the JS code. 
		The results are showed in a paginated manner with each page consisting of 4 cards(results)
		Arrow keys on either side of the result can be used to navigate
		The last page shows that there are no more results. 
		Each result consists of artist picture, details, and a View Tracks button.
	Clicking on the View Tracks button launches a modal window 
		This contains the list of all the tracks in the Album along with their duration.

	
