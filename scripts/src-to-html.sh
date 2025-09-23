# 1. Render all files that require some sort of external input

# 1.1. Markdown Rendering
# Array of template files
file_list=(
    'src/templates/cool-links-template.html'
)

# Loop through each template file
for template_file in "${file_list[@]}"; do
    # Extract the base name of the template file (without the path)
    base_name=$(basename "$template_file" -template.html)

    # Define the output file path
    output_file="src/templates/rendered/${base_name}.html"

    # Run the rendering command
    python scripts/md2html-renderer.py \
        --md-file "public/docs/${base_name}.md" \
        --output-file "$output_file" \
        --template-file "$template_file" \
        --backup-folder ignore/md2html-backups/
done

# 1.2. Other Rendering/Copy+Paste
file_list=(
    'src/templates/index-template.html'
    'src/templates/games-template.html'
)

for template_file in "${file_list[@]}"; do
    # Extract the base name of the template file (without the path)
    base_name=$(basename "$template_file" -template.html)

    # Define the output file path
    output_file="src/templates/rendered/${base_name}.html"

    cp $template_file $output_file
done

# 2. Replace the paths in the rendered files
python scripts/rendered-path-replacer.py

# Cleanup
rm src/templates/rendered/*