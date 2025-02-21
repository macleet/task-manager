# Task Manager

## Introduction
This web application is a task manager with which we can create task items and organize them using various functionalities. Sort, prioritize, set due dates, and create folders to simplify your task organization process.

## Table of Contents
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Installation and Setup](#installation-and-setup)
  - [Prerequisites](#prerequisites)
  - [Steps](#steps)
- [Usage](#usage)
- [Architecture](#architecture)

## Key Features
- Task Folders
  - You can categorize your tasks by adding them into folders.
  - You can add new folders by entering a folder name into the add folder input field.
- Task Prioritization
  - You can prioritize your tasks by clicking the star button.
  - The clicked task should move to the top of your tasks list, and back to its original position on unclicking.
- Task Searching
  - As you enter a task name to search, the tasks that match this string will pop up in the tasks list.
- Task Due Dates
  - Due dates can be set for you to keep track of the deadline of your tasks.
  - A calendar pops up for you to set the a future date.
  - The due date box will change color as the due date approaches.

## Tech Stack
This web application features a React frontend styled with Tailwind CSS, enhanced by Material UI icons, and utilizes react-chartjs-2 for dynamic productivity tracking charts. It integrates OpenAI's LLM to intelligently generate subtasks, streamlining task management.

The backend is built with Node.js and Express, connected to a PostgreSQL database. Development is powered by Vite for a fast and efficient build process. The entire stack is containerized with Docker and deployed on Render.com, covering the frontend, backend, and database for seamless scalability and performance.

## Usage
[Live demo](https://task-manager-front-bmmt.onrender.com/)
Note: Due to deployment on Render.com with free tier, you may experience initial delays due to automatic spin-down when idle.