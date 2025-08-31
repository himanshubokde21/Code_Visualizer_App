# AI Code Visualizer Backend

## Overview
The AI Code Visualizer is a web application designed to provide a visual representation of a project's file structure. It allows users to click on files to generate a high-level logical breakdown of the code using the Gemini AI API.

## Project Structure
The backend of the application is structured as follows:

```
ai-code-visualizer
├── backend
│   ├── src
│   │   ├── app.ts                # Entry point of the backend application
│   │   ├── controllers            # Contains controllers for handling requests
│   │   │   └── fileController.ts  # Controller for file-related operations
│   │   ├── routes                 # Defines API routes
│   │   │   └── index.ts           # Main routing file
│   │   └── services               # Services for external API communication
│   │       └── geminiService.ts   # Service for interacting with the Gemini AI API
│   ├── package.json               # NPM configuration file
│   ├── tsconfig.json              # TypeScript configuration file
│   └── README.md                  # Documentation for the backend
```

## Setup Instructions
1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd ai-code-visualizer/backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the Application**
   ```bash
   npm start
   ```

## API Usage
The backend exposes several API endpoints to interact with the file structure and the Gemini AI API. The main functionalities include:

- **Get File Structure**: Retrieve the project's file structure.
- **Get File Breakdown**: Fetch a high-level logical breakdown of a specific file's code using the Gemini AI API.

## Contribution Guidelines
Contributions are welcome! Please follow the standard Git workflow:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a clear description of your changes.