import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js';


const STORAGE_KEY = 'codeBlockDB'

export const codeBlockService = {
    query,
    getById,
    save,
    remove,
    getEmptyCodeBlock
}
const CODEBLOCKS = [
    {
        "_id": "b001",
        "title": "Async case",
        "codeContent": `async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        console.log(data);
        
        // Perform additional operations with the data
        const processedData = processAsyncData(data);
        console.log(processedData);

        // Update the UI with the processed data
        updateUI(processedData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}`
    },
    {
        "_id": "b002",
        "title": "Promises example",
        "codeContent": `function delayedExecution() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Promise resolved!');
        }, 2000);
    });
}

async function executePromise() {
    try {
        const result = await delayedExecution();
        console.log(result);

        // Perform additional operations after resolving the promise
        handlePromiseResult(result);
    } catch (error) {
        console.error('Promise rejected:', error);
    }
}`
    },
    {
        "_id": "b003",
        "title": "Event-driven programming",
        "codeContent": `document.addEventListener('click', function(event) {
    const x = event.clientX;
    const y = event.clientY;
    console.log(\`Clicked at (\${x}, \${y})\`);
    
    // Check if the click is within a specific region
    if (isWithinRegion(x, y)) {
        // Perform actions specific to the region
        handleRegionClick();
    } else {
        // Handle clicks outside the specific region
        handleOutsideRegionClick();
    }
}`
    },
    {
        "_id": "b004",
        "title": "RESTful API endpoint",
        "codeContent": `app.get('/api/resource/:resourceId', function(req, res) {
    const resourceId = req.params.resourceId;
    
    try {
        // Fetch resource from the database
        const resource = db.getResourceById(resourceId);
        
        if (resource) {
            // Send the resource as JSON response
            res.json(resource);
        } else {
            // Handle resource not found
            res.status(404).json({ error: 'Resource not found' });
        }
    } catch (error) {
        console.error('Error fetching resource:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}`
    },
];


_createCodeBlocks()

async function query() {
    var codeBlocks = await storageService.query(STORAGE_KEY)
    console.log('codeBlocks query:', codeBlocks)
    return codeBlocks
}

async function getById(codeBlockId) {
    return await storageService.get(STORAGE_KEY, codeBlockId)
}

async function remove(codeBlockId) {
    await storageService.remove(STORAGE_KEY, codeBlockId)
}

async function save(codeBlock) {
    var savedCodeBlock
    if (codeBlock._id) {
        savedCodeBlock = await storageService.put(STORAGE_KEY, codeBlock)
    } else {
        savedCodeBlock = await storageService.post(STORAGE_KEY, { ...getEmptyCodeBlock(), title: codeBlock.title, })
    }
    return savedCodeBlock
}

function _createCodeBlocks() {
    let codeBlocks = storageService.loadFromStorage(STORAGE_KEY)
    if (!codeBlocks || !codeBlocks.length) {
        codeBlocks = CODEBLOCKS
        storageService.saveToStorage(STORAGE_KEY, codeBlocks)
    }
}

function getEmptyCodeBlock() {
    return {
        "_id": "",
        "title": "",
        "codeContent": ""
    }
}
