import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js';


const STORAGE_KEY = 'codeBlockDB'

export const codeBlockService = {
    query,
    getById,
    save,
    remove,
}
const CODEBLOCKS = [
    {
        "_id": "b001",
        "title": "Async case",
        "codeContent": `async function fetchData() {
                        const response = await fetch('https://api.example.com/data');
                        const data = await response.json();
                        console.log(data);
    }`
    },
    {
        "_id": "b002",
        "title": "Promises example",
        "codeContent": `const promise = new Promise((resolve, reject) => {
                            setTimeout(() => {
                                resolve('Promise resolved!');
                            }, 2000);
                            });

                            promise.then((result) => {
                            console.log(result);
                        });`
    },
    {
        "_id": "b003",
        "title": "Event-driven programming",
        "codeContent": `document.addEventListener('click', function(event) {
                            const x = event.clientX;
                            const y = event.clientY;
                            console.log(\`Clicked at (\${x}, \${y})\`);
                            });`
    },
    {
        "_id": "b004",
        "title": "RESTful API endpoint",
        "codeContent": `app.get('/api/resource', function(req, res) {
                        const resourceId = req.params.resourceId;
                        
                        // Fetch resource from the database
                        const resource = db.getResourceById(resourceId);
                        
                        // Send the resource as JSON response
                        res.json(resource);
                        });`
    },
];

_createCodeBlocks()

async function query() {
    var codeBlocks = await storageService.query(STORAGE_KEY)
    return codeBlocks
}

function getById(codeBlockId) {
    return storageService.get(STORAGE_KEY, codeBlockId)
}

async function remove(codeBlockId) {
    await storageService.remove(STORAGE_KEY, codeBlockId)
}

async function save(codeBlock) {
    var savedCodeBlock
    if (codeBlock._id) {
        savedCodeBlock = await storageService.put(STORAGE_KEY, codeBlock)
    } else {
        savedCodeBlock = await storageService.post(STORAGE_KEY, { ...getEmptycodeBlock(), title: codeBlock.title, style: { backgroundImage: codeBlock.style.backgroundImage } })
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