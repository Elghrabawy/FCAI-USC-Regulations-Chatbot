# FCAI USC Regulations Chatbot

FCAI USC Regulations Chatbot is a bilingual (Arabic / English) assistant built with Next.js and Tailwind CSS that helps answer questions about the Faculty of Computers & AI regulations.

## Description

This project provides a conversational UI that queries a remote model API and displays answers with sources. It supports chat history, language toggle (Arabic/English), and dark mode.

## Base URL / Deployment

You can set a base path for the application (useful when deploying to a subpath) using the environment variable `NEXT_PUBLIC_BASE_PATH`. If you're serving static assets from a CDN, set `NEXT_PUBLIC_ASSET_PREFIX`.

Examples (Windows `cmd.exe`):

```cmd
set NEXT_PUBLIC_BASE_PATH=/my-app
set NEXT_PUBLIC_ASSET_PREFIX=https://cdn.example.com/my-app
npm run build
npm run start
```

In `next.config.ts` these values are read and applied to `basePath` and `assetPrefix` so the app will work correctly behind a subpath.

## Local Development

Install dependencies and run the dev server:

```cmd
npm install
npm run dev
```

Open `http://localhost:3000`.

## Project metadata

- `package.json` now includes `description` and `homepage` values.
- `next.config.ts` reads `NEXT_PUBLIC_BASE_PATH` and `NEXT_PUBLIC_ASSET_PREFIX`.

## Contributing

If you want to restore the original neutral color scheme or change the theme, edit `app/globals.css` variables under `:root` and `.dark`.

## License

This project uses the original author's licensing; check repository for license details.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
