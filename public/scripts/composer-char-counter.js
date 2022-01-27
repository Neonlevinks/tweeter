$(document).ready(() => {
  $("textarea").on("keyup", () => {
    let charactersUsed = $("textarea").val().length
    let charactersLeft = 140 - charactersUsed;
    if (charactersLeft < 0) {
      $("output").css("color", "red");
    }
    $("output").text(`${charactersLeft}`);

  });
});