jQuery( document ).ready(function($) {
  // Select all links with hashes
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
        && 
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top - 50
          }, 1000, function() {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) { // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            };
          });
        }
      }
    });
  // Sidebar link styling
  var tableLinks = $('#sidebar li');
  tableLinks.first().addClass('active');
  // tableLinks.click(function(){
  //   tableLinks.removeClass('active');
  //   $(this).addClass('active');
  // });
  // Custom ScrollSpy
  // Cache selectors
  if ($("#toc")) {
    var lastId,
        topMenu = $("#Content .toc-h2"),
        // All list items
        menuItems = topMenu.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function(){
          var item = $($(this).attr("href"));
          if (item.length) { return item; }
        });

    // Bind to scroll
    $(window).scroll(function(){
       // Get container scroll position
       var fromTop = $(this).scrollTop()+100;
       
       // Get id of current scroll item
       var cur = scrollItems.map(function(){
         if ($(this).offset().top < fromTop)
           return this;
       });
       // Get the id of the current element
       cur = cur[cur.length-1];
       var id = cur && cur.length ? cur[0].id : "";
       
       if (lastId !== id) {
           lastId = id;
           // Set/remove active class
           menuItems
             .parent().removeClass("active")
             .end().filter("[href='#"+id+"']").parent().addClass("active");
       }                   
    });
  }
  var userFeed = new Instafeed({
      get: 'user',
      userId: '7328857212',
      accessToken: '7328857212.4cf9aed.bda93aa94e5043138b2d2d78b1c4dfa4',
      limit: '8',
      resolution: "thumbnail",
      error: {
          template: '<div class="col-md-12 col-sm-12 col-xs-12"><span class=text-center>No Images Found</span></div>'
      },
      template: '<div class="column one-fourth insta-div"><a class="insta-link" href="{{link}}" target="_blank"><img src="{{image}}" class="insta-image" /></a></div>'
  });
  userFeed.run();
  var myLazyLoad = new LazyLoad({
      elements_selector: "#article #Content .post #content img"
  });
  $('.plans-slider-navigation').slick({
      vertical: true,
      verticalSwiping: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      focusOnSelect: true,
      autoplay: false,
      infinite: false,
      variableWidth: false,
      prevArrow: '<span class="nav-arrow icon-left-open"></span>',
      nextArrow: '<span class="nav-arrow icon-right-open"></span>',
      asNavFor: '.plans-slider-images',
      responsive: [
        {
          breakpoint: 1199,
          settings: {
            prevArrow: '<span class="nav-arrow icon-left-open"></span>',
            nextArrow: '<span class="nav-arrow icon-right-open"></span>',
            vertical: true,
            verticalSwiping: true,
            slidesToShow: 5,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 767,
          settings: {
            prevArrow: '<span class="nav-arrow icon-left-open"></span>',
            nextArrow: '<span class="nav-arrow icon-right-open"></span>',
            vertical: false,
            verticalSwiping: false,
            slidesToShow: 4,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 479,
          settings: {
            vertical: false,
            verticalSwiping: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
          }
        },
      ]
  });

  $(".plans-slider-images").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      infinite: false,
      arrows: false,
      fade: true,
      adaptiveHeight: false,
      asNavFor: '.plans-slider-navigation',
  });

  $(".image-navigation__prev").on('click', function () {
      $(".plans-slider-images").slick('slickPrev');
  });

  $(".image-navigation__next").on('click', function () {
      $(".plans-slider-images").slick('slickNext');
  });
  var selectemVal = document.querySelector('input[name="selectemVal"]');

  $('.toggle-give-us, .close-overlay').click(function(e) {
    e.preventDefault();
    $('#give-overlay').stop(true, true).fadeToggle(500);
    var menuH = $('#Overlay #give-what-you-want').height() / 2;
    $('#Overlay #give-what-you-want').css('margin-top', '-' + menuH + 'px');
  });

  $( window ).load(function() {
    // Activate the sidebar
    $('#sidebar').stickySidebar({
        topSpacing: 40,
        bottomSpacing: 40,
        containerSelector: ".article-text",
        innerWrapperSelector: '.sidebar__inner'
    });
    $('#sidebar-plan').stickySidebar({
        topSpacing: 20,
        bottomSpacing: 20,
        containerSelector: ".plan-main-section",
        innerWrapperSelector: '.sidebar__inner'
    });
    // Plans Give Us What You Want
    // taken from apps.timwhitlock.info <3
    var emoji = [ "👊", "👍", "👌", "🙏","😉", "😋", "😃", "😎", "😘", "😍", "😳", "😇", "🔥", "🚀", "🏠" ],
        // my favourite is a dog! of course!
        message = [ "You know what they say: 20$ is 20$ (thanks a lot)! 👊", 
                    "C'mon you can do better (we still like you) 👍", 
                    "That's like 2 whole large pizzas, thanks for that sacrifice 👌🍕", 
                    "We can buy ourselves at least 48 beers with that 🙏🍺", 
                    "That's great, thanks for your support! 😉💪", 
                    "Your mama's proud of you, but we're more proud 😋👩", 
                    "It's more than average - 'That's what she said' 😃🙈", 
                    "Next time we see you, we promise to pay for the beer 😎🍻", 
                    "Not sure it's possible to be kinder than you 😘🙉", 
                    "A card saying thank you just doesn't cut it. So can you please be my Valentine, too? 😍", 
                    "We've never see that much money 😳💰", 
                    "Is this Christmas or what?!? 😇🎅", 
                    "You're awesome, we can eat this week because of you! 🔥🍳", 
                    "Are you god or something? 🚀👼", 
                    "You're a legend, if you need a place to stay in Montreal, hit us up! 🏠"
                  ];
    
    var emojiComment = $(".emoji-slider-question");                   
    $(".emoji-slider")
        
        // create a slider with 14 values (0-13)
        // and the default is a cat, obviously! ( emoji[6] === "🐈" )
        .slider({
            max: 14,
            value: 7
        })
        
        // now activate the pips and set it to have labels for all
        // items, and then set the labels to the array of animals from earlier
        .slider("pips", {
            rest: "label",
            labels: emoji
        })
        
        // whenever the slider changes value, we want to update the
        // text above the slider with a kawaii message!
        .on("slidechange", function( e, ui ) {
                
                // save the messages into variables
                var happyMessage = message[ui.value];
                
                // fade the question out quickly (using css)
                emojiComment.css({ opacity: 0 });
                
                // then fade it back in with the new message
                // and use a custom function to display the emoji.
                setTimeout(function() {
                        
                    emojiComment.html( happyMessage );
                    twemoji.parse(document.getElementsByClassName('emoji-slider-question')[0]);
                    emojiComment.css({ opacity: 1 });
                    $("span.donation").text((ui.value+1)*20);
                        
                }, 200 );
                        
        
        });
                        
    // lastly after the slider is initialised we need to
    // tell it to display out emoji on every label, but this
    // is a custom function, you can find it at github
    twemoji.parse(document.body);

    (function() {
      /* Add this class to any elements you want to use to open Drift.
       *
       * Examples:
       * - <a class="drift-open-chat">Questions? We're here to help!</a>
       * - <button class="drift-open-chat">Chat now!</button>
       *
       * You can have any additional classes on those elements that you
       * would ilke.
       */
      var DRIFT_CHAT_SELECTOR = '.drift-open-chat'
      /* http://youmightnotneedjquery.com/#ready */
      function ready(fn) {
        if (document.readyState != 'loading') {
          fn();
        } else if (document.addEventListener) {
          document.addEventListener('DOMContentLoaded', fn);
        } else {
          document.attachEvent('onreadystatechange', function() {
            if (document.readyState != 'loading')
              fn();
          });
        }
      }
      /* http://youmightnotneedjquery.com/#each */
      function forEachElement(selector, fn) {
        var elements = document.querySelectorAll(selector);
        for (var i = 0; i < elements.length; i++)
          fn(elements[i], i);
      }
      function openSidebar(driftApi, event) {
        event.preventDefault();
        driftApi.sidebar.open();
        return false;
      }
      ready(function() {
        drift.on('ready', function(api) {
          var handleClick = openSidebar.bind(this, api)
          forEachElement(DRIFT_CHAT_SELECTOR, function(el) {
            el.addEventListener('click', handleClick);
          });
        });
      });
    })();
  });
});
