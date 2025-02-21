# 📋 Productivity App

A feature-rich productivity app designed to help you manage tasks, boost efficiency, and balance work with rest. Organize your tasks, track deadlines, focus with a Pomodoro timer, and gain insights into your productivity—all in one place.

## Table of Contents
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Usage](#usage)

## Usage
[Live demo](https://task-manager-front-bmmt.onrender.com/)
Note: Due to deployment on Render.com with free tier, you may experience initial delays due to automatic spin-down when idle.

## 🚀 Key Features

### 📁 Task Organization with Folders  
- Categorize tasks into customizable folders for structured project management.  
- Easily create new folders by entering a folder name into the input field.  

### 🔍 Advanced Task Search  
- Quickly find tasks using real-time search functionality.  
- Supports partial string matches and optimized for large task lists.

### 🗓️ Due Date Management  
- Assign due dates to tasks using an intuitive date picker.  
- Visual indicators highlight approaching deadlines, with color-coded due date fields based on urgency.

### ⏱️ Pomodoro Timer Integration  
- Stay focused with a built-in Pomodoro timer featuring work and break intervals.  
- Track productivity with real-time stats:  
  - **Total Work Time** and **Total Rest Time** displayed on stats tiles.  
  - **Weekly navigable stacked bar charts** visualize daily productivity, showing work vs. rest sessions for each date.

### 🤖 AI-Generated Subtasks  
- Streamline workflows with **OpenAI LLM**-powered subtask generation.  
- Automatically break down complex tasks into actionable subtasks for more efficient completion.

### ⚡ Task Prioritization  
- Set task priorities (**High**, **Medium**, or **Low**) to focus on what's most important.  
- Priority levels are visually distinct, making it easy to organize and sort tasks based on urgency.

### 📈 Productivity Insights  
- Integrated analytics track your work and rest patterns.  
- Weekly charts help you optimize productivity and maintain balance.

## Tech Stack
This web application features a React frontend styled with Tailwind CSS, enhanced by Material UI icons, and utilizes react-chartjs-2 for dynamic productivity tracking charts. It integrates OpenAI's LLM to intelligently generate subtasks, streamlining task management.

The backend is built with Node.js and Express, connected to a PostgreSQL database. Development is powered by Vite for a fast and efficient build process. The entire stack is containerized with Docker and deployed on Render.com, covering the frontend, backend, and database for seamless scalability and performance.
