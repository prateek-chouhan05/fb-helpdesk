# Facebook Helpdesk

This is a POC app. This app will allow clients to connect their fb accounts, listen to their messenger messages and reply to them within the application.

---

# Setting up your Messenger App

---

## Requirements

---

- **Facebook Page**: Will be used as the identity of your messaging experience. When people chat with your page. To create a new Page, visit <https://www.facebook.com/pages/create>.
- **Facebook Developer Account**: Required to create new apps, which are the core of any Facebook integration. You can create a new developer account by going to the [Facebook Developers website](https://developers.facebook.com/) and clicking the "Get Started" button.
- **Facebook App**: Contains the settings for your Messenger automation, including access tokens. To create a new app, visit your [app dashboard](https://developers.facebook.com/apps).

## Setup Steps

---

Before you begin, make sure you have completed all of the requirements listed above. At this point you should have a Page and a registered Facebook App.

### Get the App id and App Secret

- Go to your app Basic Settings, [Find your app here](https://developers.facebook.com/apps)
- Save the App ID number and the App Secret


### Prerequisites

- Install Node.js (https://nodejs.org/en/download/)
- Install NPM (https://www.npmjs.com/get-npm)
- Install Docker (https://docs.docker.com/get-docker/)

## Project Structure

---

```sh
├── backend             # Express backend with REST APIs
├── frontend            # Next.js frontend with Tailwind CSS
├── docker-compose.yml  # Database configuration
```

## Installation

---

**Clone this repository on your local machine:**

```bash
git clone https://github.com/prateek-chouhan05/fb-helpdesk.git
cd facebook-helpdesk
```

### Installing Dependencies

**Backend (inside `/backend`)**

```bash
cd backend
npm install
```

**Frontend (inside `/frontend`)**

```bash
cd frontend
npm install
```

### Setup Environment Variables

**Backend (inside `/backend`)**

```bash
cd backend
cp .env.example .env
```

**Frontend (inside `/frontend`)**

```bash
cd frontend
cp .env.example .env
```

### Running the Application Locally

**Backend (inside `/backend`)**

Open a new terminal and run the following command:

```bash
cd backend
npm run dev
```

You should now able to access the backend on [http://localhost:5000](http://localhost:5000)

**Frontend (inside `/frontend`)**

Open a new terminal and run the following command:

```bash
cd frontend
npm run dev
```

You should now able to access the frontend on [http://localhost:3000](http://localhost:3000)
