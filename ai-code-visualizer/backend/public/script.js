document.addEventListener('DOMContentLoaded', () => {
    // --- DOM References ---
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;
    const importFolderBtn = document.getElementById('import-folder-btn');
    const folderUploadInput = document.getElementById('folder-upload-input');
    const archSummary = document.getElementById('arch-summary');
    const archDiagramContainer = document.getElementById('arch-diagram-container');
    const codePanel = document.getElementById('code-panel');
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
    Split(['#code-panel', '#analysis-panel'], { direction: 'vertical', sizes: [60, 40], minSize: 150, gutterSize: 10 });

    // --- Event Listeners for Folder Import ---
    importFolderBtn.addEventListener('click', () => folderUploadInput.click());
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
                        name: part,
                        type: isFile ? 'file' : 'folder',
                        children: [],
                        path: fullPath
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
        container.innerHTML = ''; // Clear loader or previous content
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

        const iconElement = document.createElement('div');
        iconElement.classList.add('icon');
        iconElement.style.backgroundImage = `url('${getIconURL(node)}')`;

        const nameElement = document.createElement('div');
        nameElement.classList.add('name');
        nameElement.textContent = node.name;

        nodeElement.appendChild(iconElement);
        nodeElement.appendChild(nameElement);

        if (node.children.length > 0) {
            const childrenElement = document.createElement('div');
            childrenElement.classList.add('children');
            node.children.forEach(child => {
                renderNode(child, childrenElement);
            });
            nodeElement.appendChild(childrenElement);
        }
        container.appendChild(nodeElement);
    }

    // CORRECTED: Using a reliable, high-quality icon set from Icons8
    function getIconURL(node) {
        if (node.type === 'folder') {
            return 'https://img.icons8.com/color/96/000000/folder-invoices.png';
        }

        const extension = node.name.split('.').pop();
        switch (extension) {
            case 'html': return 'https://img.icons8.com/color/96/000000/html-5.png';
            case 'css': return 'https://img.icons8.com/color/96/000000/css3.png';
            case 'js': return 'https://img.icons8.com/color/96/000000/javascript.png';
            case 'java': return 'https://img.icons8.com/color/96/000000/java-coffee-cup-logo.png';
            case 'py': return 'https://img.icons8.com/color/96/000000/python.png';
            case 'cpp': return 'https://img.icons8.com/color/96/000000/c-plus-plus-logo.png';
            case 'c': return 'https://img.icons8.com/color/96/000000/c-programming.png';
            case 'png':
            case 'jpg':
            case 'jpeg':
            case 'gif': return 'https://img.icons8.com/color/96/000000/image-file.png';
            case 'txt': return 'https://img.icons8.com/color/96/000000/txt.png';
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

    async function displayFileContent(file) {
        document.querySelectorAll('.visual-node.selected').forEach(el => el.classList.remove('selected'));
        document.querySelector(`[data-file-path="${file.webkitRelativePath}"]`)?.classList.add('selected');

        codePanel.innerHTML = '<div class="loader"></div>';
        const content = await file.text();
        const escapedContent = content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        codePanel.innerHTML = `<h2>${file.name}</h2><pre><code>${escapedContent}</code></pre>`;

        analysisPanel.innerHTML = `<h2>AI Analysis for ${file.name}</h2><p>Generating analysis...</p>`;
        setTimeout(() => {
            analysisPanel.innerHTML += `<p>This appears to be a <strong>${file.name.split('.').pop()}</strong> file. The code implements [simulated analysis].</p>`;
        }, 500);
    }
});