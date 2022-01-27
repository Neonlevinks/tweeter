/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
   
  const createTweetElement = (tweetObject) => {
    console.log(tweetObject)
    const $tweet = $(`
    <article class="tweet">
      <header class="tweet-header">
        <div class="header-left">
          <div>
            <img class="profile" src="${tweetObject.user.avatars}" alt="">
          </div>
    
          <div>
            ${tweetObject.user.name}
          </div>
        </div>
                
        <div class="header-right">
          ${tweetObject.user.handle}
        </div>
    
      </header>
      <div>
        ${tweetObject.content.text}
      <div>
      <footer>
        <span class="days">${timeago.format(tweetObject.created_at)}</span>
        <div>
          <i class="fas footers fa-flag"></i>
          <i class="fas footers fa-retweet"></i>
          <i class="fas footers fa-heart"></i>
        </div>
      </footer>
    </article>
    `);
    return $tweet
  };

  const renderTweets = (tweets) => {
    for (const tweet of tweets) {
      const tweetElement = createTweetElement(tweet);
      $(".tweet-holder").append(tweetElement);
    };
  };

  const loadTweets = () => {
    $.ajax("/tweets/", {
      method: 'GET',
      success: (data) => renderTweets(data)
    });
  }

  $("#tweet-form").submit((event) => {
    const charactersUsed = $("textarea").val().length
    let charactersLeft = 140 - charactersUsed;    
    if (charactersLeft < 0) {
      $(".error").text("You are over your character limit!");
      $(".error").fadeIn("slow");
      return event.preventDefault();
    };
    if (charactersUsed === 0 || charactersUsed === null) {
      $(".error").text("You need to write something to tweet!");
      $(".error").fadeIn("slow");
      return event.preventDefault();
    }
    
    event.preventDefault();
    const $value = $("#tweet-form").serialize();  
    $.ajax("/tweets/", {
    method: 'POST',
    data: $value,
    success: () => {
      loadTweets();
      $("textarea").val('');
      $(".error").fadeOut('slow');
    }
    });
  })

  
  loadTweets();
});