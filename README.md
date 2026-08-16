# ColorThemeSuggestor

Pick a base color and a harmony rule, and get back a five-swatch palette with
hex codes ready to copy. Built with React and Vite, backed by
[The Color API](https://www.thecolorapi.com/).

Eight harmony rules are supported: monochrome, monochrome dark, monochrome
light, analogic, complement, analogic complement, triad, and quad.

## Features

- **Live palette generation** — change the base color or the harmony rule and
  the palette regenerates from the API.
- **Hex codes on every swatch** — displayed in uppercase, ready to paste into
  a stylesheet.
- **Race-free requests** — an `AbortController` cancels any in-flight request
  when the inputs change again, so a slow response can never overwrite a newer
  palette.
- **Honest failure states** — separate messages for loading, an empty
  selection, and an API error, rather than a blank screen.

## Tech stack

| Layer     | Tools                          |
| --------- | ------------------------------ |
| Framework | React 18                       |
| Build     | Vite 5                         |
| Styling   | Plain CSS, one file per component |
| Data      | The Color API (no key required) |

## Getting started

No API key or environment variables are needed — The Color API is open.

```bash
git clone https://github.com/AimenSajid/ColorThemeSuggestor.git
cd ColorThemeSuggestor
npm install
npm run dev
```

Open `http://localhost:5173`.

Other scripts:

```bash
npm run build     # production build to dist/
npm run preview   # serve the built output
npm run lint      # eslint, currently clean
```

## Project structure

```
index.html              Page shell and React mount point
src/
  main.jsx              React entry point
  App.jsx               State, the API request, and the effect that drives it
  Header.jsx            Color picker, theme dropdown, and submit button
  Header.css            Header styling and global body rules
  ColorDisplay.jsx      Renders the palette, plus loading/empty/error states
  ColorDisplay.css      Swatch grid styling
vite.config.js          Vite + React plugin
eslint.config.js        Lint rules
vercel.json             Deploy config — SPA rewrites
```

## How it works

`App.jsx` owns all the state: the base color, the selected harmony rule, the
returned colors, plus loading and error flags. A `useEffect` watches the color
and theme, and refetches whenever either changes.

`Header.jsx` keeps its own draft state for the two controls and only lifts it
up when the button is clicked, so moving the color picker doesn't fire a
request on every intermediate value.

`ColorDisplay.jsx` is presentational. It checks error, then loading, then
whether any colors exist, and only then renders the swatch grid.

### Two things worth knowing about the API

The Color API answers **HTTP 200 even for a malformed query** — asking for
`?hex=&mode=` returns a success status with no `colors` array at all. A plain
`response.ok` check is not enough, so the code also verifies that `data.colors`
is actually an array before rendering.

Requests are also aborted on cleanup. Because the effect depends on two pieces
of state, a fast sequence of changes can leave several requests in flight, and
without cancellation the last one to *arrive* wins rather than the last one
*requested*.

## Deploying to Vercel

This is a static frontend — no server, no environment variables.

1. Import the repository at [vercel.com/new](https://vercel.com/new).
2. Deploy. `vercel.json` handles the rest.

The included `vercel.json` rewrites all routes to `index.html` so that deep
links and refreshes work, which a single-page app needs on any static host.

## Credits

Built as a solo project. Color harmony data from
[The Color API](https://www.thecolorapi.com/). All application code written by
me.
