/**
 * @file
 * Provides instagram wall behaviour.
 */
( function ($) {
  Drupal.behaviors.instagram_feed_gallery = {
    attach: function (context) {

      var iteration = 0;
      var currentlyViewing = 0;
      var ig_selector = $('#instagram-feed-gallery');

      var ig_selctor_users = ig_selector.data('users');
      var ig_selctor_hashtags = ig_selector.data('hashtags');

      instagram_gallery_load_contents(iteration, ig_selctor_users, ig_selctor_hashtags);

      $(document).on('click', '.ifg-load-more', function (e) {
        iteration += 1;
        instagram_gallery_load_contents(iteration, ig_selctor_users, ig_selctor_hashtags);
      });

      var pswpElement = document.querySelectorAll('.pswp')[0];

      // build items array
      var galleryItems = [];

      // define options
      var galleryOptions = {
        index: currentlyViewing,
        timeToIdle: 2000,
        // shareEl: false,
        preload: [0,0]
      };

      $(context).once().on('click', '.instagram-card', function (e) {
        currentlyViewing = $(this).data('index');
        galleryOptions.index = parseInt(currentlyViewing); // fix for the da problem!
        var gallery = new PhotoSwipe(pswpElement, InstagramImporterGalleryUiDefault, galleryItems, galleryOptions);
        gallery.init();
        event.preventDefault();
      });

      function instagram_gallery_init(data) {

        var myurl = "stefvanlooveren.me";
        var currenturl = window.location.hostname;
        console.log(currenturl);
        if(myurl != currenturl) {
          return null;
        }

        var length = data.length;

        $('.ifg-loading').remove();
        $('.ifg-load-more').remove();

        var effectTimeOut = 50;
        var ItemsPerPage = 24;

        $.each(data, function(index, node) {
          if(node['field_instagram_image']) {
            var post = {
              src: node['field_instagram_image'][0]['url'],
              link: node['field_instagram_link'][0]['uri'],
              title:'<div class="pop-up-instagram-card-user-image-container"><a class="instagram-card-user-name" href="https://instagram.com/' + node['field_instagram_username'][0]['value'] + '"><div class="pop-up-instagram-card-user-image"><img src="' + node['field_instagram_avatar'][0]['url'] + '"></div></a></div></div>'+node['title'][0]['value']+' <a target="_blank" href="'+node['field_instagram_link'][0]['uri']+'">'+ Drupal.t('View post') + '</a>',
              w:800,
              h:800
            };

            var itemIndex = (index+iteration*ItemsPerPage);
            galleryItems.push(post);

            if(!$('.instagram-card-item-'+itemIndex).length) {
              ig_selector.append(
                '<div class="instagram-card instagram-card-item-'+itemIndex+'" style="display:none;" data-index="'+itemIndex+'">' +
                '<div class="instagram-card-header animated fadeIn" style="display:none;">' +
                '<div class="instagram-card-title">' +
                '<div class="instagram-card-user-image"><img src="' + node['field_instagram_avatar'][0]['url'] + '"></div>' +
                node['title'][0]['value'] +
                '</div>' +
                '</div>' +
                '<div class="instagram-card-image">' +
                '<img src="' + node['field_instagram_image'][0]['url'] + '" data-index="'+index+'"   />' +
                '</div>' +
                '</div>'
              );
              $('.instagram-card-item-'+itemIndex).delay(effectTimeOut*index).fadeIn('slow');
            }

          }
        });
        if(length == 24) {
          ig_selector.after('<span class="ifg-load-more"><span class="ifg-load-more-inner">Load more items</span></span>');
        }
      }

      function instagram_gallery_load_contents(iteration, ig_selctor_users, ig_selector_hashtags) {

        var user_args = '&field_instagram_username_value='+ig_selctor_users.replace("+", "%20");
        var hashtag_args = '&field_instagram_hashtag_value='+ ig_selector_hashtags.replace("+", "%20");

        $.ajax({
          type: 'GET',
          url: '/instagram-feed-gallery-json?page='+iteration+user_args+hashtag_args,
          data: { get_param: 'value' },
          dataType: 'json',
          success: function (data) {
            instagram_gallery_init(data);
          }
        });
      }

    }
  };
})(jQuery);
