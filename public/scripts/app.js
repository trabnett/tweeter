/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}



$(document).ready(function() {


// $('.tweet').mouseenter(function() {
//     $(this).find('img').attr('src', pic)
//     $(this).find('header').find('p').html("hello world")
//     console.log($(this), 'hello')
//   })

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

var words = tweetData['content']['text']
function createTweetElement(data) {
$('#mainTweetBody').prepend(`
      <section class="tweet">
        <article>
          <header>
            <img src=${escape(data['user']['avatars']['small'])}><p>${escape(data['user']['name'])}</p><span>${escape(data['user']['handle'])}</span>
          </header>
            <p>${escape(data['content']['text'])}</p>
          <footer>
            <p>${escape(data['user']['created_at'])}</p>
          </footer>
        </article>
      </section>`)
  let $tweet = $('<article>').addClass('tweet');
};


$( "form" ).submit(function( event ) {
  event.preventDefault();
  let stringInput = $('form').serialize()
  console.log(stringInput)
  if (stringInput.length > 5 && stringInput.length <= 145) {
    $.ajax('/tweets', {data: stringInput, method: 'POST' })
    .done((response) => {
      loadTweets()
    })
    .fail(() => {
      console.log('The call failed')
    })
  } else if (stringInput.length <= 5){
    alert("please enter some content")
  } else {
    alert("your tweet is too long")
  }
})


function loadTweets () {
  $.getJSON("/tweets", function(result){
    $.each(result, function(i, field){
      console.log(field)
      $("body").prepend(createTweetElement(field));
    });
  });
};

$("#nav-bar").click(function() {
  alert( "Handler for .click() called." );
});



loadTweets()


var $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like





});