(function($) {
  $.extend({
    initPageFuncs: function() {
      $.addToWishList({
        'class': 'wishlist_toggle',
        'textclass': 'wishlist_text',
        'htmlon': 'Remove From Wishlist',
        'htmloff': 'Add To Wishlist',
        'tooltip_css': 'whltooltips'
      });
      $.addToCartInit({
        'cart_id': 'cartcontents',
        'target_id': 'cartcontentsheader',
        'image_rel': 'itmimg'
      });
      $("a.notify_popup").unbind();
      $("a.notify_popup").fancybox({
        'transitionIn': 'elastic',
        'transitionOut': 'elastic',
        'padding': 0
      });
      $(".disp_ajax_templ").unbind();
      $(".disp_ajax_templ").change(function() {
        var sku = $(this).val();
        var rel = $(this).attr('rel');
        $.load_ajax_template(rel, {
          'sku': sku,
          'showloading': true,
          'procdata': 'n'
        }, {
          onLoad: function() {
            $.initPageFuncs();
          }
        });
      });
      $.initSearchField({
        'result_header': '<ul class="nav nav-list">',
        'result_body': '<li><a href="javascript:void(0);" search-keyword="##model##"><img border="0" src="##thumb##" width="36" height="36" align="left"/><span class="title">##model##</span></a></li>',
        'result_footer': '</ul>',
        'category_header': '<ul class="nav nav-list">',
        'category_body': '<li><a href="##url##"><span class="thumb"><img border="0" src="##thumb##" width="36" height="36"/></span><span class="title">##fullname##</span> <span class="label label-default">##typename##</span></a></li>',
        'category_footer': '</ul>'
      });
    },
    checkValidQty: function() {
      var found = 0;
      $("#multiitemadd :input").each(function() {
        if ($(this).attr('id').match(/^qty/)) {
          if ($(this).val() > 0) {
            found = 1;
          }
        }
      });
      if (found == 0) {
        $.fancybox("Please specify a quantity before adding to cart");
        return false;
      }
      return true;
    },
    modQtyByMulti: function(obj, act) {
      var mul = 1;
      var maxm;
      var minm = 0;
      var objid = obj.replace(/^qty/, '');
      if ($('#qty' + objid).length > 0) {
        if ($('#multiplier_qty' + objid).length > 0) {
          mul = $('#multiplier_qty' + objid).val();
        }
        if ($('#min_qty' + objid).length > 0) {
          minm = $('#min_qty' + objid).val();
        }
        if ($('#max_qty' + objid).length > 0) {
          maxm = $('#max_qty' + objid).val();
        }
        var cur = $('#' + obj).val();
        if (isNaN(cur)) {
          cur = 0;
        }
        if (act == 'add') {
          cur = parseInt(cur) + parseInt(mul);
          if (!isNaN(maxm) && cur > maxm) {
            cur = maxm;
          }
        } else if (act == 'subtract') {
          cur = parseInt(cur) - parseInt(mul);
          if (cur < minm) {
            cur = minm;
          }
        }
        $('#qty' + objid).val(cur);
      }
    }
  });
})(jQuery);
$(document).ready(function() {
  $("#card_ccv").fancybox();
  $("#terms").fancybox({
    'width': 850,
    'height': 650
  });
  $(".quickview").fancybox({
    'width': 850,
    'height': 650
  });
  $(".datepicker").datepicker({
    dateFormat: "dd/mm/yy"
  });
  $.initPageFuncs();
  $('.carousel').carousel();
});

function mycarousel_initCallback(carousel) {
  carousel.buttonNext.bind('click', function() {
    carousel.startAuto(0);
  });
  carousel.buttonPrev.bind('click', function() {
    carousel.startAuto(0);
  });
  carousel.clip.hover(function() {
    carousel.stopAuto();
  }, function() {
    carousel.startAuto();
  });
};
$(".btn-loads").click(function() {
  $(this).button("loading");
  var pendingbutton = this;
  setTimeout(function() {
    $(pendingbutton).button("reset");
  }, 3000);
});
$(document).ready(function() {
  $(".notifymodalactivate").fancybox({
    'type': 'inline',
  });
});
$(document).ready(function() {
  $(".fancybox").fancybox();
});
$('.tipsy').tooltip({
  trigger: 'hover',
  placement: 'bottom'
});
var addthis_config = {
  ui_offset_top: -12,
  services_compact: 'facebook,twitter,google_plusone_share,tumblr,linkedin'
}
var NETOFacebookPurpose = false;
var NETOFacebookPurposeName = 'facebook';
$.extend({
  addFacebookNPurpose: function() {
    $.addNPurpose(NETOFacebookPurposeName);
    NETOFacebookPurpose = true;
  },
  addNPurpose: function(npur) {
    $("a").each(function() {
      var url = $(this).attr('href');
      if (typeof url == 'string') {
        var tget = $(this).attr('target');
        if (!tget || tget == '') {
          if (!url.match(/^#/) && !url.match(/npurpose=/) && !url.match(/javascript:/)) {
            if (url.match(/\?/)) {} else {
              url = url + '?npurpose=' + npur;
            }
            $(this).attr('href', url);
          }
        }
      }
    });
    $("form").each(function() {
      var hasnpurpose = false;
      $(':input', this).each(function() {
        if (!hasnpurpose) {
          var name = $(this).attr('name');
          if (typeof name == 'string' && name == 'npurpose') {
            hasnpurpose = true;
          }
        }
      });
      if (!hasnpurpose) {
        $('<input type="hidden" name="npurpose" value="' + npur + '">').appendTo(this);
      }
    });
  }
});
document.onreadystatechange = function() {
  if (document.readyState == "interactive") {
    $(".dropdown-hover").hover(function() {
      $(this).toggleClass("open");
    });
  }
}
$(document).ready(function() {
  $('.price-range-lg').hide();
  $('.price-range').hide();
  $('.filter').css('display', 'none');
  $('.filter-remove').each(function() {
    var showfilters = $(this).attr('data-filtercode');
    $('.filter-title[data-filtercode="' + showfilters + '"]').click();
  });
});
$('.filter-title').click(function() {
  var filtercode = $(this).attr('data-filtercode')
  $('.filter[data-filtercode="' + filtercode + '"]').slideToggle();
  if ($("i", this).hasClass("fa-angle-down")) {
    $("i", this).removeClass('fa-angle-down').addClass('fa-angle-up');
  } else {
    $("i", this).removeClass('fa-angle-up').addClass('fa-angle-down');
  }
});
$('.filter-title[data-filtercode=price]').click(function() {
  $(this).next('.price-range').toggle();
  if ($("i", this).hasClass("fa-angle-down")) {
    $("i", this).removeClass('fa-angle-down').addClass('fa-angle-up');
  } else {
    $("i", this).removeClass('fa-angle-up').addClass('fa-angle-down');
  }
});
$('.filter-title[data-filtercode=price-lg]').click(function() {
  $(this).next('.price-range-lg').toggle();
  if ($("i", this).hasClass("fa-angle-down")) {
    $("i", this).removeClass('fa-angle-down').addClass('fa-angle-up');
  } else {
    $("i", this).removeClass('fa-angle-up').addClass('fa-angle-down');
  }
});
$('#mainnav li').mouseenter(function() {
  if ($(this).children('ul').offset().left + 200 > $(window).width()) {
    $(this).children('ul').css('right', 180);
  }
});
