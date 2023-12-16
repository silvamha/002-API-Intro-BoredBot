document.getElementById("bored-bot").addEventListener("click", getIdea)

function getIdea() {
    fetch("https://www.boredapi.com/api/activity")
        .then(res => res.json())
        .then(data => {
            document.body.classList.add("fun")
            document.getElementById("idea").textContent = data.activity
            document.getElementById("title").textContent = "🦾 HappyBot🦿"
            console.log(data)
      
        })
}

fetch('https://dog.ceo/api/breeds/image/random')
  .then(response => response.json()) // Parse the response as JSON
  .then(data => {
  document.querySelector('#img-el').innerHTML=`
    <img src="${data.message}"/>`
    console.log(data)
    




  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });


getIdea()


function callAPI() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  // The API URL is hardcoded for consistency.
  var apiURL = 'https://www.boredapi.com/api/activity';
  Logger.log("API URL: " + apiURL); // Log the URL for debugging purposes.
  
  if (apiURL) { // Check if the URL is not empty.
    try {
      var response = UrlFetchApp.fetch(apiURL, {muteHttpExceptions: true}); // Call the API and mute exceptions.
      var statusCode = response.getResponseCode(); // Get the HTTP status code of the response.
      var json = response.getContentText(); // Get the JSON response text.
      
      Logger.log("Status Code: " + statusCode); // Log the status code for debugging purposes.
      Logger.log("API Response: " + json); // Log the response for debugging purposes.
      
      if (statusCode == 200) { // Check if the status code is 200 OK.
        var data = JSON.parse(json); // Parse the JSON response into an object.
        var activity = data.activity; // Extract the 'activity' from the response.
        
        if (activity) { // Check if the activity is defined.
          Logger.log("Activity to insert: " + activity); // Log the activity for debugging purposes.
          sheet.getRange("D2").setValue(activity); // Set the response to cell D2.
        } else {
          Logger.log("No activity found in response"); // Log if activity is undefined.
        }
      } else {
        Logger.log("Non-200 status code received: " + statusCode); // Log if status code is not 200.
      }
    } catch (e) {
      Logger.log("Error fetching API: " + e.toString()); // Log any errors during the fetch.
    }
  } else {
    Logger.log("API URL is empty"); // Log if API URL is empty.
  }
}