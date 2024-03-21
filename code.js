var numPilesInput = document.getElementById("piles");

function generateInputs(random = false) {
    var numPiles = parseInt(numPilesInput.value.trim());
  
    if (isNaN(numPiles) || numPiles <= 0 || !Number.isInteger(numPiles)) {
      alert("Please enter a valid positive integer for the number of piles.");
      location.href = "home.html";
    } else {
      var pvpSelection = document.getElementById("pvpSelection");
      pvpSelection.innerHTML = ""; // Clear previous content
  
      var header = document.createElement("h3");
      header.className = "text-center my-4";
      header.textContent = "Enter objects in each pile";
      pvpSelection.appendChild(header);
  
      var inputsContainer = document.createElement("div");
      inputsContainer.className =
        "d-flex flex-column align-items-center justify-content-center";
  
      for (var i = 0; i < numPiles; i++) {
        var input = document.createElement("input");
        input.className = "form-control my-2 p-2";
        input.type = random ? "number" : "text"; // Change input type based on random parameter
        input.placeholder = "Pile " + (i + 1);
        if (random) {
          input.value = Math.floor(Math.random() * 10) + 1; // Generate random number between 1 and 10
        }
        inputsContainer.appendChild(input);
      }
  
      var submitButton = document.createElement("button");
      submitButton.className = "btn btn-primary my-3 px-5 py-2";
      submitButton.type = "button";
      submitButton.textContent = "Submit";
      submitButton.onclick = checkobjects;
  
      inputsContainer.appendChild(submitButton);
  
      pvpSelection.appendChild(inputsContainer);
    }
  }


var object_values = [];

function checkobjects() {
  var inputs = document.querySelectorAll('#pvpSelection input[type="text"], #pvpSelection input[type="number"]');

  // Iterate through each input element
  for (var i = 0; i < inputs.length; i++) {
    var value = parseInt(inputs[i].value.trim());

    // Check if the value is a valid positive integer
    if (isNaN(value) || value <= 0 || !Number.isInteger(value)) {
      alert("Please enter a valid positive integer for Pile " + (i + 1) + ".");
      return;
    }
    // Store the value in the array
    object_values.push(value);
  }
  localStorage.setItem("object_values", JSON.stringify(object_values));

  var start = document.getElementById("start"); // Assuming you have a start button or element
  start.classList.remove("collapse");
  start.classList.add("show");
  start.removeAttribute("id");
}


var playerChips = 0; // Tracks the legal amount of chips able to be taken each round (1-3)
var totalChips = 1; // If totalChips = 13, game ends
var currentPlayer = 1; // Tracks the current player

// Modify the chipCount function to track the current row
var currentRow = 0;
function getSum(list) {
    var sum = 0;
    list.forEach(function(item) {
        sum += item;
    });
    return sum;
}



function chipCount(id) {
    var piles = getStoredValues(); // Fetch values from local storage
    var sumOfList = getSum(piles);
    var chipRow = parseInt(id.split("-")[1]); // Extract row number from chip ID
  
    // Reset chip counter
    document.getElementById("allchips").value = sumOfList;
  
    // Check if it's Player 2's turn and the selected row matches the current row
    if ((currentPlayer === 2 || currentPlayer === 1) && currentRow !== 0 && chipRow !== currentRow) {
      alert("Only select chips from the same row.");
      return;
    }
  
    // Check if only one pile is present and limit the selection of chips
    if (piles.length === 1) {
      if (playerChips >= 3) {
        alert("You cannot select more than three chips.");
        document.getElementById("counter").value = 3;
        return;
      }
    }
  
    // Increment player's chip count
    document.getElementById("counter").value = ++playerChips;
    document.getElementById(id).style.visibility = "hidden";
    totalChips++;
  
    // Update current row if not already set
    if (currentRow === 0) {
      currentRow = chipRow;
    }
  
    // Determine player's turn
    if (totalChips === sumOfList + 1) {
      if (currentPlayer === 1) {
        endGame("Player 1");
      } else {
        endGame("Player 2");
      }
    }
  }
  

function endTurn() {
  if (playerChips === 0) {
    alert("You must select at least one chip.");
  } else {
    playerChips = 0; // Reset the player's chip count
    document.getElementById("counter").value = 0; // Reset chip counter

    // Switch to the next player
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    var playerName = currentPlayer === 1 ? "Player 1" : "Player 2";
    document.getElementById("player").innerHTML = playerName;
    alert("It is now " + playerName + "'s turn");
    currentRow = 0;
  }
}



function endGame(winner) {
  localStorage.setItem("winner", winner);
  location.href = "results.html";


}

