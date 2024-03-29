# murty.au

## Summary

This repository contains the website for the [Murty family](https://murty.au/), which has been built with [Deno](https://deno.land/) and [Lume](https://lumeland.github.io/).

I've also used fonts that I've purchased from [Mass-Driver](https://mass-driver.com/), and the free icon pack from [Font Awesome](https://fontawesome.com/).

![Screenshot of main index page](docs/assets/website-preview.png)

## Initial Setup

To setup a new local development environment:

1. Fork this repository
2. Make a local clone of that forked repository
3. Update some files in the forked repository:

- The `bin/deploy` script must be updated to use your forked repository URLs when updating `CHANGELOG.md`
- The `bin/deploy` script must be updated to use your own Deno Deploy project name in the `deployctl` line
- All files in the `content` directory should contain your own content instead
- All files in the `assets` directory should contain your own static files instead
- Purchase your own license to use [Mass-Driver](https://mass-driver.com/) fonts or use other fonts

4. Commit and push all of these changes to your forked repository
5. Setup your [Deno Deploy](https://deno.com/deploy) account:

- Consider subscribing to the Deno Deploy Pro account based on your usage needs
- Create a new Deno Deploy project for this site
- Add your production domain(s) via `Settings > Domains`

5. Install [Deno](https://deno.land/)
6. Run [bin/setup](bin/setup) to complete the initial installation process: `bin/setup`
7. Update your `.env` file:

- `FATHOM_ANALYTICS_SITE_ID`: The related Site ID from your [Fathom Analytics](https://usefathom.com/) account
- `LASTFM_API_KEY`: Your [Last.fm API key](https://www.last.fm/api/account/create) to show your loved tracks on the site

8. Create a new system environment variable named `DENO_DEPLOY_TOKEN` by following [their documentation](https://deno.com/deploy/docs/deployctl)
9. Edit `deno.jsonc`: Remove the `deploy.project` value, on your first deploy this will be set to your own project ID
10. Edit `bin/deploy`: Edit the `deployctl` command to use your own Deno project name
11. Install [exiftool](https://exiftool.org/) on your local machine
12. **Optional:** Install [VS Code](https://code.visualstudio.com/) and the recommended plugins:

- [Deno](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Commands

### Run Tests

Run [bin/test](bin/test):

```
bin/test
```

### Local Web Server

Run [bin/serve](bin/serve):

```
bin/serve
```

### Build Site

Run [bin/build](bin/build):

```
bin/build
```

### Deployment

After testing locally, commit and push your changes up to your remote forked repository.

Then run [bin/deploy](bin/deploy) to make a new version and deploy it:

```
bin/deploy YYYY.xxx
```

Where `YYYY` is the current year, and `xxx` is the revision number for that year.

This script will:

- Update the content in [CHANGELOG.md](CHANGELOG.md)
- Create a new Git Tag (`YYYY.xxx` as detailed above)
- Push changes up to the origin repository
- Build the site
- Deploy the site to Deno Deploy as a production deployment
