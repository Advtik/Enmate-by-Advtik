# 🚀 Enmate — Connect. Collaborate. Grow.

**Enmate** is a social and real-time networking platform built for **students and developers** to connect with like-minded people, find teammates, and discover opportunities related to **hackathons, coding contests, projects, and competitive programming**.

> 🎯 **Goal**  
> Make it easier to meet the right people and the right opportunities at the right time.

---

## 🌐 Live Application

🔗 https://enmate.vercel.app

---

## ✨ Features

### 🔐 Authentication & Accounts
- Secure **JWT-based authentication**
- Protected routes and persistent sessions
- Personal user accounts and profiles

---

### 👤 User Profiles
- Custom profiles with:
  - Name, bio, city, website
  - Profile picture
  - Availability status
- Edit profile using a clean modal interface
- Follow and unfollow other users

---

### 📝 Posts & Social Feed
- Create posts with **text and images**
- Like and comment on posts
- Dynamic social feed
- Designed for sharing:
  - Ideas
  - Announcements
  - Coding & event updates

---

### 🎯 Opportunities Section
- Dedicated **Opportunities** panel
- Highlights posts related to:
  - Hackathons
  - Coding contests
  - Projects
  - Competitive programming
- Helps users find opportunities quickly without endless scrolling

---

### 💬 Real-Time Messaging
- One-to-one chat system
- Instant messaging using **Socket.IO**
- Online user tracking
- Persistent conversations stored in the database

---

### 🤝 Networking & Team Building
- Discover and connect with other users
- Find teammates for:
  - Hackathons
  - College projects
  - Competitive programming
- Built with student collaboration in mind

---

### 🎨 UI & Experience
- Clean and modern interface
- Responsive design
- Dark / light theme support
- Smooth transitions and modals
- Focused on simplicity and usability

---

## 🧠 Who Is Enmate For?

Enmate is built for:
- Students
- Developers
- Competitive programmers
- Hackathon participants
- Tech community members

If you’re looking to:
- Find teammates
- Discover coding opportunities
- Connect with people sharing similar interests

👉 **Enmate is for you.**

---

## 🏗️ Project Structure

```text
enmate/
├── api/          # Express Backend & Socket.IO logic
├── frontend/     # React Application & SCSS styling
└── README.md     # Project Documentation
```

---


The project follows a **clear full-stack separation**, with frontend and backend developed independently.


---

## 🖥️ Frontend

### Tech Stack
- React (Vite)
- React Router
- SCSS
- Axios
- @tanstack/react-query
- Socket.IO Client

### Responsibilities
- User interface and routing
- API communication
- Authentication handling
- Real-time message updates
- Feed, profile, and opportunity rendering

**Hosting:** Vercel

---

## ⚙️ Backend

### Tech Stack
- Node.js
- Express
- PostgreSQL (Neon – serverless)
- Socket.IO
- JWT Authentication
- Multer
- Cloudinary

### Responsibilities
- REST APIs for users, posts, likes, comments, and follows
- Authentication and authorization
- Real-time messaging
- Media uploads and file handling
- Database communication and business logic

**Hosting:** Render

---

## 🗄️ Database
- PostgreSQL (Neon – serverless)
- Designed to support:
  - Users and profiles
  - Posts, likes, and comments
  - Social relationships
  - Conversations and messages
- Scalable and relational by design

---

## 🔌 Real-Time System
- Built using **Socket.IO**
- Supports:
  - Live messaging
  - Online user presence
  - Instant updates without page refresh

---

## 🔐 Security
- JWT-based authentication
- Protected backend routes
- Secure password handling
- Controlled API access

---

## 🚧 Project Status
Enmate is **actively developed**.

Planned improvements include:
- Group chats
- Notifications
- Better opportunity filtering
- Enhanced discovery features

---

## 👨‍💻 Author

**Adwiteek Samadder**  
GitHub: [@Advtik](https://github.com/Advtik)

---

## ⭐ Support
If you like Enmate or find it useful, consider **starring the repository** ⭐  
Feedback and contributions are always welcome.

