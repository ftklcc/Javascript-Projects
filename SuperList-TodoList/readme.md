# Task Manager App
A simple and clean management application built with `Vanilla Javascript` focused on readability, performance, and clear state handling.
This project is based on my previous GitHub implementation and has been refactored and improved for better structure and maintainabiliry.

## Features
- Add new Task with priority
- Edit existing tasks
- Mark tasks as completed
- Delete single Tasks
- Delete all tasks with confirmation modal
- Filter tasks by priority
- Search tasks by text
- Persistent data using `localstorage`

## Application Logic Overview
The application follows a clear seperation of responsibilities
- UI Rendering: Handles DOM updates only
- State Management: Uses `localstorage` as a single source of truth
- Event Handling: All events are registered in one place
- Form Flow: Add and Edit actions are handled explicity

## How It Works
- The app initializes by loading tasks from localStorage.
- Tasks are rendered dynamically to the DOM.
- All user interactions (add, edit, delete, filter, search) are handled via event delegation.
- Any change to a task updates both the UI and localStorage.

## Refactoring Notes
- Improved function naming for clarity
- Separated add and edit logic
- Centralized DOM element caching
- Reduced duplicated logic
- Improved readability and maintainability