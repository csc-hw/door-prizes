/*
 * doorprize.js (core.js)
 * by Kyle Huggins
 *
 * dependencies: jQuery 3.x
 *
 * http://taz.harding.edu/~khuggins/dolphin.exe/
 *
 */

var MODE_VERBOSE = false;

function verbose(msg) {
  // Easily toggleable logging
  if (MODE_VERBOSE) {
    console.log(msg);
  }
}

function victory (index, name) {
  // Populate victory page image and text
  var canvas = $("#winner")
  var winnerName = $("#winnerName")
  canvas.attr("src", "assets/" + icons[index]);
  verbose(index);
  winnerName.html(name);
}

function goFlight(seed) {
  // Get players
  // Get icons
  verbose("goFlight TRUE");
  var icons_root = ["wolf.png", "cat.png", "griffin.png", "bear.png", "viper.png"];
  icons = [];
  players = [];
  var c = 0;

  // Randomize player image order
  while (icons.length < 5) {
    var temp = icons_root[Math.floor(Math.random() * icons_root.length)];
    if(jQuery.inArray(temp, icons) == -1) {
      icons.push(temp);
    }
  }

  // Randomize player name order
  while (players.length < 5) {
    var temp = seed[Math.floor(Math.random() * seed.length)];
    if(jQuery.inArray(temp, players) == -1) {
      players.push(temp);
    }
  }

  showPane(2);

  // Append each player to table
  jQuery.each(players, function(index, item) {
    $("#playerboard").append('<tr><td><img src="assets/' + icons[index] + '" draggable="false"></td><td>' + item + '</td></tr>');
  });
}

function showPane(identifier) {
  // Switches the current viewport to game_identifier
  for (i = 1; i <= 4; i++) {
    $("#game_" + i).hide()
  }

  $("#game_" + identifier).show()
}

$(document).ready(function() {
  // Document is ready
  // Declare common elements
  var btnStart = $("#game_preflight");
  var btnRace = $("#game_start");
  var btnCancel = $("#game_cancel");
  var btnNewGame = $("#game_new");
  var entryField = $("#attendees");
  var arr_names;

  // Init event handling
  // Default entryField border behavior
  entryField.focus(function() {
    this.style.borderColor = "#fff";
  }).blur(function() {
    this.style.borderColor = "#c8c8c8";
  });

  btnStart.on("click", function() {
    $("#errorMessage").hide();
    arr_names = ($("#attendees").val()).split("\n");

    // Remove empty values from array
    jQuery.each(arr_names, function(index, item) {
      if (this == "" || this == " ") {
        arr_names.splice(index, 1);
      }
    });
    // Preflight checks -
    // Ensure we have more than five names
    if (arr_names.length < 5) {
      // FAIL
      $("#attendees").css("border-color", "red")
      $("#errorMessage").show();
    } else {
      // PASS
      goFlight(arr_names);
    }
  });

  btnRace.on("click", function() {
    // RACE
    verbose("Race START")
    showPane(3);

    var times = [];
    var len = $("#raceboard").width();
    len -= 125;

    // Populate images into raceboard
    for (var i = 1; i <= 5; i++) {
      $("#racer_" + i).attr("src", "assets/" + icons[i-1]);
    }

    // Create random array of times for animation length
    while (times.length < 5) {
      var temp = times.push((Math.floor(5 + Math.random()*(20 + 1 - 5))) * 1000);
      if(temp < 5000) {
        // Skip adding temp
      } else if (jQuery.inArray(temp, length) == -1) {
        times.push(temp);
      }
    }
    verbose(times);

    // Play start sound
    var gameAudio = new Audio("assets/boop.mp3");
    gameAudio.play();

    // Build out animation via left margin
    // Wait one sec before race start
    setTimeout(function() {
      for (var i = 1; i <= 5; i++) {
        $("#racer_" + i).animate({
          'marginLeft': '+=' + len
        }, times[i-1]);
      }
    }, 1000)

    var shortest = times[0];
    var i_shortest = 0;
    var longest = times[0];

    // Get shortest and longest times
    // Setup timeouts accordingly
    jQuery.each(times, function(index, item) {
      if (item < shortest) {
        shortest = item;
        i_shortest = index;
      }
      if (item > longest) {
        longest = item;
      }
    });

    verbose(shortest);
    verbose(longest);

    // Wait longest time + 2 sec before switching viewport
    setTimeout(function() {
      victory(i_shortest, players[i_shortest]);
      verbose(i_shortest);
      showPane(4);
    }, longest + 2000);
  })

  btnCancel.on("click", function() {
    verbose("Game CANCEL");
    $("#playerboard").empty();
    showPane(1);
  });

  btnNewGame.on("click", function() {
    location.reload();
  });
});
