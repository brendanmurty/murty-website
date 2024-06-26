# Build

# Setup the message colour characters

blue="\033[0;34m"
yellow="\033[0;33m"
red="\033[0;31m"
end="\033[0m"

# Define the temporary build directory (BUILD_DIR) and public output directory (PUBLIC_DIR)

BUILD_DIR="build"
PUBLIC_DIR="docs"

echo -e "${yellow}Clearing the '$PUBLIC_DIR' directory${end}"
rm -r $PUBLIC_DIR
mkdir -p $PUBLIC_DIR

echo -e "${yellow}Clearing the '$BUILD_DIR' directory and recreating subdirectories${end}"
rm -r $BUILD_DIR
mkdir -p $BUILD_DIR
mkdir -p $BUILD_DIR/_data
mkdir -p $PUBLIC_DIR/brendan
cp -r styles $BUILD_DIR/_styles
cp -r templates $BUILD_DIR/_includes

echo -e "${yellow}Combining the CSS files${end}"
mkdir -p $BUILD_DIR/_assets/css
cat $BUILD_DIR/_styles/all.css $BUILD_DIR/_styles/brendan.css $BUILD_DIR/_styles/isla.css $BUILD_DIR/_styles/freya.css $BUILD_DIR/_styles/luca.css > $BUILD_DIR/_assets/css/styles.css

echo -e "${yellow}Building photo posts for photos in 'inbox' directory${end}"
deno run -A --allow-read --allow-write src/photo-posts-generate.ts

echo -e "${yellow}Removing EXIF data from all files in the 'assets/images' directory${end}"
exiftool -recurse -all= assets/images
exiftool -recurse -delete_original assets/images

echo -e "${yellow}Preparing page content files${end}"
cp -r content/* $BUILD_DIR

echo -e "${yellow}Preparing site data for Lume${end}"
deno run -A --allow-read --allow-write src/site-data.ts

echo -e "${yellow}Building the front-end using Lume and '_config.ts'${end}"
lume

echo -e "${yellow}Updating '$PUBLIC_DIR/sitemap.xml' to use the production URL${end}"
sed -i -e "s/http:\/\/localhost\//https:\/\/murty.au\//g" $PUBLIC_DIR/sitemap.xml
rm -rf $PUBLIC_DIR/sitemap.xml-e

echo -e "${yellow}Copying static files to '$PUBLIC_DIR' directory${end}"
cp -r "assets/fonts" "$PUBLIC_DIR/fonts"
cp -r "assets/images" "$PUBLIC_DIR/images"
cp "CNAME" "$PUBLIC_DIR/CNAME"
cp "assets/.nojekyll" "$PUBLIC_DIR/.nojekyll"
cp "assets/favicon.ico" "$PUBLIC_DIR/favicon.ico"
cp "assets/robots.txt" "$PUBLIC_DIR/robots.txt"
cp "assets/Resume - Brendan Murty.pdf" "$PUBLIC_DIR/brendan/Resume - Brendan Murty.pdf"
mkdir -p $PUBLIC_DIR/css
cp -r assets/icons/fontawesome $PUBLIC_DIR/css
cp "$BUILD_DIR/_assets/css/styles.css" "$PUBLIC_DIR/css/styles.css"

echo -e "${yellow}Building the JSON Feed for Brendan's posts${end}"
deno run -A --allow-read --allow-write --allow-env src/json-feed.ts
