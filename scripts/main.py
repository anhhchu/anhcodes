import requests
import os
from dotenv import load_dotenv
import argparse
from parse_md import parse_md
from get_post import get_id_by_title

load_dotenv()
api_key = os.getenv('DEVTO_API_KEY')

api_url = 'https://dev.to/api/articles'

headers = {
    'api-key': api_key,
    'Content-Type': 'application/json'
}


parser = argparse.ArgumentParser()
parser.add_argument('--action', type=str, help='Action to perform', choices=["publish", "update"], required=True)
parser.add_argument('--md_path', type=str, help='Path to markdown file', required=True)
parser.add_argument('--published', type=bool, help='Publish status',choices=[True, False], required=True)

args = parser.parse_args()


def publish_post():

    response = requests.post(api_url, headers=headers, json=post_data)

    if response.status_code == 201:
        print(f"Post uploaded successfully with id {response.json()['id']}")
    else:
        print("An error occurred:", response.text)

def update_post(title):
    id = get_id_by_title(api_url=api_url, headers=headers, title=title)
    print(f"Update post {title} with {id}")
    
    response = requests.put(f"{api_url}/{id}", headers=headers, json=post_data)

    if response.status_code == 200:
        print(f"Post updated successfully with id {response.json()['id']}")
    else:
        print("An error occurred:", response.status_code)


if __name__=="__main__":

    action = args.action
    md_path = args.md_path
    published = args.published

    data, markdown_content = parse_md(md_path)
    post_name = md_path.split("/")[-1].split(".")[0]

    post_data = {
        "article": {
            "title": data["title"],
            "published" : published,
            "body_markdown": markdown_content,
            "tags": data['tags'].strip('[]').split(','),
            "series": data['categories'],
            "main_image": f"https://raw.githubusercontent.com/anhhchu/anhcodes/master/static/{data['postImage']}",
            "canonical_url": f"https://anhcodes.dev/blog/{post_name}/",
            "description": data["title"]
        }
    }

    if action == 'publish':
        publish_post()
    elif action == 'update':
        update_post(data['title'])

