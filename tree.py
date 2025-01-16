import os

def generate_tree(root_dir, exclude_dirs, prefix=""):
    contents = [d for d in os.listdir(root_dir) if d not in exclude_dirs and os.path.isdir(os.path.join(root_dir, d))]
    pointers = ["."] * (len(contents) - 1) + ["└──"]
    for pointer, path in zip(pointers, contents):
        full_path = os.path.join(root_dir, path)
        print(prefix + pointer + path)
        if os.path.isdir(full_path):
            extension = "│   " if pointer != "└──" else "    "
            generate_tree(full_path, exclude_dirs, prefix + extension)

# Specify the root directory here
root_directory = "C:\\Users\\allie\\Desktop\\CODES\\Lead\\"
exclude_directories = {'.venv', 'node_modules'}
print(root_directory)
generate_tree(root_directory, exclude_directories)