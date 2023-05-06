let db;
let dbReq = indexedDB.open('myDB', 1);
dbReq.onupgradeneeded = (event) => {
    // Зададим переменной db ссылку на базу данных
    db = event.target.result;
    // Создадим хранилище объектов с именем Student.
    let Student = db.createObjectStore('Student',  {keyPath: 'id'}/*{autoIncrement: true}*/);
    let Grant = db.createObjectStore('Grant', {autoIncrement: true});
    let Attestation = db.createObjectStore('Attestation', {autoIncrement: true});
    let Olimpiad = db.createObjectStore('Olimpiad', {autoIncrement: true});
    let Prise = db.createObjectStore('Prise', {autoIncrement: true});

    //let index = Student.createIndex('Fio_idx', 'FIO');
}
dbReq.onsuccess = (event) => {
    db = event.target.result;
    //addStudent(db, "Иванов Иван Иванович", 3, 313, "male", ":ivanchik@mail.ru");
}
dbReq.onerror = (event) => {
    alert('error opening database ' + event.target.errorCode);
}

function saveGlobalVar(name, value) {
    localStorage.setItem(name, value); // сохраняем в localStorage значение
}

const addStudent = (db, fio, kurs, group, male, email, photoZ, count4, count5) => {
    // Запустим транзакцию базы данных и получите хранилище объектов Notes
    let tx = db.transaction(['Student'], 'readwrite');
    let store = tx.objectStore('Student');
    // Добаляем заметку в хранилище объектов
    let post = {id : 1, FIO: fio, Kurs: kurs,Group :group, Male: male,
        Email: email, PhotoZ: photoZ, Count4: count4, Count5: count5};
    //saveGlobalVar(FIOStudent, fio);
    store.put(post);

    // Ожидаем завершения транзакции базы данных
    tx.oncomplete = () => {
        console.log('stored note!')
    }
    tx.onerror = (event) => {
        alert('error storing note ' + event.target.errorCode);
    }
}
const submitStudent = () => {
    let fio = document.getElementById('fio');
    let kurs = document.getElementById('kur');
    let group = document.getElementById('group');
    let male = document.getElementById('male');
    let email = document.getElementById('email');
    let photoZ = document.getElementById('photo');
    let count4 = document.getElementById('count4');
    let count5 = document.getElementById('count5');
    let file = photoZ.files[0];

    addStudent(db,fio.value, kurs.value, group.value, male.value, email.value, file, count4.value, count5.value);
    fio.value = '';
    kurs.value = '';
    group.value = '';
    male.value = '';
    email.value = '';
    photoZ.value = '';
    count4.value = '';
    count5.value = '';
    var loc = window.location.pathname;
    var dir = loc.substring(0, loc.lastIndexOf('/'));
    document.location = dir + '/menu.html';
}





