import sys
import json
import os
import subprocess

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(f"Usage {sys.argv[0]} <link-paths-json>")
        exit(-1)

    with open(sys.argv[1], 'r') as linfo_f:
        link_info = json.load(linfo_f)
        for s, d in link_info['source-dest'].items():
            content = None
            d_dir = d.rsplit('/', 1)[0]
            with open(s, 'r') as src:
                content = src.read()

                # Relativize paths in memory
                for link_str, ln in link_info['string-link'].items():
                    result = subprocess.run([f'realpath',
                                              f'{ln}',
                                              f'--relative-to',
                                              f'{d_dir}'
                                            ],
                                            capture_output=True,
                                            text=True)
                    if result.returncode != 0:
                        raise Exception(f"Error running realpath")

                    relpath = result.stdout.strip()
                    content = content.replace(link_str,
                                              relpath)
                    # print(f"Replaced {link_str} in {d}: {d_dir}")

                # Not really required...
                for aria_str, p in link_info['aria-replacements'].items():
                    if p == d:
                        content = content.replace(aria_str, 'page')
                    else:
                        content = content.replace(aria_str, 'false')

                # This is important!
                for active_str, p in link_info['active-navbar-replacements'].items():
                    if p == d:
                        content = content.replace(active_str, 'active')
                    else:
                        content = content.replace(active_str, '')

            # Write relative paths
            with open(d, 'w') as f:
                f.write(content)

