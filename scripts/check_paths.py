import os
import re
import argparse
import sys

# ANSI escape sequences for colored output
RED = "\033[38;5;196m"
BLUE = "\033[94m"
RESET = "\033[0m"

def find_local_paths_in_file(file_path):
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as file:
        content = file.read()
        # Regex to find valid relative paths starting with ./ or ../
        return re.findall(r'["\'](\.\.\/[^"\']*|\.\/[^"\']*)["\']', content)

def check_paths_in_files_and_directories(inputs, extensions, verbose):
    errors_found = False
    for input_path in inputs:
        if os.path.isdir(input_path):
            for root, _, files in os.walk(input_path):
                for file in files:
                    if any(file.endswith(ext) for ext in extensions):  # Check against provided extensions
                        file_path = os.path.join(root, file)
                        paths = find_local_paths_in_file(file_path)
                        for path in paths:
                            # Construct the full path
                            full_path = os.path.join(os.path.dirname(file_path), path)
                            # Check if the path is a directory or a file
                            if os.path.isdir(full_path):
                                if verbose:
                                    print(f"{BLUE}{full_path} is accessible from {file_path}{RESET}")
                            elif os.path.isfile(full_path):
                                if verbose:
                                    print(f"{BLUE}{full_path} is accessible from {file_path}{RESET}")
                            else:
                                print(f"\033[1m{RED}[ERROR] {full_path} is inaccessible from {file_path}{RESET}")
                                errors_found = True
        elif os.path.isfile(input_path):
            paths = find_local_paths_in_file(input_path)
            for path in paths:
                # Construct the full path
                full_path = os.path.join(os.path.dirname(input_path), path)
                # Check if the path is a directory or a file
                if os.path.isdir(full_path):
                    if verbose:
                        print(f"{BLUE}{full_path} is accessible from {input_path}{RESET}")
                elif os.path.isfile(full_path):
                    if verbose:
                        print(f"{BLUE}{full_path} is accessible from {input_path}{RESET}")
                else:
                    print(f"\033[1m{RED}[ERROR] {full_path} is inaccessible from {input_path}{RESET}")
                    errors_found = True

    if not errors_found and not verbose:
        print(f"{BLUE}All files scanned successfully with no errors.{RESET}")

def main():
    parser = argparse.ArgumentParser(description="Check local paths in source files.")
    parser.add_argument('inputs', nargs='+', help='List of files and directories to scan')
    parser.add_argument('-e', '--extensions', nargs='*', default=['.html', '.css', '.js'],
                        help='List of file extensions to check (default: .html .css .js)')
    parser.add_argument('-v', '--verbose', action='store_true', help='Enable verbose output')

    args = parser.parse_args()

    check_paths_in_files_and_directories(args.inputs, args.extensions, args.verbose)

if __name__ == "__main__":
    main()
