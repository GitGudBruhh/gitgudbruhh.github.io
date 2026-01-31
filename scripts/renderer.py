import sys
import json
import os
import subprocess

def replaceme_head(content):
    with open('./src/components/head.html') as head_f:
        head_content = head_f.read()
        new_content = content.replace('<!-- REPLACEME-HEAD -->', head_content)
        return new_content

def replaceme_navbar(content):
    with open('./src/components/navbar.html') as navbar_f:
        navbar_content = navbar_f.read()
        new_content = content.replace('<!-- REPLACEME-NAVBAR -->', navbar_content)
        return new_content

def replaceme_footer(content):
    with open('./src/components/footer.html') as footer_f:
        footer_content = footer_f.read()
        new_content = content.replace('<!-- REPLACEME-FOOTER -->', footer_content)
        return new_content

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(f"Usage {sys.argv[0]} <render-files-json>")
        exit(-1)

    with open(sys.argv[1], 'r') as rinfo_f:
        render_info = json.load(rinfo_f)
        for f_path in render_info:
            content = None

            # Read and make rendering replacements in memory
            with open(f_path, 'r') as f:
                content = f.read()

                # Common Rendering
                content = replaceme_head(content)
                content = replaceme_navbar(content)
                content = replaceme_footer(content)

                # Custom rendering per file
                for custom_replace_string in render_info[f_path]:
                    dispatch_cmd = render_info[f_path][custom_replace_string]
                    result = subprocess.run(dispatch_cmd,
                                            capture_output=True,
                                            text=True)
                    if result.returncode != 0:
                        raise Exception(f"Error running {dispatch_cmd}")

                    content = content.replace(custom_replace_string,
                                              result.stdout.strip())

                    # print(f"Replaced {custom_replace_string} in {f_path}")

            # Write rendering
            with open(f_path, 'w') as f:
                f.write(content)

