# Zoom My Life

Zoom My Life is a comprehensive family health management application built with Next.js and Firebase. It allows users to easily manage health information for family members, including appointments, lab reports, and medications.

## Features

- User authentication with Firebase
- Dashboard to view all family members
- Detailed view for each family member's health information
- Add and manage appointments
- Track lab reports
- Manage medications
- Responsive design for desktop and mobile devices
- Dark mode support

## Tech Stack

- Frontend: Next.js 15.0.0, React 18.2.0
- Styling: Tailwind CSS 3.3.3
- Authentication: Firebase Authentication
- Database: Firebase Firestore
- Hosting: Firebase Hosting
- UI Components: Custom components built with Radix UI primitives

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm or yarn
- A Firebase account and project

## Installation

1. Clone the repository:


## Deployment



## CI/CD with Firebase Hosting

This project is set up for continuous integration and deployment (CI/CD) using GitHub Actions and Firebase Hosting. Here's how it works:

1. Push your changes to the `main` branch on GitHub.
2. GitHub Actions will automatically trigger a workflow that:
    - Installs dependencies
    - Runs tests (if configured)
    - Builds the project
    - Deploys to Firebase Hosting

To set up CI/CD for your project:

1. In your GitHub repository, go to Settings > Secrets and add the following secrets:
    - `FIREBASE_SERVICE_ACCOUNT`: Your Firebase service account key (JSON format)
    - `FIREBASE_PROJECT_ID`: Your Firebase project ID

2. Create a `.github/workflows/firebase-hosting-merge.yml` file in your project with the following content:

   \`\`\`yaml
   name: Deploy to Firebase Hosting on merge
   'on':
   push:
   branches:
   - main
   jobs:
   build_and_deploy:
   runs-on: ubuntu-latest
   steps:
   - uses: actions/checkout@v3
   - run: npm ci && npm run build
   - uses: FirebaseExtended/action-hosting-deploy@v0
   with:
   repoToken: '${{ secrets.GITHUB_TOKEN }}'
   firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
   channelId: live
   projectId: '${{ secrets.FIREBASE_PROJECT_ID }}'
   \`\`\`

3. Commit and push this file to your repository.

Now, every time you push to the `main` branch, your project will be automatically deployed to Firebase Hosting.

