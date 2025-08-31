# AI Code Visualizer

## Overview
The AI Code Visualizer is a web application designed to provide a visual representation of a project's file structure. Users can click on files to generate and display a high-level logical breakdown of the code within those files using the Gemini AI API.

## Project Structure
The project is organized into two main parts: the backend and the frontend.

### Backend
The backend is built using TypeScript and Express. It handles API requests and communicates with the Gemini AI API.

- **src/app.ts**: Entry point of the backend application, initializes the Express app and sets up middleware.
- **src/controllers/fileController.ts**: Contains the `FileController` class with methods for retrieving file structure and interacting with the Gemini AI API.
- **src/routes/index.ts**: Defines the API routes and links them to the appropriate controller methods.
- **src/services/geminiService.ts**: Handles communication with the Gemini AI API.
- **package.json**: Configuration file for npm, listing dependencies and scripts.
- **tsconfig.json**: TypeScript configuration file.

### Frontend
The frontend is built using React and provides a user-friendly interface for interacting with the backend.

- **src/App.tsx**: Main entry point of the frontend application, managing the overall layout.
- **src/components/FileTree.tsx**: Component that visually represents the project's file structure.
- **src/components/FileViewer.tsx**: Displays the content of the selected file and fetches breakdowns from the backend.
- **src/components/BreakdownPanel.tsx**: Presents the high-level logical breakdown of the code.
- **src/styles/main.css**: CSS styles for the frontend application.
- **package.json**: Configuration file for npm, listing dependencies and scripts.
- **tsconfig.json**: TypeScript configuration file.

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   cd ai-code-visualizer
   ```

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd ../frontend
   npm install
   ```

4. Start the backend server:
   ```
   cd backend
   npm start
   ```

5. Start the frontend application:
   ```
   cd ../frontend
   npm start
   ```

## Contribution Guidelines
Contributions are welcome! Please follow these steps to contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes and create a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.