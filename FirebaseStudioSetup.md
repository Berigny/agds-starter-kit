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

*This step is now part of the `yarn setup` script, but you can run it individually if needed.*
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

## ✅ Step 3: Setup and Build the Application

This step installs dependencies and generates a static export in the `out/` directory using the `setup` script in `package.json`.
```
bash
yarn setup
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

Deploy the application to Firebase Hosting using the `deploy` script in `package.json`.

For **manual deployments**, use the script with your Firebase CI token:
```
bash
yarn deploy
```
> 💡 **Note:** Replace `"YOUR_CI_TOKEN"` in the `deploy` script within `package.json` with your actual Firebase CI token obtained by running `firebase login:ci`.

For **automated deployments** with GitHub Actions, a Firebase Service Account Key is used (see Step 7).

Upon successful deployment, you’ll get a live URL like:
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

To automate the build and deployment process whenever you push changes to your `main` branch, we will set up a GitHub Actions workflow that uses a Firebase Service Account for authentication.

### ✅ Create the Workflow File

From your terminal:
```
bash
mkdir -p .github/workflows
touch .github/workflows/firebase_hosting_deploy.yml
```
Paste this into `.github/workflows/firebase_hosting_deploy.yml`. This workflow uses the `yarn build` script you configured and deploys using the `FirebaseExtended/action-hosting-deploy` action, authenticating with a Firebase Service Account secret you will add to your GitHub repository.
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
        run: yarn build # Uses the 'build' script which includes 'next export'

      - name: Deploy to Firebase Hosting
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT_AGDS_460306 }}' # Authenticates with the service account secret
          channelId: live
          projectId: your-firebase-project-id # Remember to replace with your Firebase project ID
```
---

### ✅ Obtain Firebase Service Account Key

To allow GitHub Actions to deploy to your Firebase project, you need to create a service account with the necessary permissions and obtain its key.

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **IAM & Admin > Service Accounts**
3. Create or select a service account with the **Firebase Hosting Admin** role. This role grants permissions to deploy to Firebase Hosting.
4. Click on the service account, then click **\"Keys\"** and **\"Add Key\"** → **\"Create New Key\"** → Choose **JSON** as the key type.
5. Click **\"Create\"**. This will download a JSON file containing your service account key.

---

### ✅ Add Service Account to GitHub Secrets

To securely use your service account key in the GitHub Actions workflow, you will add it as a secret in your GitHub repository. The workflow file is configured to use a secret named `FIREBASE_SERVICE_ACCOUNT_AGDS_460306`.

In your GitHub repo:

1. Go to **Settings → Secrets and variables → Actions**
2. Click **\"New repository secret\"**
   - Name: `FIREBASE_SERVICE_ACCOUNT_AGDS_460306`
   - Value: *(Open the downloaded JSON key file and paste the entire content here)*

---

### ✅ Commit & Push

Commit the changes to your workflow file and push them to your `main` branch:
```
bash
git add .github/workflows/firebase_hosting_deploy.yml
git commit -m "Add Firebase CI/CD workflow"
git push origin main
```
This push will trigger the GitHub Actions workflow.

---

### ✅ Monitor Deployment

Check the **Actions** tab in your GitHub repository to see your build and deploy progress. If the workflow runs successfully, your application will be deployed to Firebase Hosting.

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