## anhcodes.dev Blog

### Deploy with Firebase

[Deploy with Firebase](https://gohugo.io/hosting-and-deployment/hosting-on-firebase/)

Install nvm on Mac:

```shell
brew install nvm
export NVM_DIR="$HOME/.nvm"
[ -s "/usr/local/opt/nvm/nvm.sh" ] && \. "/usr/local/opt/nvm/nvm.sh"  # This loads nvm
[ -s "/usr/local/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/usr/local/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion
```

Reinstall nvm for frebase: 
`nvm install 16.4.0`

`npm install -g firebase-tools`

`firebase init`

Run `firebase hosting:channel:deploy <preview-number>` to preview the deploy before 

Run `sh git-deploy.sh "<commit message>"` to push the changes to git and deploy to firebase if github action is set up for CI/CD

Or run `hugo && firebase deploy` to manually deploy the changes 

[Use Custom Domain on Firebase](https://support.google.com/domains/answer/12081987?hl=en)

### Useful resources

[hugo shortcodes](https://gohugo.io/content-management/shortcodes/#readout)

[photos gallery](https://github.com/tbiering/hugo-slider-shortcode)

[Convert tables to markdown](https://tabletomarkdown.com/convert-spreadsheet-to-markdown/)

[icons8](https://icons8.com/icons/)


#### Color Palette

[color-hex](https://www.color-hex.com/color/d5a6bd#color-schemes)

[you make me nervous Color Palette](https://www.color-hex.com/color-palette/1020936)

#### Syntax Highlight

https://gohugo.io/content-management/syntax-highlighting/#generate-syntax-highlighter-css

#### Set Env variables for Hugo

[Configure Hugo env variables](https://gohugo.io/getting-started/configuration/#configuration-environment-variables)

#### Search in Hugo

[search with algolia](https://forestry.io/blog/search-with-algolia-in-hugo/)

[site search jamstack hugo algolia](https://www.bennet.org/blog/site-search-jamstack-hugo-algolia/)

 `ALGOLIA_APP_ID={{ YOUR_APP_ID }} ALGOLIA_ADMIN_KEY={{ YOUR_ADMIN_KEY }} ALGOLIA_INDEX_NAME={{ YOUR_INDEX NAME }} ALGOLIA_INDEX_FILE={{ PATH/TO/algolia.json }} npm run algolia`

[Google Programmable Search](https://programmablesearchengine.google.com/controlpanel/all)
