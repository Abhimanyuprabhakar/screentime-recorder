# TimeSense AI | AI-Driven Productivity & Screen Analytics Platform (Backend)

This is the backend service of **TimeSense AI | AI-Driven Productivity & Screen Analytics Platform**, a productivity analytics system designed to capture and process screen usage data. It works with the Chrome extension and frontend dashboard to store, analyze, and serve user activity in a privacy-conscious way.

---

## 🧠 Core Responsibilities

- 🔌 **RESTful API Endpoints** – Receive structured screen time session data from the Chrome extension
- 💾 **MongoDB Integration** – Persist user sessions, productivity scores, and domain-specific details
- 🧮 **Data Analysis Engine** – Compute productivity scores, detect consistency, peak hours, and categorize activity
- 📤 **Serve Insights to Frontend** – Provide real-time and historical usage stats, trends, and heatmaps
- 🔁 **Support Periodic Sync** – Accept tab session updates every 30 seconds via background extension
- 🔒 **Token-Based Authentication** – Verify users with JWTs, compatible with Google OAuth frontend
- ⚙️ **Modular Architecture** – Built with Node.js and Express for maintainability and easy scaling

---
