## [Anh's Personal Website](https://anhcodes.dev/)

This repository contains the source code for my personal website. It's built with the Hugo static site generator and hosted on Firebase.

* Original Theme: [Portio Hugo](https://github.com/StaticMania/portio-hugo)
* Customized Theme: [My Customized Portio Hugo](https://github.com/anhhchu/portio-hugo) (I've added my own customizations to the original theme)

## Getting Started

### Running Locally

1. Clone this repository to your local machine.
2. [Install Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
3. [Install Hugo](https://gohugo.io/installation/).
4. Run `npm start` to start the Hugo server at `localhost:1313`.
5. The server will automatically update as you make changes to the site.

### Hosting on Firebase

a.  Install Firebase CLI

Latest firebase CLI is not compatible with Node v12, install firebase-tools version 10 instead
  
  `npm install -g firebase-tools@10.9.2`

b. Initialize Firebase project

* Run `firebase init hosting`

* Choose `Create a new project` if you haven't had a project created on Firebase or `Choose an existing project` if you have a project set up

c. Follow firebase CLI to connect your project. 

```shell
=== Project Setup

First, let's associate this project directory with a Firebase project.
You can create multiple project aliases by running firebase use --add, 
but for now we'll just set up a default project.

? Please select an option: Use an existing project
? Select a default Firebase project for this directory: <project_name> (<project_name>)
i  Using project <project_name> (<project_name>)

=== Hosting Setup

Your public directory is the folder (relative to your project directory) that
will contain Hosting assets to be uploaded with firebase deploy. If you
have a build process for your assets, use your build's output directory.

? What do you want to use as your public directory? public
? Configure as a single-page app (rewrite all urls to /index.html)? Yes
? Set up automatic builds and deploys with GitHub? Yes
✔  Wrote public/index.html

i  Authorizing with GitHub to upload your service account to a GitHub repository's secrets store.

Waiting for authentication...

✔  Success! Logged into GitHub as <>

? For which GitHub repository would you like to set up a GitHub workflow? (format: user/repository) 

✔  Created service account github-action-583267528 with Firebase Hosting admin permissions.
✔  Uploaded service account JSON to GitHub as secret FIREBASE_SERVICE_ACCOUNT_
i  You can manage your secrets at https://github.com/<user>/<repo>/settings/secrets.

? Set up the workflow to run a build script before every deploy? Yes
? What script should be run before every deploy? npm start

✔  Created workflow file
? Set up automatic deployment to your site's live channel when a PR is merged? Yes
? What is the name of the GitHub branch associated with your site's live channel? (master)
```

## Usage

1. To make changes to the project, create your own repo with the source code
2. Create your own repo from the customized theme repo (https://github.com/anhhchu/portio-hugo)
3. Update the `submodule` section in the `.git/config` file as below example
  ```
  [core]
        repositoryformatversion = 0
        filemode = true
        bare = false
        logallrefupdates = true
        ignorecase = true
        precomposeunicode = true
  [remote "origin"]
          url = git@github.com:<your_github_account>/<your_repo>.git
          fetch = +refs/heads/*:refs/remotes/origin/*
  [branch "master"]
          remote = origin
          merge = refs/heads/master
  [submodule "themes/portio"]
          url = git@github.com:<your_github_account>/<your_customized_theme_repo>.git
          active = true
  ```
4. Copy config_template.toml to config.toml and modify it to personalize your site.
5. To upload your modifications to GitHub, execute sh deploy.sh "<your_git_commit_message>". This script will update all changes to the public repository with hugo -t portio, commit, and push your modifications to the master branch of your repository.
6. Feel free to tailor the website to your liking. Enjoy using it!
