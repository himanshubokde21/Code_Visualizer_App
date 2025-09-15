// ai-code-visualizer/frontend/src/components/FileTree.tsx
import React, { useEffect, useState } from 'react';

// Define types for our file structure nodes
interface FileNode {
    name: string;
    path: string;
    type: 'file';
}

interface DirectoryNode {
    name: string;
    path: string;
    type: 'directory';
    children: FileSystemNode[];
}

type FileSystemNode = FileNode | DirectoryNode;

interface FileTreeProps {
    onFileSelect: (filePath: string) => void;
}

const FileTree: React.FC<FileTreeProps> = ({ onFileSelect }) => {
    const [fileStructure, setFileStructure] = useState<FileSystemNode[]>([]);

    useEffect(() => {
        // Fetch the structure from the correct backend endpoint
        const fetchFileStructure = async () => {
            try {
                // NOTE: This assumes your backend returns a tree structure.
                // We will need to implement this on the backend later.
                // For now, we use a dummy structure.
                const response = await fetch('/api/structure');
                const data = await response.json();
                setFileStructure(data.tree || []); // Adjust if your API returns a different shape
            } catch (error) {
                console.error('Error fetching file structure:', error);
            }
        };

        // fetchFileStructure(); // You can enable this once the backend /structure is complete
    }, []);


    // Recursive function to render the tree
    const renderTree = (nodes: FileSystemNode[]) => {
        return nodes.map((node) => {
            if (node.type === 'directory') {
                return (
                    <li key={node.path}>
                        <span>📁 {node.name}</span>
                        <ul>{renderTree(node.children)}</ul>
                    </li>
                );
            }
            return (
                <li key={node.path} onClick={() => onFileSelect(node.path)} style={{ cursor: 'pointer', color: 'blue' }}>
                    📄 {node.name}
                </li>
            );
        });
    };

    return (
        <div className="file-tree">
            <h2>File Structure</h2>
            {/* For demonstration, we'll use a simple button until the /structure endpoint is fully implemented */}
            <button onClick={() => onFileSelect('example/path/to/file')}>
                Analyze Example File
            </button>
            <ul>{renderTree(fileStructure)}</ul>
        </div>
    );
};

export default FileTree;