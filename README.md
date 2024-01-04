# FlashCards Web Application

The FlashCards application is a React web application designed to create, manage, and study flashcards. This document provides a comprehensive guide to the project, including its structure, components, functionality, getting started instructions, and author information.

## Table of Contents

- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [React Hooks](#react-hooks)
- [Detailed Functionality of Components](#detailed-functionality-of-components)
- [Getting Started](#getting-started)
- [Author](#author)

## Introduction

The FlashCards application is a modern web tool that empowers users to create, manage, and study flashcards efficiently. Whether you're a student preparing for exams, a professional brushing up on important concepts, or anyone looking to enhance their knowledge, this application provides a user-friendly and feature-rich environment for your flashcard needs.

## Project Structure

The project is organized into several components, each with its own specific purpose and functionality:

- *App Component*
  - Serves as the root component.
  - Manages the main routes of the application.
  - Orchestrates the various components and handles top-level state and routing.

- *FlashCards Component*
  - Manages the state and behavior of flashcards.
  - Fetches flashcard data from the server.
  - Handles actions like selecting, sharing, searching, and sorting flashcards.
  - Supports batch operations.

- *CreateCard Component*
  - Provides a form for creating new flashcards.
  - Validates user input and submits data to the server.

- *CardItem Component*
  - Represents an individual flashcard item.
  - Displays flashcard content.
  - Supports interactions like editing and deleting flashcards.

- *EditCard Component*
  - Enables editing of existing flashcards.
  - Pre-populates form fields with existing data.
  - Updates flashcard data on the server.

- *ContactMe Component*
  - Provides a contact form for users to send messages or inquiries.
  - Collects user information and handles form submission.

- *Home Component*
  - Displays the application's homepage.
  - Provides a welcoming introduction to the application.
  - Sets the tone for the user experience.

## React Hooks

The project utilizes various React hooks to manage state, side effects, and context:

- useState: For adding React state to function components.
- useEffect: For performing side effects like data fetching.
- useContext: For subscribing to React context.
- useReducer: For managing complex state logic.
- useCallback: For memoized callbacks.
- useRef: For persisting values between renders.
- useMemo: For optimizing computed values.
- useHistory: For accessing the history instance.
- useLocation: For retrieving the current URL.
- useParams: For accessing route parameters.
- useRouteMatch: For matching the current URL.

## Detailed Functionality of Components

Each component has specific functions related to its purpose, including data fetching, user interactions, and form handling. For detailed function implementations, please refer to the project's codebase.

## Getting Started

To run the FlashCards application locally, follow these steps:

1. Clone the repository to your local machine:

   bash
   git clone https://github.com/Gulaghaa/Web-Mobile-Assignment-3
   

2. Navigate to the project directory:

   bash
   cd flashcards-app
   

3. Install the required dependencies using npm:

   bash
   npm install
   

4. Start the development server:

   bash
   npm run dev
   

5. Open your web browser and visit [http://localhost:5173](http://localhost:5173) to access the application.

## Author

- *Author:* Gulagha Abdullazade