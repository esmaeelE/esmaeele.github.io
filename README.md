# EsmaeelE - DevOps Blog

Minimal DevOps blog built with Zola and Cela theme.

## Run Locally

```bash
npm ci
npm run build:css
zola serve
```

Visit http://127.0.0.1:1111

## Structure

```
content/
├── blog/       # Tutorials and guides
├── notes/      # Quick references and cheatsheets
└── pages/      # About page
```

## Deploy

Auto-deploys to GitHub Pages on push to `main`.
