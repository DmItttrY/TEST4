let request = indexedDB.open('myDB', 1);
let db;

request.onerror = function() {
    console.log('Не удалось открыть базу данных');
};

request.onsuccess = function() {
    console.log('База данных успешно открыта');
    db = request.result;
};
const submitOlimpiad = () => {
    let obl = document.getElementById('selectOblUch');
    // let obl = oblSel.options[oblSel.selectedIndex].value;
    let stat = document.getElementById('selectStaUch');
    let urov = document.getElementById('selectUrovUch');
    let name = document.getElementById('name');
    let date = document.getElementById('date');
    let photo = document.getElementById('photo');
    const file = photo.files[0];

    addOlimpiadTo(db, obl.value, stat.value, urov.value, name.value, date.value, file);

    obl.value = '';
    stat.value = '';
    urov.value = '';
    name.value = '';
    date.value = '';
    photo.value = '';
}
const addOlimpiadTo = (db, obl, stat, urov, name, date, photo) => {
    // Запустим транзакцию базы данных и получите хранилище объектов Notes
    let trans = db.transaction('Olimpiad', 'readwrite');
    let store = trans.objectStore('Olimpiad');
    // Добаляем заметку в хранилище объектов
    let post =
        {Obl: obl, Stat: stat,Urov :urov, Name: name,
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

