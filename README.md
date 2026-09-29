# Luchtgomtechniek.be

[![Netlify Status](https://api.netlify.com/api/v1/badges/e1d5e1a9-e4c5-415f-8c53-7beaa6b60cf9/deploy-status)](https://app.netlify.com/sites/luchtgomtechniek/deploys)

This is the source code for the static website of Luchtgomtechniek, built with [Hugo](https://gohugo.io/). It is a single pager: content is pulled from various places, but ultimately everything ends up on the homepage. (We do have a `single.html`, but it's there to suppress Hugo warnings.)

## Architecture

- **Content Structure:** Uses *headless bundles*. The section order is explicitly defined in `layouts/index.html`.
- **JavaScript Modernization:** The entire JS stack is **ES2020 modules**. Scripts are modularly loaded via Hugo's internal pipes (`assets/js/`).
- **Maps & Portfolio:** The portfolio aka Realisaties is progressively enhanced, starting from a simple list without JS and a Leaflet map with pins when JS is available.
- **Privacy & Socials:** Only GDPR-friendly socials are allowed, fetching data from `data/insta-grid.yml` instead of using external scripts.
- **Tooling:** Hugo Extended is strictly required for SCSS compilation.

## CARTO basemap configuration

The public CARTO browser API key is stored in `assets/js/config/carto.js` and
bundled into the site's JavaScript. Update it there when rotating the key.
If website restrictions are enabled in the CARTO dashboard, allow both
`luchtgomtechniek.be` and `www.luchtgomtechniek.be`. Local development needs a
separate localhost key when the production key is restricted.

The map uses Leaflet with Positron raster tiles. CARTO recommends vector
basemaps, but continues to support and update raster tiles. We retain raster
to preserve the existing rendering, CSS color filter, and Leaflet behavior
without adding a WebGL renderer. The vector equivalent is `positron-gl-style`;
a future migration should verify browser support, styling, and interactions.
See the [CARTO basemap FAQ](https://docs.carto.com/faqs/carto-basemaps).

## Prerequisites

This project uses SCSS which is compiled by Hugo's internal pipes. Because of this, you **must** use the **Hugo Extended** version. Standard Hugo will fail to compile the stylesheets.

Install [mise](https://mise.jdx.dev/getting-started.html), then run:

```bash
mise install
```

We use mise locally and on Netlify because Netlify's Aqua backend does not
understand asdf's `extended_` prefix. `mise.toml` is the single Hugo version source.

## Setup & Development

First, install the Node dependencies (used for some frontend assets/tooling):

```bash
npm install
```

Start the development server with drafts enabled:

```bash
mise exec -- hugo server -D
```

You can now view the site at `http://localhost:1313`.

## Content Strategy

*This section is in Dutch to reflect the content language.*

De tekst moet klinken als iemand die het werk echt doet. Zinnen over korrel 1200, stofontwikkeling, asbestattest, risico op ruwere oppervlakken, beperkingen bij beuken trappen of beton, temperatuur boven 10°C en parkeerverbodsborden, dat is geen bureaubladproza maar werfrealiteit. Dat maakt de site geloofwaardig. Vergeleken met een aantal Belgische sectorgenoten is deze site ook veel rijker aan bewijs en veel concreter in zijn voorbeelden.

De tekst bevat bewust soms Kapitalen op plekken die Misschien Niet Logisch overkomen. Hou ze. Deze teksten komen direct van de eigenaar en geven de site juist een realistisch karakter.

De content wordt altijd eerst in het Nederlands (Vlaams!) opgezet, en heeft daarna een vertaalslag naar het Frans (Waals!!) nodig. Hou dezelfde toon aan in de vertalingen. Onthoud dat de primaire doelgroep Belgisch en Nederlands Limburgers en Walen is (provincie Liège).

## Building for Production

To build the static HTML into the `public` directory:

```bash
mise exec -- npm run build
```

### Media Optimization

It is recommended to fix image orientation and optimize file sizes before committing new images. Some helpful commands:

```bash
# Fix orientation
find content -type f -iname "*.jpg" -exec exiftran -ai {} \;

# Optimize JPEGs
find content -type f -iname "*.jpg" -exec jpegoptim --strip-all --max=85 {} \;
```

## CSS Breakpoints

For styling reference, these are the primary breakpoints used:
1. `450px`
2. `900px`
3. `1200px`

## Deployment

The site is automatically deployed via Netlify. Simply push your changes to the default branch to trigger a new build.

```bash
git push origin master
```
