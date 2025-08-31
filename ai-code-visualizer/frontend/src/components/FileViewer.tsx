import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FileViewer = ({ selectedFile }) => {
    const [fileContent, setFileContent] = useState('');
    const [fileBreakdown, setFileBreakdown] = useState('');

    useEffect(() => {
        if (selectedFile) {
            fetchFileContent(selectedFile);
            fetchFileBreakdown(selectedFile);
        }
    }, [selectedFile]);

    const fetchFileContent = async (file) => {
        try {
            const response = await axios.get(`/api/files/content?file=${file}`);
            setFileContent(response.data);
        } catch (error) {
            console.error('Error fetching file content:', error);
        }
    };

    const fetchFileBreakdown = async (file) => {
        try {
            const response = await axios.get(`/api/files/breakdown?file=${file}`);
            setFileBreakdown(response.data);
        } catch (error) {
            console.error('Error fetching file breakdown:', error);
        }
    };

    return (
        <div className="file-viewer">
            <h2>File Viewer</h2>
            <pre>{fileContent}</pre>
            <h3>File Breakdown</h3>
            <div>{fileBreakdown}</div>
        </div>
    );
};

export default FileViewer;