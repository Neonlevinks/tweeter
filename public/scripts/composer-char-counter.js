$(document).ready(() => {
  $("textarea").on("keyup", () => {
    let charactersUsed = $("textarea").val().length
    let charactersLeft = 140 - charactersUsed;
    $("output").text(`${charactersLeft}`)
  });
});