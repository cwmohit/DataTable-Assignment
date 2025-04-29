This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:
### A typical top-level directory layout
    .
    ├── ...
    ├── /src                  
    │   ├── /components 
    │   │   ├──DataTable.js        # Main table component with logic for CRUD, sorting, filtering, and ├──pagination
    │   │     ├──ModalForm.js        # Modal for creating or editing users
    │   │     ├──ConfirmDialog.js    # Modal for confirming delete action
    │   │     ├──TableToolbar.js     # Toolbar for search and visibility toggle of columns
    ├── /pages         
    │   ├── index.js  
    ├── /lib         
    │   ├──apiService.js       # API service for fetching data, handling requests
    ├── data                # JSON server Data
    │   ├──db.json
    └── ...

### View: [DEMO](https://github.com/user-attachments/assets/3095c0cf-702c-4919-ba2b-2581c41cdb54)


1. Clone the repository:

   ```bash
   git clone https://github.com/cwmohit/DataTable-Assignment.git
   cd DataTable-Assignment
  
```bash
npm install
npm run dev

# To run json-server
npx json-server --watch data/db.json --port 3001
```

https://github.com/user-attachments/assets/3095c0cf-702c-4919-ba2b-2581c41cdb54

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

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
