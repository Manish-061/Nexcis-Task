# 🔐 Next.js Google Authentication with Firebase

This project demonstrates a complete implementation of **Google Authentication** in a **Next.js 13+ App Router** application using **Firebase Authentication** and **React Context API**.

It provides a clean authentication flow with real-time user state management, modular architecture, and modern UI using **Material UI (MUI)**.

---

## 🧰 Tech Stack

- **Next.js 13+** (App Router, Server Components)
- **Firebase Authentication**
- **React Context API**
- **Material UI v5**
- **TypeScript**

---

## ✅ Features

- Google Sign-In via Firebase Auth
- Persistent user session with real-time state updates
- Authentication context provider using React Context API
- Protected content routing
- Modern and responsive UI with MUI components
- Dark mode UI styling
- Loading indicators and feedback toasts

---

## 📦 Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```
2. **Install dependencies
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Set Firebase Credentials
    ```bash
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
    ```
4. **Run the development server
    ```bash
    npm run dev
    # or
    yarn dev
    ```

### Firebase Setup Instructions
    Navigate to the Firebase Console

    Create or select a Firebase project

    Enable Google as a sign-in provider:

    Go to Authentication > Sign-in method

    Enable Google

    Configure the OAuth consent screen

    Add your domain(s) to Authorized Domains under the sign-in method settings


