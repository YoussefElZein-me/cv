function parseMarkdown(markdownText) {
    const lines = markdownText.split('\n');
    let data = [];
    let stack = [];

    function getCurrentParent() {
        return stack.length > 0 ? stack[stack.length - 1] : null;
    }

    lines.forEach(line => {
        let level = 0;
        if (line.startsWith('#')) {
            level = line.indexOf(' ') - 1;
            let title = line.substring(level + 2).trim();
            let node = { title: title, level: level };

            if (level === 0) {
                data.push(node);
                stack = [node];
            } else {
                while (stack.length > level) {
                    stack.pop();
                }
                let parent = getCurrentParent();
                if (!parent.children) {
                    parent.children = [];
                }
                parent.children.push(node);
                stack.push(node);
            }
        } else if (line.startsWith('-')) {
            let content = line.substring(1).trim();
            let parent = getCurrentParent();
            if (!parent.contents) {
                parent.contents = [];
            }
            parent.contents.push(content);
        }
    });

    return data;
}

function createCard(node, level = 0) {
    const card = document.createElement('div');
    card.classList.add('neumorphic-card');
    card.classList.add(`level${level}`);

    // Add title
    const title = document.createElement('h2');
    title.textContent = node.title;
    card.appendChild(title);

    // Add container for contents
    const container = document.createElement('div');
    card.appendChild(container);

    // Handle children
    if (node.children) {
        node.children.forEach(child => {
            const childCard = createCard(child, level + 1);
            container.appendChild(childCard);
        });
    } else if (node.contents) {
        // List contents directly under the title
        const list = document.createElement('ul');
        node.contents.forEach(content => {
            const listItem = document.createElement('li');
            listItem.textContent = content;
            list.appendChild(listItem);
        });
        container.appendChild(list);
    }

    return card;
}

// Fetch Markdown file from GitHub
fetch('https://raw.githubusercontent.com/youssefelzein-me/cv/main/cv_data.md')
    .then(response => response.text())
    .then(markdownText => {
        // Parse Markdown text
        const markdownData = parseMarkdown(markdownText);

        // Generate the HTML structure
        const cvContainer = document.getElementById('cv-container');
        markdownData.forEach(section => {
            const mainCard = createCard(section);
            cvContainer.appendChild(mainCard);
        });
    })
    .catch(error => console.error('Error:', error));
