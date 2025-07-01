export function getWebviewContent(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tailwind CSS Previewer</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'vscode-bg': 'var(--vscode-editor-background)',
                        'vscode-fg': 'var(--vscode-editor-foreground)',
                    }
                }
            }
        }
    </script>
    <style>
        body {
            font-family: var(--vscode-font-family);
            background-color: var(--vscode-editor-background);
            color: var(--vscode-editor-foreground);
            padding: 0;
            margin: 0;
            overflow-x: hidden;
        }
        
        .container {
            padding: 20px;
            max-width: 100%;
        }
        
        .input-section {
            background-color: var(--vscode-input-background);
            border: 1px solid var(--vscode-input-border);
            border-radius: 4px;
            margin-bottom: 20px;
            padding: 15px;
        }
        
        .preview-section {
            background-color: var(--vscode-editor-background);
            border: 1px solid var(--vscode-panel-border);
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            min-height: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        input, select, textarea {
            background-color: var(--vscode-input-background);
            color: var(--vscode-input-foreground);
            border: 1px solid var(--vscode-input-border);
            border-radius: 4px;
            padding: 8px 12px;
            font-size: 14px;
            width: 100%;
            box-sizing: border-box;
        }
        
        input:focus, select:focus, textarea:focus {
            outline: none;
            border-color: var(--vscode-focusBorder);
            box-shadow: 0 0 0 1px var(--vscode-focusBorder);
        }
        
        button {
            background-color: var(--vscode-button-background);
            color: var(--vscode-button-foreground);
            border: none;
            border-radius: 4px;
            padding: 8px 16px;
            cursor: pointer;
            font-size: 14px;
            margin: 4px;
        }
        
        button:hover {
            background-color: var(--vscode-button-hoverBackground);
        }
        
        .preset-item {
            background-color: var(--vscode-list-inactiveSelectionBackground);
            border: 1px solid var(--vscode-list-inactiveSelectionBackground);
            border-radius: 4px;
            padding: 8px;
            margin: 4px 0;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .preset-item:hover {
            background-color: var(--vscode-list-hoverBackground);
        }
        
        .history-item {
            font-size: 12px;
            color: var(--vscode-descriptionForeground);
            background-color: var(--vscode-badge-background);
            border-radius: 12px;
            padding: 4px 8px;
            margin: 2px;
            cursor: pointer;
            display: inline-block;
        }
        
        .history-item:hover {
            background-color: var(--vscode-badge-foreground);
            color: var(--vscode-badge-background);
        }
        
        .grid {
            display: grid;
            gap: 10px;
            grid-template-columns: 1fr 1fr;
        }
        
        .full-width {
            grid-column: 1 / -1;
        }
        

        
        .default-preview {
            padding: 12px;
            border: 1px dashed var(--vscode-panel-border);
            border-radius: 4px;
            color: var(--vscode-descriptionForeground);
            background-color: transparent;
            font-family: var(--vscode-font-family);
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div style="margin-bottom: 20px; text-align: center;">
            <h2 style="margin: 0; color: var(--vscode-editor-foreground);">🎨 Live Tailwind CSS Previewer</h2>
            <p style="margin: 8px 0 0 0; color: var(--vscode-descriptionForeground); font-size: 14px;">
                Type Tailwind classes and see them come to life!
            </p>
        </div>

        <!-- Input Section -->
        <div class="input-section">
            <div class="grid">
                <div>
                    <label for="elementType" style="display: block; margin-bottom: 5px; font-weight: bold;">Element Type:</label>
                    <select id="elementType">
                        <option value="div">Div</option>
                        <option value="button">Button</option>
                        <option value="input" data-placeholder="Enter text...">Input</option>
                        <option value="p">Paragraph</option>
                        <option value="span">Span</option>
                        <option value="h1">Heading 1</option>
                        <option value="h2">Heading 2</option>
                        <option value="h3">Heading 3</option>
                        <option value="a" data-href="https://example.com">Link</option>
                        <option value="img" data-src="https://via.placeholder.com/200x100/3B82F6/FFFFFF?text=Preview">Image</option>
                    </select>
                </div>
                <div>
                    <label for="displayMode" style="display: block; margin-bottom: 5px; font-weight: bold;">Display Mode:</label>
                    <select id="displayMode">
                        <option value="centered">Centered</option>
                        <option value="full-width">Full Width</option>
                        <option value="inline">Inline</option>
                    </select>
                </div>
            </div>
            
            <div style="margin-top: 15px;">
                <label for="classInput" style="display: block; margin-bottom: 5px; font-weight: bold;">Tailwind Classes:</label>
                <textarea id="classInput" 
                         placeholder="e.g., bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
                         rows="3"></textarea>
            </div>
            
            <div style="margin-top: 15px;">
                <label for="customText" style="display: block; margin-bottom: 5px; font-weight: bold;">Custom Text/Content:</label>
                <input type="text" id="customText" placeholder="Hello, Tailwind!" value="Hello, Tailwind!">
            </div>
            
            <div style="margin-top: 15px; display: flex; flex-wrap: wrap; gap: 8px;">
                <button onclick="copyClasses()">📋 Copy Classes</button>
                <button onclick="resetPreview()">🔄 Reset</button>
                <button onclick="showExamples()">💡 Examples</button>
            </div>
        </div>

        <!-- Quick Examples -->
        <div id="examples" style="display: none; margin-bottom: 20px;">
            <h4 style="margin-bottom: 10px;">Quick Examples:</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 5px;">
                <span class="history-item" onclick="loadExample('bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-colors')">Blue Button</span>
                <span class="history-item" onclick="loadExample('bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full shadow-lg')">Gradient Card</span>
                <span class="history-item" onclick="loadExample('border-2 border-gray-300 rounded-lg p-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200')">Input Field</span>
                <span class="history-item" onclick="loadExample('bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded')">Alert Box</span>
                <span class="history-item" onclick="loadExample('bg-white shadow-xl rounded-2xl p-6 border border-gray-100')">Card</span>
                <span class="history-item" onclick="loadExample('text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600')">Gradient Text</span>
            </div>
        </div>

        <!-- History -->
        <div id="historySection" style="margin-bottom: 20px; display: none;">
            <h4 style="margin-bottom: 10px;">Recent Classes:</h4>
            <div id="historyContainer"></div>
        </div>



        <!-- Preview Section -->
        <div class="preview-section">
            <div id="previewContainer" style="width: 100%; text-align: center;">
                <div id="previewElement" class="default-preview">
                    Hello, Tailwind!
                </div>
            </div>
        </div>

        <!-- CSS Code Display -->
        <div style="margin-top: 20px;">
            <h4 style="margin-bottom: 10px;">Generated CSS Classes:</h4>
            <pre id="cssDisplay" style="background-color: var(--vscode-textCodeBlock-background); padding: 15px; border-radius: 4px; border: 1px solid var(--vscode-panel-border); overflow-x: auto; font-size: 12px; color: var(--vscode-textPreformat-foreground);"></pre>
        </div>
    </div>

    <script>
        const vscode = acquireVsCodeApi();
        let history = JSON.parse(localStorage.getItem('tailwind-history') || '[]');

        document.addEventListener('DOMContentLoaded', function() {
            loadHistory();
            updatePreview();
            
            document.getElementById('classInput').addEventListener('input', debounce(updatePreview, 300));
            document.getElementById('elementType').addEventListener('change', updatePreview);
            document.getElementById('displayMode').addEventListener('change', updatePreview);
            document.getElementById('customText').addEventListener('input', debounce(updatePreview, 300));
        });



        function updatePreview() {
            const classInput = document.getElementById('classInput').value.trim();
            const elementType = document.getElementById('elementType').value;
            const displayMode = document.getElementById('displayMode').value;
            const customText = document.getElementById('customText').value || 'Hello, Tailwind!';
            const previewElement = document.getElementById('previewElement');
            const previewContainer = document.getElementById('previewContainer');
            const cssDisplay = document.getElementById('cssDisplay');

            try {
                previewElement.className = '';
                previewElement.innerHTML = '';
                previewElement.removeAttribute('src');
                previewElement.removeAttribute('href');
                previewElement.removeAttribute('placeholder');

                let currentPreviewElement = document.getElementById('previewElement');
                if (!currentPreviewElement) {
                    currentPreviewElement = document.createElement('div');
                    currentPreviewElement.id = 'previewElement';
                    previewContainer.appendChild(currentPreviewElement);
                }

                const elementOption = document.querySelector(\`#elementType option[value="\${elementType}"]\`);
                let newElement;
                
                if (elementType === 'input') {
                    newElement = document.createElement('input');
                    newElement.placeholder = elementOption?.getAttribute('data-placeholder') || customText;
                    newElement.value = customText;
                } else if (elementType === 'img') {
                    newElement = document.createElement('img');
                    newElement.src = elementOption?.getAttribute('data-src') || 'https://via.placeholder.com/200x100/3B82F6/FFFFFF?text=Preview';
                    newElement.alt = customText;
                } else if (elementType === 'a') {
                    newElement = document.createElement('a');
                    newElement.href = elementOption?.getAttribute('data-href') || '#';
                    newElement.textContent = customText;
                } else {
                    newElement = document.createElement(elementType);
                    newElement.textContent = customText;
                }

                if (classInput && classInput.trim()) {
                    newElement.className = classInput;
                } else {
                    newElement.className = 'default-preview';
                }
                newElement.id = 'previewElement';

                if (currentPreviewElement.parentNode) {
                    currentPreviewElement.parentNode.replaceChild(newElement, currentPreviewElement);
                } else {
                    previewContainer.appendChild(newElement);
                }

                const container = previewContainer;
                container.className = '';
                switch(displayMode) {
                    case 'full-width':
                        container.style.textAlign = 'left';
                        container.style.width = '100%';
                        break;
                    case 'inline':
                        container.style.textAlign = 'left';
                        container.style.width = 'auto';
                        container.style.display = 'inline-block';
                        break;
                    default:
                        container.style.textAlign = 'center';
                        container.style.width = '100%';
                        container.style.display = 'block';
                }

                cssDisplay.textContent = classInput || 'No classes applied - showing default styling';

                if (classInput && !history.includes(classInput)) {
                    history.unshift(classInput);
                    if (history.length > 10) {
                        history = history.slice(0, 10);
                    }
                    localStorage.setItem('tailwind-history', JSON.stringify(history));
                    loadHistory();
                }

                vscode.postMessage({
                    type: 'classes-updated',
                    classes: classInput,
                    elementType: elementType
                });

            } catch (error) {
                console.error('Preview error:', error);
            }
        }

        function copyClasses() {
            const classes = document.getElementById('classInput').value;
            if (classes.trim()) {
                vscode.postMessage({
                    type: 'copy-classes',
                    classes: classes
                });
            } else {
                vscode.postMessage({
                    type: 'error',
                    value: 'No classes to copy!'
                });
            }
        }

        function resetPreview() {
            document.getElementById('classInput').value = '';
            document.getElementById('customText').value = 'Hello, Tailwind!';
            document.getElementById('elementType').value = 'div';
            document.getElementById('displayMode').value = 'centered';
            updatePreview();
        }



        function loadHistory() {
            const container = document.getElementById('historyContainer');
            const section = document.getElementById('historySection');
            
            if (history.length > 0) {
                container.innerHTML = history.map(classes => 
                    \`<span class="history-item" onclick="loadClasses('\${classes.replace(/'/g, "\\\\'")}')">\${classes}</span>\`
                ).join('');
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        }



        function loadClasses(classes) {
            document.getElementById('classInput').value = classes;
            updatePreview();
        }

        function loadExample(classes) {
            loadClasses(classes);
        }





        function showExamples() {
            const examples = document.getElementById('examples');
            examples.style.display = examples.style.display === 'none' ? 'block' : 'none';
        }



        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }
    </script>
</body>
</html>`;
}
