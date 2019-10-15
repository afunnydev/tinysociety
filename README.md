# Tiny Society

## Using this theme

1) All images should be put in the themes/themename/source-images folder. The gulp pipeline will build different folder for our images (with different sizes) in themes/themename/static. I recommend keeping all images directly the sources-images folder, so that they will all be available in the Netlify CMS media center. 
2) Setup in the content folder is made thinking about Netlify CMS integration. All my singles pages that are directly on the root (/a-propos, /contact) are in singles. The "identifiant" is always the same as the name of the file. This is to help saving the file with Netlify CMS.
3) You can create redirects for your Netlify Hosting using the static/\_redirects file
4) At the moment, don't forget to add the IS_PROD variable with a value of true to your hosting environment, so that you Tag Manager container is included. I recommend you to also add the HUGO_VERSION to your environment, to control which version of Hugo will be used.