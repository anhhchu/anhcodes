import requests

def get_post_by_author(api_url, headers):
    url = api_url + "/me/all"
    response = requests.get(url, headers=headers)
    return response.json()

def get_post_by_id(api_url, headers, id):
    url = api_url + f"/{id}"
    print(url)
    response = requests.get(url, headers=headers)
    print(response.json()["user"])

def get_id_by_title(api_url, headers, title):
    posts = get_post_by_author(api_url, headers)
    for post in posts:
        if post['title'] == title:
            return post['id']
