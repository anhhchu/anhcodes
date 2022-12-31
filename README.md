## anhcodes.dev Blog

### Deploy with Firebase

[Deploy with Firebase](https://gohugo.io/hosting-and-deployment/hosting-on-firebase/)

Reinstall nvm for frebase: `nvm install 16.4.0`

`npm install -g firebase-tools`

`firebase init`

Run `firebase hosting:channel:deploy <preview-number>` to preview the deploy before 

Run `sh git-deploy.sh "<commit message>"` to push the changes to git and deploy to firebase if github action is set up for CI/CD

Or run `hugo && firebase deploy` to manually deploy the changes 

[Use Custom Domain on Firebase](https://support.google.com/domains/answer/12081987?hl=en)

### Useful resources

[hugo shortcodes](https://gohugo.io/content-management/shortcodes/#readout)



