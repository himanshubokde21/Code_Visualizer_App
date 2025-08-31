import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FileTree = () => {
    const [fileStructure, setFileStructure] = useState([]);

    useEffect(() => {
        const fetchFileStructure = async () => {
            try {
                const response = await axios.get('/api/files');
                setFileStructure(response.data);
            } catch (error) {
                console.error('Error fetching file structure:', error);
            }
        };

        fetchFileStructure();
    }, []);

    const handleFileClick = async (filePath) => {
        try {
            const response = await axios.get(`/api/files/breakdown?file=${filePath}`);
            // Handle the response from the Gemini AI API
            console.log('File breakdown:', response.data);
        } catch (error) {
            console.error('Error fetching file breakdown:', error);
        }
    };

    const renderFileTree = (files) => {
        return files.map((file) => {
            if (file.type === 'directory') {
                return (
                    <li key={file.path}>
                        {file.name}
                        <ul>{renderFileTree(file.children)}</ul>
                    </li>
                );
            }
            return (
                <li key={file.path} onClick={() => handleFileClick(file.path)}>
                    {file.name}
                </li>
            );
        });
    };

    return (
        <div className="file-tree">
            <h2>File Structure</h2>
            <ul>{renderFileTree(fileStructure)}</ul>
        </div>
    );
};

export default FileTree;