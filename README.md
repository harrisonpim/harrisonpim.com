# [technology.rip](technology.rip)

[![Netlify Status](https://api.netlify.com/api/v1/badges/d0515f06-3d98-4a50-9ecc-d74c635a27c0/deploy-status)](https://app.netlify.com/sites/happy-goldwasser-d738cd/deploys)

Personal landing page / blog / cv

Built and deployed with [Jamstack](https://jamstack.org/) principles in mind, using:

- [next.js](https://nextjs.org/) for structuring the content
- [tailwind css](https://tailwindcss.com/) for styling the content
- [prismic](https://prismic.io/) for writing and managing the content
- [netlify](https://www.netlify.com/) for hosting the site

## Developing

I use `netlify-cli` for local development. Run `yarn add netlify-cli -g` to install it.

Then run `ntl dev` to get a local version of the site running. Environment variables for prismic etc will be pulled directly from netlify, assuming you have the correct access permissions.

## Deploying

The site is rebuilt and deployed automatically by netlify whenever changes are detected in:

- the content in prismic (Ideally, changes are bundled together into a release)
- the master branch of this repo (new PRs will generate a build which is deployed to a preview URL)

As changes on either side are relatively infrequent compared to the build time, there's no problem with rebuilding the site from scratch on every change.
