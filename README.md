# Hugo portio test


## Development

`cd themes/blist/exampleSite/`

`hugo serve --themesDir ../..`

visit `http://localhost:1313/` to view site

1. Copy package.json and package-lock.json to the root folder of your the website
2. Run npm install to install required packages for theme
3. Run npm i -g postcss-cli to use PostCSS with Hugo build
4. Set theme = 'blist' in config.toml
5. Run npm start to start your local server


## Deploy options

[Deploy with Github pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

[Deploy with Netlify](https://gohugo.io/hosting-and-deployment/hosting-on-netlify/)

[Deploy with Vercel](https://vercel.com/guides/deploying-hugo-with-vercel)

When deploying to services like Netlify or Vercel, use the following command for building your site:

`npm i && HUGO_ENVIRONMENT=production hugo --gc`

### Deploy with Firebase

[Deploy with Firebase](https://gohugo.io/hosting-and-deployment/hosting-on-firebase/)

`npm install -g firebase-tools`

`firebase init`

`hugo && firebase deploy`

`firebase hosting:channel:deploy portio-preview3` 

Reinstall nvm for frebase: `nvm install 16.4.0`

