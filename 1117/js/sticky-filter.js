$(document).ready(function(){
      //sticky sidebar
      var ofa = 183;
      $navPosSB = $('#sidebar-filters').offset().top - ofa;
      if ( $(window).width() > 768 ) {
          $(window).scroll(function(){
              if( $(window).scrollTop() > $navPosSB ) {
                  $('#sidebar-filters').addClass('fixed-ls');
                  $('#left-sidebar').addClass('fixed-ls');
                  $('#left-sidebar').removeClass('col-sm-3')
                  $('#covet').removeClass('disp-off');
                  $('#covet').removeClass('col-sm-3');
              } else {
                  $('#left-sidebar').addClass('side-bal');
                  $('#sidebar-filters').removeClass('fixed-ls');
                  $('#left-sidebar').removeClass('fixed-ls');
                  $('#left-sidebar').addClass('col-sm-3')
                  $('#covet').addClass('disp-off');
                  $('#covet').addClass('col-sm-3');
              } //end if
          });
      } //end if
