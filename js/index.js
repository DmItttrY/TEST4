const DB_NAME = 'fileUploadDB';
const DB_VERSION = 1;
const OBJECT_STORE_NAME = 'fileUploads';

let db;
const request = indexedDB.open(DB_NAME, DB_VERSION);

request.onupgradeneeded = () => {
    db = request.result;

    if (!db.objectStoreNames.contains(OBJECT_STORE_NAME)) {
        db.createObjectStore(OBJECT_STORE_NAME, { autoIncrement: true });
    }
};

request.onsuccess = () => {
    db = request.result;
};

request.onerror = () => {
    console.error('Failed to open indexedDB');
};

const uploadFile = (file) => {
    const transaction = db.transaction([OBJECT_STORE_NAME], 'readwrite');
    const objectStore = transaction.objectStore(OBJECT_STORE_NAME);

    const addRequest = objectStore.add(file);

    addRequest.onsuccess = () => {
        console.log(`Successfully added file ${file.name} to indexedDB`);
    };

    addRequest.onerror = () => {
        console.error(`Failed to add file ${file.name} to indexedDB`);
    };
};

const form = document.getElementById('uploadForm');
const fileInput = document.getElementById('fileInput');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        uploadFile(file);
    }
});