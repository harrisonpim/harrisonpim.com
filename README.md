# :wave: [harrisonpim.com](https://harrisonpim.com/)

Personal landing page / blog / cv

Built and deployed with [jamstack](https://jamstack.org/) principles in mind, using:

- [next.js](https://nextjs.org/) and [typescript](https://www.typescriptlang.org/) for structuring the content
- [tailwind css](https://tailwindcss.com/) for styling the content
- [prismic](https://prismic.io/) for writing and managing the content
- [vercel](https://vercel.com/) for deploying and hosting the site

## Developing

- Clone this repo
- Run `yarn` to install dependencies.
- Run `yarn env` to link your local repo to the project on vercel and populate a local `.env` file with dev versions of all of the project's secrets.
- Finally, run `yarn dev` to get a local version of the site running.

## Deploying

The site is rebuilt and deployed automatically by vercel whenever changes are detected in:

- the content in prismic (Ideally, changes are bundled together into a release)
- the master branch of this repo (new PRs will generate a build which is deployed to a preview URL)

As changes on either side are relatively infrequent compared to the build time, there's no problem with rebuilding the site from scratch on every change.
