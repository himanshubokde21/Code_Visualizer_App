// ai-code-visualizer/frontend/src/components/FileViewer.tsx
import React from 'react';

interface FileViewerProps {
    filePath: string | null;
    fileContent: string;
}

const FileViewer: React.FC<FileViewerProps> = ({ filePath, fileContent }) => {
    return (
        <div className="file-viewer">
            <h2>{filePath ? `Viewing: ${filePath}` : 'No File Selected'}</h2>
            <pre>{fileContent}</pre>
        </div>
    );
};

export default FileViewer;