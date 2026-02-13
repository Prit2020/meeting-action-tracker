# Meeting Action Items Tracker

## Live Links

Frontend: https://meeting-action-tracker-sigma.vercel.app/
Backend API: https://meeting-action-tracker-eszj.onrender.com/

## Overview

The Meeting Action Items Tracker is a full-stack web application that uses AI to extract actionable tasks from meeting transcripts and provides a clean interface to manage and track those tasks.

Users can paste meeting transcripts, automatically generate action items, and manage tasks through an intuitive dashboard.

---

## Features

### AI Extraction
- Extract action items from meeting transcripts
- Identify task owners and due dates (when available)

### Task Management
- View all extracted tasks
- Edit and update tasks
- Mark tasks as completed
- Delete tasks
- Filter tasks (All / Open / Done)

### History Tracking
- View the last 5 processed transcripts
- Review previously processed meeting content

### System Monitoring
- Check backend, database, and AI service health

### User Experience
- Clean dashboard layout
- Toast notifications for success & errors
- Loading and empty states
- Responsive design

---

## Tech Stack

### Frontend
- React (Vite + TypeScript)
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Google Gemini API

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---