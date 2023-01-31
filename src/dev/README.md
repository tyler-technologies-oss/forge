# Tyler Forge™ Dev Website

This is the development website for building, testing, and maintaining Tyler Forge™ Web
Components. This site is not intended to be deployed anywhere, it is used for local
development for maintainers of the project as a quick and easy way to get up and running.

## Development

The site is built and served via [Vite](https://vitejs.dev/). It is an intentionally
simple multi-page website comprised of standard TypeScript, Sass, and HTML files.

```bash
npm run dev
```

## EJS

We EJS for templating purposes to make maintenance easier across all pages. For more
information about EJS, see [here](https://ejs.co/).

EJS allows for us to avoid duplicating common HTML elements across all pages since we have
a separate HTML page for developing and testing each component in isolation.

Why not use Storybook for development you ask? While yes, we also do have a Storybook website
within this repository that is used for public component documentation, it is not an ideal
local development tool. It takes longer to build, and HMR at the time of writing is not as
quick as we'd like it. We also don't want new developers to necessarily have to know how to
build with React to start developing. This site provides a much lower barrier to entry and is
built for speed.
