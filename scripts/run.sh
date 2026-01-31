cp ./src/templates/index-template.html ./build/index.html
cp ./src/templates/blog-template.html ./build/blog.html
cp ./src/templates/cool-links-template.html ./build/cool-links.html
cp ./src/templates/cool-links-template.css ./build/cool-links.css
cp ./src/templates/games-template.html ./build/games.html
cp ./src/templates/index-template.css ./build/index.css

python3 ./scripts/renderer.py ./scripts/render-files.json
python3 ./scripts/link-replacer.py ./scripts/link-paths.json
