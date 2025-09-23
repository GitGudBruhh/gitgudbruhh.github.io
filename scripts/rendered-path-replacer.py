import os

files_to_replace = [
    './src/templates/rendered/index.html',
    './src/templates/rendered/cool-links.html',
    './src/templates/rendered/games.html',
]

paths = [
    (
        'FAVICON_ICO',
        './public/images/favicon.ico',
        './public/images/favicon.ico'
    ),
    (
        'INDEX_HTML',
        './src/templates/rendered/index.html',
        './index.html'
    ),
    (
        'INDEX_CSS',
        './src/templates/rendered/index.css',
        './index.css'
    ),
    (
        'INDEX_JS',
        './src/templates/rendered/index.js',
        './index.js'
    ),
    (
        'COOL_LINKS_HTML',
        './src/templates/rendered/cool-links.html',
        './pages/cool-links.html'
    ),
    (
        'COOL_LINKS_CSS',
        './src/templates/rendered/cool-links.css',
        './pages/cool-links.css'
    ),
    (
        'COOL_LINKS_MD',
        './public/docs/cool-links.md',
        './public/docs/cool-links.md'
    ),
    (
        'GAMES_HTML',
        './src/templates/rendered/games.html',
        './pages/games.html'
    ),
    (
        'SNOW_PNG',
        './public/images/snow.png',
        './public/images/snow.png'
    )
]

def relativize_paths(path1, path2):
    # Normalize the paths to remove any . or .. components
    normalized_path1 = os.path.normpath(path1)
    normalized_path2 = os.path.normpath(path2)

    # Get the common prefix of both paths
    common_prefix = os.path.commonpath([normalized_path1, normalized_path2])

    # Check if both paths are in the same directory
    if os.path.dirname(normalized_path1) == os.path.dirname(normalized_path2):
        # If they are in the same directory, return the base name of path2
        return os.path.basename(normalized_path2)

    # Calculate the relative path from path1 to path2
    relative_path = os.path.relpath(normalized_path2, start=os.path.dirname(normalized_path1))

    return relative_path

def replace_paths(rendered_file_path):
    rendered_content = None

    with open(rendered_file_path, 'r', encoding='utf-8') as f:
        rendered_content = f.read()

        for _, curr_src, curr_dst in paths:
            if curr_src == rendered_file_path:
                for pattern, link_src, link_dst in paths:
                    rendered_content = rendered_content.replace(pattern,
                                                                relativize_paths(
                                                                    curr_dst,
                                                                    link_dst
                                                                )
                                                            )

        return rendered_content

def main():
    for f_path in files_to_replace:
        content = replace_paths(f_path)
        for _, src, dst in paths:
            if src == f_path:
                with open(dst, 'w', encoding='utf-8') as f:
                    f.write(content)
                    print(f_path)

if __name__ == '__main__':
    main()
