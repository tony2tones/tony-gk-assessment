## GK test Assessment

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Prerequisites

before you start make sure you have the following installed:
- Node.js (LTS version recommended)
- Firebase account and project setup

## Getting Started with Firebase

before installing node_modules be sure to add your firebase configuration from firebase, this will setup the particular api keys needed to view and edit users

login to [firebase](https://console.firebase.google.com/) and navigate to your project settings:
You should use the following format in your .env.local

```
NEXT_PUBLIC_API_KEY=FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID=FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID=FIREBASE_MESSAGE_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=1:FIREBASE_APP_ID

```

## Install dependencies
First, run the development server:

```bash
npm run install
npm run dev // ro run the project
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Test Accounts

You can login with a number of accounts:
  - email: tony@email.com
  - email: tony@tones.com
  - email: toasty@toast.com
  - password: 123123

## Run tests

```bash
npm run test
```

## Trouble shooting

### Firebase setup
If you're having issues with Firebase setup, double-check your .env.local configuration and ensure your Firebase project is correctly set up.

### TailwindCSS Issue (Hot-reloading)
If you encounter issues with TailwindCSS styles resetting when opening the dev tools, it may be related to hot-reloading. Try disabling hot reloading temporarily to see if the issue persists.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!


