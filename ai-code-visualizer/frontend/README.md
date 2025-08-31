# AI Code Visualizer - Frontend

## Overview
The AI Code Visualizer is a web application designed to provide a visual representation of a project's file structure. Users can click on files to view a high-level logical breakdown of the code within, powered by the Gemini AI API.

## Project Structure
The frontend of the application is structured as follows:

```
frontend/
├── src/
│   ├── App.tsx               # Main entry point of the React application
│   ├── components/            # Contains React components
│   │   ├── FileTree.tsx      # Component for displaying the file structure
│   │   ├── FileViewer.tsx     # Component for viewing file content
│   │   └── BreakdownPanel.tsx  # Component for displaying code breakdown
│   └── styles/                # Contains CSS styles
│       └── main.css          # Main stylesheet for the application
├── package.json               # NPM configuration for the frontend
├── tsconfig.json             # TypeScript configuration for the frontend
└── README.md                  # Documentation for the frontend
```

## Setup Instructions
1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd ai-code-visualizer/frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the Application**
   ```bash
   npm start
   ```

## Usage
- Navigate through the file tree to select a file.
- The selected file's content will be displayed in the File Viewer.
- Click on the "Analyze" button to fetch a breakdown of the code using the Gemini AI API.

## Contribution
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.