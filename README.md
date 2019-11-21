# Instagram importer gallery

This javascript library will connect with the [Instagram importer](https://www.drupal.org/project/instagram_importer) drupal 8 module and create a beautiful plug-and-lay gallery to your website.

## How it works

1. Enable the *Instagram importer gallery* module, available in the instagram importer module.
2. Place this module inside your *libraries* folder, so that `jquery.instagram-importer-gallery.js` can be found in `web/libraries/instagram-importer-gallery/jquery.instagram-importer-gallery.js`.
3. Download the [PhotoSwipe](https://github.com/dimsemenov/PhotoSwipe) library and place it in your *libraries* folder, so that `photoswipe.js` can be found in `web/libraries/photoswipe/dist/photoswipe.js`.
4. Make sure you have imported instagram posts with the [Instagram importer](https://www.drupal.org/project/instagram_importer).
4. Blocks of type *Instagram Feed Gallery Block* are now available to add to a region. In the block form you can specify which posts (from a hashtag or a user) should be shown.
