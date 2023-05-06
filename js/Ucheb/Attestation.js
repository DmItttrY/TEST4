let request = indexedDB.open('myDB', 1);
let db;

request.onerror = function() {
    console.log('Не удалось открыть базу данных');
};

request.onsuccess = function() {
    console.log('База данных успешно открыта');
    db = request.result;
};
const submitAttest = () => {
    let photo = document.getElementById('photo');
    let file = photo.files[0];

    addAttestation(db,file);
    photo.value = '';
}
const addAttestation = (db, photo) => {
    // Запустим транзакцию базы данных и получите хранилище объектов Notes
    let trans = db.transaction('Attestation', 'readwrite');
    let store = trans.objectStore('Attestation');
    // Добаляем заметку в хранилище объектов
    let post =
        {Photo: photo};
    store.add(post);
    // Ожидаем завершения транзакции базы данных
    trans.oncomplete = () => {
        console.log('stored note!')
    }
    trans.onerror = (event) => {
        alert('error storing note ' + event.target.errorCode);
    }
}
