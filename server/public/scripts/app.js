$(document).ready(function() {

// template for displaying tweets retrieved from database and call to put them on the page
  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function timeCalculator(timeSinceTweet) {
        time = '';
        switch (true) {
        case (timeSinceTweet < 120000):
          time = 'just now';
          break;
        case (timeSinceTweet < 3600000):
          time = Math.floor(timeSinceTweet / 60000) + ' mins ago';
          break;
        case (timeSinceTweet < 7200000):
          time = '1 hour ago';
          break;
        case (timeSinceTweet < 604800000):
          time = Math.floor(timeSinceTweet / 3600000) + ' hours ago';
          break;
        default:
          time = Math.floor(timeSinceTweet / 6048000000) + ' weeks ago';
      }
      return time;
  }

  function createTweetElement(data) {
    let timeSinceTweet = Date.now() - `${data['created_at']}`
    timeCalculator(timeSinceTweet)
    $('#main-tweet-body').prepend(`
    <section class="tweet">
      <article>
        <header>
          <img src=${escape(data['user']['avatars']['small'])}><p>${escape(data['user']['name'])}</p><span>${escape(data['user']['handle'])}</span>
        </header>
          <p>${escape(data['content']['text'])}</p>
        <footer>
          <class="time"p>${time}</p>
          <span class="icons">
            <i class="far fa-flag" ></i>
            <i class="fas fa-retweet" ></i>
            <i class="far fa-heart"></i>
          </span>
        </footer>
      </article>
    </section>`)
    $('<article>').addClass('tweet');
  };


  $( "form" ).submit(function( event ) {
    $('.no-char').hide();
    $('.too-many').hide();
    event.preventDefault();
    let stringInput = $('form').serialize();
    if (stringInput.length > 5 && stringInput.length <= 145) {
      $.ajax('/tweets', {data: stringInput, method: 'POST' })
      .done((response) => {
        loadTweets();
      })
      .fail(() => {
        console.log('The call failed');
      })
    } else if (stringInput.length <= 5){
      $('.no-char').slideToggle(400, function () {
        $('this, textarea').select();
      });
    } else {
      $('.too-many').slideToggle(400, function () {
        $('this, textarea').select();
      });
    }
    $('textarea').val('');
  })


  function loadTweets () {
    $('#main-tweet-body').empty()
    $.getJSON('/tweets', function(result){
      $.each(result, function(i, field){
        $('body').prepend(createTweetElement(field));
      });
    });
  };

  $('#nav-bar button').on('click', function() {
    $('.no-char').hide();
    $('.too-many').hide();
    $('.new-tweet').slideToggle(400, function () {
    $('this, textarea').select()
    });
  });

loadTweets()

});