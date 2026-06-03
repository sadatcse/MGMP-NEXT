# Multigym Premium - Developer & Deployment Guide

This file provides instructions on running the Next.js application, managing database schemas, storing uploads locally on the server, and deploying to a cPanel environment.

---

## 🛠 Local Setup & Running

### 1. Installation
Install all the dependencies locally:
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` (or `.env.production`) file in the root folder with the following variables:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/multigym
JWT_SECRET=your_jwt_secret_key
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 3. Development Mode
Run the development server with hot-reloading:
```bash
npm run dev
```

### 4. Production Build & Run
Compile the application for production:
```bash
npm run build
```
Run the compiled server locally:
```bash
npm run start
```

---

## 📁 Local & cPanel Image Upload System

To support hosting on **cPanel** without relying on third-party image hosts (like ImageBB) or temporary local storage that gets deleted during server rebuilds:
- Images are uploaded using the `/api/upload` endpoint.
- Uploaded files are saved to the `/public/uploads` directory.
- In cPanel production deployments, verify that the `public/uploads` folder has write permissions (`0755` or `0775`).
- Files are saved with a timestamped unique prefix (e.g., `1780461125919_filename.jpg`) to avoid name collisions.

---

## 📊 Traffic & Visitor Analytics

The site has a built-in session-based visitor tracking system that records analytics directly to MongoDB:
- **Tracking Layout:** Integrates a tracking hook in [layout.jsx](file:///f:/2025/Multigym%20-premium.com%20-%20Copy/Nextjs/app/layout.jsx) which logs the user's country, IP (resolved via `ipwho.is`), landing path, referrer, and user-agent.
- **Analytics Dashboard:** Navigate to `/dashboard/traffic` to view detailed charts, a live visitor feed, search filter, source classification, and a CSV exporter.
- **API Endpoints:**
  - `POST /api/visitor/log` - Logs new visitor sessions.
  - `GET /api/visitor/stats` - Pulls charts, source breakdowns, and paginated logs.

---

## 🌓 Theme Toggle (Light & Dark Mode)

The Admin Dashboard supports persistent Light Mode and Dark Mode:
- Theme settings are configured and loaded inside [layout.jsx](file:///f:/2025/Multigym%20-premium.com%20-%20Copy/Nextjs/app/dashboard/layout.jsx).
- The theme toggle switch is accessible directly at the bottom of the dashboard [Sidebar.jsx](file:///f:/2025/Multigym%20-premium.com%20-%20Copy/Nextjs/src/views/Dashboard/Sidebar.jsx).
- Custom variables are registered in [index.css](file:///f:/2025/Multigym%20-premium.com%20-%20Copy/Nextjs/src/index.css) to support clean styling toggles without UI flashes.

---

## 🚀 cPanel Deployment Checklist

When deploying this Next.js app to cPanel:

1. **Node.js Setup:** Use the cPanel **Setup Node.js App** module.
2. **Application Directory:** Select the folder containing your compiled Next.js files. Set the Application Startup File to `node_modules/next/dist/bin/next` and specify the startup command option as `start`.
3. **Environment Variables:** Set your production variables (like `MONGODB_URI`) directly in the cPanel Node.js Application interface under *Environment Variables*.
4. **Build Step:**
   - Upload the files (excluding `node_modules` and `.next`).
   - Run **NPM Install** via cPanel or Terminal.
   - Run **NPM Run Build** via cPanel or SSH to compile optimization bundles.
5. **Permissions:** Ensure the directory `/public/uploads/` is write-accessible by the server process.
