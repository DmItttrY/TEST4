let request = indexedDB.open('myDB', 1);
let db;

request.onerror = function() {
    console.log('Не удалось открыть базу данных');
};

request.onsuccess = function() {
    console.log('База данных успешно открыта');
    db = request.result;
    displayOlimpiads();
    displayPrises();
    displayAttestation();
};
