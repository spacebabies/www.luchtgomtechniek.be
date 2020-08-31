# Install

```
sudo apt install hugo # usually older
sudo snap install hugo # usually newer
```

Or use a precompiled binary.

It's always easiest to keep the Hugo version the same everywhere.

# Run

```
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

# Deploy

Hosted on Netlify.

```
git push origin master
```
