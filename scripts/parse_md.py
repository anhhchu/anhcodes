import re
def parse_md(md_path):
    # Read the content of the markdown file
    with open(md_path, 'r') as f:
        markdown_content = f.read()

    # Extract data between --- and --- into a dictionary
    data = {}
    in_data_block = False
    for line in markdown_content.split('\n'):
        if line.strip() == '---':
            in_data_block = not in_data_block
        elif in_data_block:
            key, value = line.split(':', 1)
            data[key.strip()] = value.strip().replace('"', '')

    # Remove data block between --- and ---
    markdown_content = re.sub(r'^---\n.*?\n---\n', '', markdown_content, flags=re.DOTALL | re.MULTILINE)

    # Remove 
    markdown_content = re.sub(r'{{<\s*table_of_contents\s*>}}\n?', '', markdown_content)

    # Replace image blocks with URL
    markdown_content = re.sub(r'{{<\s*image\s+image\s*=\s*"([^"]+)"\s*>}}', r'![image](https://raw.githubusercontent.com/anhhchu/anhcodes/master/static/\1)', markdown_content)

    return data, markdown_content


if __name__ == "__main__":
    data, markdown_content = parse_md('../content/blog/spark-sql-programming.md')
    print(data)
    print(markdown_content)