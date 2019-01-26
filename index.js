'use strict';

const BASE_URL = 'https://api.github.com/users';

function displayResults(responseJson){
  const searchResults = [];
  for(let i = 0; i< responseJson.length; i++){
    searchResults.push(`
        <li id="results">
        <p>Name: ${responseJson[i].name}</p>
        <p>Description: ${responseJson[i].description}</p>
        <p>Repo URL: <a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a></p>
        </li>`);
  }
  $('#search-results').html(searchResults);
}


function fetchResults(url){
  fetch(url)
    .then(response =>response.json()
      .then(responseJson => displayResults(responseJson)))
    .catch(error => alert('Search results are not working'));
}


function formatSearchURL(users) {
  const query = users.split(' ').join('&');
  const completedURL = `${BASE_URL}/${query}/repos`;
  fetchResults(completedURL);
  console.log(completedURL);
}

function watchForm(){
  $('.search-form').submit(function(event) {
    event.preventDefault();
    const users = $('.search-input').val();
    console.log(users);
    formatSearchURL(users);
  });
}

function main() {
  watchForm();
}

$(main);