# 🚀 Deploy AgDS Starter Kit to Firebase Hosting + Storybook + GitHub Actions CI/CD

This guide provides step-by-step instructions to set up the [AgDS Starter Kit](https://github.com/Berigny/agds-starter-kit), deploy it to Firebase Hosting, run Storybook locally, and configure GitHub Actions for continuous deployment.

---

## 🧱 Prerequisites

Before you start, ensure:

- ✅ Node.js and Yarn are installed
- ✅ Firebase CLI is installed
```
bash
  npm install -g firebase-tools
  
```
- ✅ You have a Firebase project created in [Firebase Console](https://console.firebase.google.com/)
- ✅ You are in the root directory of the `agds-starter-kit` project

---

## ✅ Step 1: Install Dependencies
```
bash
yarn install
```
---

## ✅ Step 2: Configure Next.js for Static Export

Edit `next.config.js`:
```
js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export', // Enables static HTML export
};

module.exports = nextConfig;
```
---

## ✅ Step 3: Build the Application

Generates a static export in the `out/` directory:
```
bash
yarn build
```
---

## ✅ Step 4: Initialize Firebase Hosting
```
bash
firebase init
```
**When prompted:**

- Select **Hosting**
- Choose **Use existing project** and pick your Firebase project
- Set **public directory** to `out`
- Choose **No** to "Configure as a single-page app"
- Choose **No** to automatic builds and deploys

---

## ✅ Step 5: Deploy to Firebase Hosting
```
bash
firebase deploy
```
You’ll get a live URL like:
```
https://your-project-id.web.app
```
---

## ✅ Step 6: Run Storybook Locally

Ensure Storybook dependencies are installed (they are by default in AgDS Starter Kit).

Start the Storybook server:
```
bash
yarn storybook
```
Then open your browser to:
```
http://localhost:6006/
```
> 💡 Note: In remote environments (like GitHub Codespaces or cloud IDEs), this URL might redirect to a network address. Always check the terminal output.

---

## ⚙️ Step 7: GitHub Actions for CI/CD (Firebase Hosting)

### ✅ Create the Workflow File

From your terminal:
```
bash
mkdir -p .github/workflows
touch .github/workflows/firebase_hosting_deploy.yml
```
Paste this into `firebase_hosting_deploy.yml`:
```
yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches:
      - main

jobs:
  deploy:
    name: Build & Deploy to Firebase
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install Dependencies
        run: yarn install

      - name: Build Project
        run: yarn build

      - name: Deploy to Firebase Hosting
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT_AGDS_460306 }}'
          channelId: live
          projectId: your-firebase-project-id
```
---

### ✅ Obtain Firebase Service Account Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **IAM & Admin > Service Accounts**
3. Create or select a service account with **Firebase Hosting Admin** role
4. Click **"Create Key"** → Choose **JSON**
5. Download the key

---

### ✅ Add Service Account to GitHub Secrets

In your GitHub repo:

1. Go to **Settings → Secrets → Actions**
2. Click **"New repository secret"**
   - Name: `FIREBASE_SERVICE_ACCOUNT_AGDS_460306`
   - Value: *(Paste the full JSON content from your downloaded key)*

---

### ✅ Commit & Push

Push your changes to `main`:
```
bash
git add .
git commit -m "Add Firebase CI/CD workflow"
git push origin main
```
---

### ✅ Monitor Deployment

Check the **Actions** tab in your GitHub repository to see your build and deploy progress.

---

## ✅ Summary

| Feature                     | Status         |
|----------------------------|----------------|
| Firebase Hosting Setup     | ✅ Completed   |
| Static Site Export         | ✅ Enabled     |
| Storybook Setup            | ✅ Local Only  |
| GitHub Actions CI/CD       | ✅ Configured  |
| Service Account for Deploy | ✅ Linked via Secret |

You're ready to build, deploy, and maintain a robust UI application with the AgDS Starter Kit 🚀

---