// ai-code-visualizer/backend/public/script.js
// Main JavaScript for AI Code Visualizer

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM References ---
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;
    const importFolderBtnWrapper = document.getElementById('import-folder-btn-wrapper');
    const folderUploadInput = document.getElementById('folder-upload-input');
    const archSummary = document.getElementById('arch-summary');
    const archDiagramContainer = document.getElementById('arch-diagram-container');
    const codePanel = document.getElementById('code-panel');
    const flowchartPanel = document.getElementById('flowchart-panel');
    const analysisPanel = document.getElementById('analysis-panel');

    const fileMap = new Map();

    // --- Theme Toggle Logic ---
    const applyTheme = (theme) => {
        if (theme === 'light') body.classList.add('light-theme');
        else body.classList.remove('light-theme');
    };
    themeToggleBtn.addEventListener('click', () => {
        const newTheme = body.classList.toggle('light-theme') ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme) applyTheme(savedTheme);
    else applyTheme(prefersDark ? 'dark' : 'light');

    // --- Initialize Resizable Panels ---
    Split(['#left-panel', '#right-wrapper'], { sizes: [35, 65], minSize: 300, gutterSize: 10 });
    Split(['#code-and-flowchart-panels', '#analysis-panel'], { direction: 'vertical', sizes: [60, 40], minSize: 150, gutterSize: 10 });
    Split(['#code-panel', '#flowchart-panel'], { sizes: [50, 50], minSize: 200, gutterSize: 10 });

    // --- Event Listeners for Folder Import ---
    importFolderBtnWrapper.addEventListener('click', () => {
        folderUploadInput.click();
    });
    folderUploadInput.addEventListener('change', async (event) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        archSummary.textContent = `Visualizing project...`;
        archDiagramContainer.innerHTML = '<div class="loader"></div>';
        fileMap.clear();

        const fileStructure = buildFileStructure(files);
        renderFileStructure(fileStructure, archDiagramContainer);
        archSummary.textContent = 'Project structure visualized.';
    });

    function buildFileStructure(files) {
        const rootName = files[0].webkitRelativePath.split('/')[0];
        const root = { name: rootName, type: 'folder', children: [] };
        const nodeMap = new Map([[rootName, root]]);

        for (const file of files) {
            fileMap.set(file.webkitRelativePath, file);
            const pathParts = file.webkitRelativePath.split('/');
            let currentLevel = root;
            for (let i = 1; i < pathParts.length; i++) {
                const part = pathParts[i];
                const isFile = i === pathParts.length - 1;
                const fullPath = pathParts.slice(0, i + 1).join('/');
                let existingNode = nodeMap.get(fullPath);
                if (!existingNode) {
                    existingNode = {
                        name: part, type: isFile ? 'file' : 'folder',
                        children: [], path: fullPath
                    };
                    currentLevel.children.push(existingNode);
                    nodeMap.set(fullPath, existingNode);
                }
                currentLevel = existingNode;
            }
        }
        return root;
    }

    function renderFileStructure(node, container) {
        container.innerHTML = '';
        const rootElement = document.createElement('div');
        rootElement.classList.add('root-visual-tree');
        renderNode(node, rootElement);
        container.appendChild(rootElement);
    }

    function renderNode(node, container) {
        const nodeElement = document.createElement('div');
        nodeElement.classList.add('visual-node');
        if (node.path) {
           nodeElement.dataset.filePath = node.path;
        }

        const contentWrapper = document.createElement('div');
        contentWrapper.classList.add('node-content-wrapper');
        const iconElement = document.createElement('div');
        iconElement.classList.add('icon');
        iconElement.style.backgroundImage = `url('${getIconURL(node)}')`;
        const nameElement = document.createElement('div');
        nameElement.classList.add('name');
        nameElement.textContent = node.name;

        contentWrapper.appendChild(iconElement);
        contentWrapper.appendChild(nameElement);
        nodeElement.appendChild(contentWrapper);

        if (node.children.length > 0) {
            const childrenElement = document.createElement('div');
            childrenElement.classList.add('children');
            node.children.forEach(child => renderNode(child, childrenElement));
            nodeElement.appendChild(childrenElement);
        }
        container.appendChild(nodeElement);
    }

    function getIconURL(node) {
        if (node.type === 'folder') return 'https://img.icons8.com/color/96/000000/folder-invoices.png';
        const extension = node.name.split('.').pop();
        switch (extension) {
            case 'html': return 'https://img.icons8.com/color/96/000000/html-5.png';
            case 'css': return 'https://img.icons8.com/color/96/000000/css3.png';
            case 'js': return 'https://img.icons8.com/color/96/000000/javascript.png';
            case 'java': return 'https://img.icons8.com/color/96/000000/java-coffee-cup-logo.png';
            case 'py': return 'https://img.icons8.com/color/96/000000/python.png';
            case 'cpp': return 'https://img.icons8.com/color/96/000000/c-plus-plus-logo.png';
            case 'c': return 'https://img.icons8.com/color/96/000000/c-programming.png';
            default: return 'https://img.icons8.com/color/96/000000/document.png';
        }
    }

    archDiagramContainer.addEventListener('click', (event) => {
        const fileNode = event.target.closest('.visual-node');
        if (fileNode && fileNode.dataset.filePath) {
            const filePath = fileNode.dataset.filePath;
            const file = fileMap.get(filePath);
            if (file) {
                 displayFileContent(file);
            }
        }
    });

    function getLanguageClass(filename) {
        const extension = filename.split('.').pop();
        const langMap = { 'js': 'javascript', 'py': 'python', 'java': 'java', 'cpp': 'cpp', 'c': 'c', 'html': 'markup', 'css': 'css' };
        return langMap[extension] || 'plaintext';
    }

    async function getCodeExplanation(code, language) {
        return new Promise(resolve => {
            setTimeout(() => {
                const explanation = `This is a <strong>${language}</strong> code snippet.\n\n` +
                                  `**Key Functionality:**\n` +
                                  `- The code appears to define a primary class or function.\n` +
                                  `- It likely takes some input and produces a specific output based on its internal logic.\n\n` +
                                  `**Simulated Analysis:**\n` +
                                  `This is a placeholder explanation. A real AI model would provide a detailed, line-by-line breakdown of the code's purpose, structure, and potential improvements.`;
                resolve(explanation);
            }, 1000);
        });
    }

    /* --- FIX FOR MERMAID SYNTAX ERROR --- */
    function sanitizeForMermaid(text) {
        // Replace characters that can break Mermaid syntax and wrap in quotes
        const sanitizedText = text.replace(/"/g, '#quot;');
        return `"${sanitizedText}"`;
    }

    function generateDetailedFlowchart(code) {
        let graph = 'graph TD\n    A[Start] --> B(Declare Variables);\n';
        let nodeCounter = 2;
        let lastNode = 'B';
        const lines = code.split('\n').map(line => line.trim());

        for (const line of lines) {
            const nextNodeChar = String.fromCharCode(65 + nodeCounter);

            if (line.match(/if\s*\(/)) {
                // Use the sanitizer to prevent errors
                const condition = sanitizeForMermaid(line.replace('if', '').trim());
                graph += `    ${lastNode} --> ${nextNodeChar}{Condition: ${condition}};\n`;
                lastNode = nextNodeChar;
            } else if (line.match(/for\s*\(/)) {
                // Use the sanitizer to prevent errors
                const loop = sanitizeForMermaid(line.replace('for', '').trim());
                graph += `    ${lastNode} --> ${nextNodeChar}[Loop: ${loop}];\n`;
                lastNode = nextNodeChar;
            } else if (line.match(/System\.out\.println/)) {
                graph += `    ${lastNode} --> ${nextNodeChar}[Output];\n`;
                lastNode = nextNodeChar;
            } else if (line.match(/return/)) {
                graph += `    ${lastNode} --> ${nextNodeChar}[Return];\n`;
                lastNode = nextNodeChar;
            }

            nodeCounter++;
            if (nodeCounter > 25) break; // Safety break for very long files
        }

        graph += `    ${lastNode} --> Z[End];\n`;
        return graph;
    }
    /* --- END OF FIX --- */
    
    async function displayFileContent(file) {
        document.querySelectorAll('.visual-node').forEach(el => el.classList.remove('selected'));
        document.querySelector(`[data-file-path="${file.webkitRelativePath}"]`)?.classList.add('selected');

        codePanel.innerHTML = '<div class="loader"></div>';
        const content = await file.text();
        const languageClass = getLanguageClass(file.name);
        
        const pre = document.createElement('pre');
        const code = document.createElement('code');
        code.className = `language-${languageClass}`;
        code.textContent = content;
        pre.appendChild(code);
        
        codePanel.innerHTML = `<h2>${file.name}</h2>`;
        codePanel.appendChild(pre);
        
        Prism.highlightElement(code);

        const mermaidGraph = generateDetailedFlowchart(content);
        flowchartPanel.innerHTML = `<h2>Flowchart</h2><div class="mermaid-container"><div class="mermaid">${mermaidGraph}</div></div>`;
        mermaid.init(undefined, flowchartPanel.querySelectorAll('.mermaid'));

        analysisPanel.innerHTML = `<h2>AI Analysis for ${file.name}</h2><div class="loader"></div>`;
        const explanation = await getCodeExplanation(content, languageClass);
        analysisPanel.innerHTML = `<h2>AI Analysis for ${file.name}</h2><p>${explanation.replace(/\n/g, '<br>')}</p>`;
    }

    const backToTop = document.querySelector('.back-to-top');
    backToTop?.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});