import os
import shutil
import argparse
import subprocess

def create_backup(output_file, backup_folder):
    if not os.path.exists(backup_folder):
        os.makedirs(backup_folder)

    # Determine the backup file name
    base_name = os.path.basename(output_file)
    backup_file = os.path.join(backup_folder, f"{base_name}-1.bak")
    index = 1

    while os.path.exists(backup_file):
        index += 1
        backup_file = os.path.join(backup_folder, f"{base_name}-{index}.bak")

    # Copy the existing output file to the backup location
    if os.path.exists(output_file):
        shutil.copy2(output_file, backup_file)

def md_to_html(md_file):
    # Call the md2html binary to convert the Markdown file to HTML
    result = subprocess.run(['md2html', md_file], capture_output=True, text=True)
    if result.returncode != 0:
        raise Exception(f"Error converting Markdown to HTML: {result.stderr}")
    return result.stdout

def replace_template(template_file, content):
    with open(template_file, 'r', encoding='utf-8') as f:
        template_content = f.read()
    return template_content.replace("<!-- REPLACEME-COOL-LINKS -->", content)

def main():
    parser = argparse.ArgumentParser(
        description='Convert a Markdown file to HTML and replace a placeholder in a template HTML file.',
        formatter_class=argparse.ArgumentDefaultsHelpFormatter
    )
    parser.add_argument(
        '--md-file',
        required=True,
        help='Path to the Markdown file to be converted.'
    )
    parser.add_argument(
        '--output-file',
        required=True,
        help='Path where the output HTML file will be saved.'
    )
    parser.add_argument(
        '--template-file',
        required=True,
        help='Path to the template HTML file containing the placeholder.'
    )
    parser.add_argument(
        '--backup-folder',
        required=True,
        help='Path to the folder where backups of the output file will be stored.'
    )

    args = parser.parse_args()

    # Create a backup of the existing output file
    if os.path.exists(args.output_file):
        create_backup(args.output_file, args.backup_folder)

    # Convert Markdown to HTML
    html_content = md_to_html(args.md_file)

    # Replace the template placeholder with the HTML content
    final_html = replace_template(args.template_file, html_content)

    # Write the final HTML to the output file
    with open(args.output_file, 'w', encoding='utf-8') as f:
        f.write(final_html)

if __name__ == '__main__':
    main()
