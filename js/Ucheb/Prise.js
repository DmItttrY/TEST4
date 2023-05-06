let request = indexedDB.open('myDB', 1);
let db;

request.onerror = function() {
    console.log('Не удалось открыть базу данных');
};

request.onsuccess = function() {
    console.log('База данных успешно открыта');
    db = request.result;
};
const submitPrise = () => {
    let type = document.getElementById('selectStipend');
    let obl = document.getElementById('selectOblUch');
    let stat = document.getElementById('selectStaUch');
    let urov = document.getElementById('selectUrovUch');
    let name = document.getElementById('name');
    let date = document.getElementById('date');
    let photo = document.getElementById('photo');
    const file = photo.files[0];

    addPrise(db,type.value, obl.value, stat.value, urov.value, name.value, date.value, file);
    type.value = '';
    obl.value = '';
    stat.value = '';
    urov.value = '';
    name.value = '';
    date.value = '';
    photo.value = '';
}
const addPrise = (db, type, obl, stat, urov, name, date, photo) => {
    // Запустим транзакцию базы данных и получите хранилище объектов Notes
    let trans = db.transaction('Prise', 'readwrite');
    let store = trans.objectStore('Prise');
    // Добаляем заметку в хранилище объектов
    let post =
        {Type: type, Obl: obl, Stat: stat,Urov :urov, Name: name,
            Date: date, Photo: photo};
    store.add(post);
    // Ожидаем завершения транзакции базы данных
    trans.oncomplete = () => {
        console.log('stored note!')
    }
    trans.onerror = (event) => {
        alert('error storing note ' + event.target.errorCode);
    }
}
