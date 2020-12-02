# [internet.science](internet.science)

Personal landing page / blog / cv

Built and deployed with:

- [next.js](https://nextjs.org/) for structuring the content
- [tailwind css](https://tailwindcss.com/) for styling the content
- [prismic](https://prismic.io/) for writing and managing the content
- [netlify](https://www.netlify.com/) for hosting the site

## Developing

Uses `netlify-cli` for local development. Run `yarn add netlify-cli`.

Then run `ntl dev` to get a local version of the site running

## Deploying

The site is rebuilt and deployed automatically on netlify whenever:

- there's a change to the content in prismic (Ideally, changes are bundled together into a release)
- there's a new commit to the master branch of this repo (new PRs will generate a build which is deployed to a preview URL)

As changes on either side are relatively infrequent compared to the build time, there's no problem with rebuilding the site from scratch on each change.
