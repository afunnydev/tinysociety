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
  // Activate the sidebar
  $('#sidebar').stickySidebar({
      topSpacing: 40,
      bottomSpacing: 40,
      containerSelector: ".article-text",
      innerWrapperSelector: '.sidebar__inner'
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
      accessToken: '7328857212.1677ed0.7160b9e79e0542f39a0001cb4cb0eda6',
      limit: '8',
      resolution: "thumbnail",
      error: {
          template: '<div class="col-md-12 col-sm-12 col-xs-12"><span class=text-center>No Images Found</span></div>'
      },
      template: '<div class="column one-fourth insta-div"><a class="insta-link" href="{{link}}" target="_blank"><img src="{{image}}" class="insta-image" /></a></div>'
  });
  userFeed.run();
  var slider = document.getElementById('home-slider');
  
  // 2: load large image
  var imgLarge = new Image();
  imgLarge.src = slider.dataset.large; 
  imgLarge.onload = function () {
    slider.style.backgroundImage = 'url('+slider.dataset.large+')';
    slider.classList.add('loaded');
  };
});
// window.onload = function() {
  
//   var slider = document.getElementById('home-slider');
  
//   // 2: load large image
//   var imgLarge = new Image();
//   imgLarge.src = slider.dataset.large; 
//   imgLarge.onload = function () {
//     slider.style.backgroundImage = 'url('+slider.dataset.large+')';
//     slider.classList.add('loaded');
//   };
// }
