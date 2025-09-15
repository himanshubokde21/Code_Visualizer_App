// ai-code-visualizer/frontend/src/App.tsx
import React, { useState } from 'react';
import FileTree from './components/FileTree';
import FileViewer from './components/FileViewer';
import BreakdownPanel from './components/BreakdownPanel';
import './styles/main.css';

const App: React.FC = () => {
    // State for the entire application
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [fileContent, setFileContent] = useState<string>('');
    const [breakdown, setBreakdown] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // This function now orchestrates everything
    const handleFileSelect = async (filePath: string) => {
        if (!filePath) return;

        setSelectedFile(filePath);
        setIsLoading(true);
        setFileContent('Loading file content...');
        setBreakdown('');

        try {
            // 1. Fetch the actual content of the file from our new backend endpoint
            const contentRes = await fetch(`/api/content?filePath=${encodeURIComponent(filePath)}`);
            if (!contentRes.ok) throw new Error('File not found');
            const content = await contentRes.text();
            setFileContent(content);

            // 2. Send that content to the analysis endpoint
            setBreakdown('Analyzing code...');
            const analyzeRes = await fetch("/api/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                // Use the real file content in the body
                body: JSON.stringify({ code: content }),
            });
            const analysisData = await analyzeRes.json();
            // Pretty-print the JSON analysis for display
            setBreakdown(JSON.stringify(analysisData, null, 2));

        } catch (error) {
            console.error("Error processing file:", error);
            const errorMessage = `❌ Failed to process file: ${filePath}`;
            setFileContent(errorMessage);
            setBreakdown(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="app-container">
            {/* We now use the real FileTree component */}
            <FileTree onFileSelect={handleFileSelect} />

            {/* Pass the real file content to the viewer */}
            <FileViewer filePath={selectedFile} fileContent={fileContent} />

            {/* Pass the analysis result to the breakdown panel */}
            <BreakdownPanel breakdown={breakdown} />
        </div>
    );
};

export default App;