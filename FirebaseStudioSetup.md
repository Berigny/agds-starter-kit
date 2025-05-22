# 🚀 Deploy AgDS Starter Kit to Firebase Hosting + Storybook + GitHub Actions CI/CD

This guide provides step-by-step instructions to set up the [AgDS Starter Kit](https://github.com/Berigny/agds-starter-kit), deploy it to Firebase Hosting, run Storybook locally, and configure GitHub Actions for continuous deployment.

---

## Phase 1: Environment Setup (Manual)

These steps are prerequisites for working with the project and require manual installation on your system.

### ✅ Step 1.1: Install Node.js and Yarn

Ensure you have Node.js and Yarn installed on your machine. Refer to their official documentation for installation instructions:

- [Node.js Installation](https://nodejs.org/)
- [Yarn Installation](https://yarnpkg.com/)

### ✅ Step 1.2: Install Firebase CLI

Install the Firebase Command Line Interface globally. This step is AI Assisted.



npm install -g firebase-tools

### ✅ Step 1.3: Create Firebase Project

Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/). You will need the project ID for later steps.

---

## Phase 2: Project Setup (Manual & AI Assisted)

This phase involves getting the project ready in your local environment.

### ✅ Step 2.1 (Manual): Clone and Navigate

Clone the `agds-starter-kit` repository and navigate to the project's root directory in your terminal.


git clone https://github.com/your-username/agds-starter-kit.git cd agds-starter-kit

### ✅ Step 2.2 (AI Assisted - `yarn setup`)

Install project dependencies and build the application. You can request the AI assistant to run this command.


yarn setup

*AI Assistant Command: Request the assistant to run `yarn setup`.*

### ✅ Step 2.3 (Manual): Configure Next.js for Static Export

Verify that `next.config.js` is configured for static export. The provided starter kit should already have this configured:


js /** @type {import('next').NextConfig} */ const nextConfig = { reactStrictMode: true, swcMinify: true, output: 'export', // Enables static HTML export };

module.exports = nextConfig;

### ✅ Step 2.4 (Manual/AI Assisted - `firebase init`)

Initialize Firebase Hosting for your project. This is an interactive process.


firebase init

*AI Assisted Option: Request the assistant to run `firebase init`. Be prepared to provide input when prompted in the terminal.* Remember the AI assistant can only input text, not make selections.

**When prompted during `firebase init`:**

- Select **Hosting**
- Choose **Use existing project** and pick your Firebase project
- Set **public directory** to `out`
- Choose **No** to "Configure as a single-page app"
- Choose **No** to automatic builds and deploys

---

## Phase 3: Deployment (Manual & AI Assisted)

Deploy your built application to Firebase Hosting.

### ✅ Step 3.1 (Manual/AI Assisted - `firebase login:ci`)

Obtain a Firebase CI token. This token is used for manual deployments in non-interactive environments.


firebase login:ci

*AI Assisted Option: Request the assistant to run `firebase login:ci`. Follow the instructions in the terminal to authorize the token in your browser and then provide the token to the assistant.* Remember the AI assistant can only input text, not make selections or open browsers.

### ✅ Step 3.2 (AI Assisted - `yarn deploy`)

Deploy the application using the `deploy` script.

For **manual deployments** requiring a token (e.g., in a CI environment where you haven't set up a service account yet), run the script and provide the token:


yarn deploy --token "YOUR_CI_TOKEN"

*AI Assisted Command: Request the assistant to run `yarn deploy --token "YOUR_CI_TOKEN"`. Replace "YOUR_CI_TOKEN" with the token obtained in Step 3.1.*

For **automated deployments** with GitHub Actions, a Firebase Service Account Key is used (see Phase 5).

Upon successful deployment, you’ll get a live URL like:


https://your-project-id.web.app

---

## Phase 4: Storybook (AI Assisted)

Run Storybook locally to develop and test your UI components in isolation.

### ✅ Step 4.1 (AI Assisted - `yarn storybook`)

Start the Storybook server.


yarn storybook

*AI Assisted Command: Request the assistant to run `yarn storybook`. Note that this is a long-running task.*

Then open your browser to:


http://localhost:6006/

> 💡 Note: In remote environments (like GitHub Codespaces or cloud IDEs), this URL might redirect to a network address. Always check the terminal output.

---

## Phase 5: Automated CI/CD with GitHub Actions (Manual & AI Assisted)

Automate the build and deployment process whenever you push changes to your `main` branch using GitHub Actions and a Firebase Service Account for secure authentication.

### ✅ Step 5.1 (Manual): Create the Workflow File

Create the GitHub Actions workflow file and paste the provided content. Make sure to replace `your-firebase-project-id` with your actual Firebase project ID.


mkdir -p .github/workflows touch .github/workflows/firebase_hosting_deploy.yml

Paste this content into `.github/workflows/firebase_hosting_deploy.yml`:


yaml name: Deploy to Firebase Hosting

on: push: branches: - main

jobs: deploy: name: Build & Deploy to Firebase runs-on: ubuntu-latest

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
      projectId: your-firebase-project-id # Remember to replace with your Firebase project ID


### ✅ Step 5.2 (Manual): Obtain Firebase Service Account Key

Obtain a JSON service account key from the Google Cloud Console with the **Firebase Hosting Admin** role.

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **IAM & Admin > Service Accounts**
3. Create or select a service account with the **Firebase Hosting Admin** role.
4. Create and download a JSON key for the service account.

### ✅ Step 5.3 (Manual): Add Service Account to GitHub Secrets

Add the content of the downloaded JSON service account key as a secret in your GitHub repository. The secret name should be `FIREBASE_SERVICE_ACCOUNT_AGDS_460306`.

In your GitHub repo, go to **Settings → Secrets and variables → Actions** and click **"New repository secret"**.

### ✅ Step 5.4 (AI Assisted - Git commands)

Commit the changes to your workflow file and push them to your `main` branch to trigger the GitHub Actions workflow.

*AI Assisted Command: Request the assistant to run `git add .`, `git commit -m "Your commit message"`, and `git push origin main`.*

### ✅ Step 5.5 (Manual): Monitor Deployment

Check the **Actions** tab in your GitHub repository (e.g., `https://github.com/your-username/your-repo-name/actions`) to see your build and deploy progress.

---

## ✅ Summary

A summary of the features configured:

| Feature                     | Status         |
|----------------------------|----------------|
| Firebase Hosting Setup     | ✅ Completed   |
| Static Site Export         | ✅ Enabled     |
| Storybook Setup            | ✅ Local Only  |
| GitHub Actions CI/CD       | ✅ Configured  |
| Service Account for Deploy | ✅ Linked via Secret |

You're ready to build, deploy, and maintain a robust UI application with the AgDS Starter Kit 🚀

---