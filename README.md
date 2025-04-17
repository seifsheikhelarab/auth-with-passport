
# OAuth Authentication with Passport.js

This is a Node.js authentication project using Passport.js with Google and Twitter OAuth strategies. It securely authenticates users, stores their profile information in MongoDB, and manages sessions.

## 🚀 Features

- Login with Google
- Login with Twitter
- User session management
- MongoDB user storage with Mongoose
- Profile page displaying user information

## 🛠️ Tech Stack

- Node.js
- Express.js
- Passport.js
- MongoDB + Mongoose
- Bootstrap (for frontend styling)

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/seifsheikhelarab/oauth-auth-app.git
   cd oauth-auth-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file with the following:**
   ```env
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

   TWITTER_CONSUMER_KEY=your_twitter_consumer_key
   TWITTER_CONSUMER_SECRET=your_twitter_consumer_secret
   TWITTER_CALLBACK_URL=http://localhost:3000/auth/twitter/callback

   SESSION_SECRET=your_session_secret
   MONGO_URI=mongodb://localhost:27017/oauth-with-passportjs
   ```

4. **Run the server:**
   ```bash
   npm start
   ```

5. **Visit in your browser:**
   ```
   http://localhost:3000
   ```

## 📄 Project Structure

```
/config         → Passport and session config
/models         → Mongoose models
/routes         → Express routes
/views          → EJS templates
app.js          → Main server file
.env            → Environment variables
```