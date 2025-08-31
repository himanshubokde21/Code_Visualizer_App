import React from 'react';
import FileTree from './components/FileTree';
import FileViewer from './components/FileViewer';
import BreakdownPanel from './components/BreakdownPanel';
import './styles/main.css';

const App: React.FC = () => {
    const [selectedFile, setSelectedFile] = React.useState<string | null>(null);
    const [fileBreakdown, setFileBreakdown] = React.useState<string | null>(null);

    const handleFileSelect = (filePath: string) => {
        setSelectedFile(filePath);
        // Logic to fetch file breakdown from the backend can be added here
    };

    return (
        <div className="app-container">
            <FileTree onFileSelect={handleFileSelect} />
            <FileViewer filePath={selectedFile} />
            <BreakdownPanel breakdown={fileBreakdown} />
        </div>
    );
};

export default App;