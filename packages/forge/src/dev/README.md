# Tyler Forge™ Dev Website

This is the development website for building, testing, and maintaining Tyler Forge™ Web
Components. This site is not intended to be deployed anywhere, it is used for local
development for maintainers of the project as a quick and easy way to get up and running.

## Development

The site is built and served via [Vite](https://vitejs.dev/). It is an intentionally
simple multi-page website comprised of standard TypeScript, Sass, and HTML files.

```bash
pnpm run dev:forge
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

### Partials

The dev site is comprised of various EJS partial templates that are used to construct each page.
These partials can receive a data object to provide dynamic values depending on the context
of the page.

Each page makes use of the `src/partials/page.ejs` partial. This template can receive the following
data:

```javascript
// All variables are provided underneath the `page` object
page: {
  title: 'Page title', // (Optional) This is the title text you see in the browser tab, app-bar title, and content card header
  includePath: './pages/autocomplete/autocomplete.ejs', // (Required) The path to the partial file to include within the card content
  options: [] // (optional) An array of control configurations to render within the options drawer
}
```

#### Options

Options can be provided to each page in the form of:

```javascript
{
  type: '', // Can be one of "text-field", "select", "checkbox", "radio-group", "toggle" (see `src/partials/controls` for more info)
  inputType: 'number', // Only applies to the "text-field" type
  label: '', // The label text to display
  id: '', // The control id to set so that it can easily be identified by the page
  defaultValue: "" // The default value to set the control to (depends on the type of control being provided)
},
```
