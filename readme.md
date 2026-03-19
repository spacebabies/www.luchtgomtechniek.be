# Luchtgomtechniek.be

[![Netlify Status](https://api.netlify.com/api/v1/badges/e1d5e1a9-e4c5-415f-8c53-7beaa6b60cf9/deploy-status)](https://app.netlify.com/sites/luchtgomtechniek/deploys)

This is the source code for the static website of Luchtgomtechniek, built with [Hugo](https://gohugo.io/).

## Prerequisites

This project uses SCSS which is compiled by Hugo's internal pipes. Because of this, you **must** use the **Hugo Extended** version. Standard Hugo will fail to compile the stylesheets.

### Using `asdf` (Recommended)

This project contains a `.tool-versions` file that specifies the exact version of Hugo required. Using a version manager like `asdf` is highly recommended to ensure everyone uses the same environment.

1. Install [asdf](https://asdf-vm.com/).
2. Add the Hugo plugin:
   ```bash
   asdf plugin-add hugo
   ```
3. Install the required version defined in the `.tool-versions` file:
   ```bash
   asdf install
   ```
*(Note: The `.tool-versions` file explicitly targets the `extended` version, e.g., `hugo extended_0.121.2`)*

### Without `asdf`

If you are not using `asdf`, make sure you install **Hugo Extended version 0.121.2** (or higher).

- **Fedora/RHEL:** `sudo dnf install hugo` (installs extended by default)
- **Ubuntu/Debian:** The `apt` version is often standard and outdated. Download the extended `.deb` or `.tar.gz` from the [Hugo GitHub Releases](https://github.com/gohugoio/hugo/releases).
- **macOS (Homebrew):** `brew install hugo` (installs extended by default)

## Setup & Development

First, install the Node dependencies (used for some frontend assets/tooling):

```bash
npm install
```

Start the development server with drafts enabled:

```bash
hugo server -D
```

You can now view the site at `http://localhost:1313`.

## Building for Production

To build the static HTML into the `public` directory:

```bash
hugo --gc --minify
```

## Content Management

To add a new section to the homepage:
```bash
hugo new homepage/my-new-content.md
```

To create a standard page:
```bash
hugo new my-new-page.md
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
