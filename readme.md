# Install

```
sudo apt install hugo # usually older
sudo snap install hugo # usually newer
```

Or use a precompiled binary.

It's always easiest to keep the Hugo version the same everywhere.

# Run

```
yarn install # packages via npm
hugo server -D # development webwerver
hugo --gc --minify # build the public folder
```

# New content

You can add a new section to the homepage via running

```
hugo new homepage/my-new-content.md
```

To create a page separate from the homepage, run

```
hugo new my-new-page.md
```

## CSS breakpoints

1. mobile < 500px
2. 500px < tablet < 1130px
3. 1130px > desktop

# Deploy

Hosted on Netlify.

```
git push origin master
```
