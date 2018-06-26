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
  var tableLinks = $('#sidebar a');
  tableLinks.first().addClass('active');
  tableLinks.click(function(){
    tableLinks.removeClass('active');
    $(this).addClass('active');
  })
});
jQuery( document ).load(function($) {
  
}) 
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
