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
            prevArrow: '<span class="nav-arrow icon-left-open"></span>',
            nextArrow: '<span class="nav-arrow icon-right-open"></span>',
            vertical: false,
            verticalSwiping: false,
            slidesToShow: 2,
            slidesToScroll: 1
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
  console.log (selectemVal); // returns the selected data-val attribute from the selectem-items list
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
  });
});
