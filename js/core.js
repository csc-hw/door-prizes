/*
 * doorprize.js
 * by Kyle Huggins
 *
 * http://taz.harding.edu/~khuggins/dolphin.exe/
 */

function showPane(identifier) {
  for (i = 1; i <= 2; i++) {
    $("#game_" + i).hide()
  }

  $("#game_" + identifier).show()
}

$(document).ready(function() {
  // Declare common elements
  var btn_start = $("#game_start");
  var arr_names;

  // Init event handling
  btn_start.on("click", function() {
    showPane(2);
    arr_names = ($("#attendees").val()).split("\n");

    // Remove empty values from array
    jQuery.each(arr_names, function(index, item) {
      if (this == "" || this == " ") {
        arr_names.splice(index, 1);
      }
    });
    console.log(arr_names);
  });
});
