let request = indexedDB.open('myDB', 1);
let db;

request.onerror = function() {
    console.log('Не удалось открыть базу данных');
};

request.onsuccess = function() {
    console.log('База данных успешно открыта');
    db = request.result;
    initiate();
};
function initiate() {
    let databox = document.getElementById('databox');
    databox.innerHTML = '';
    let transaction = db.transaction (['Student']);
    let objectStore = transaction.objectStore ('Student');
    let request = objectStore.openCursor();
    request.onsuccess = function() {
        let cursor = request.result;
        if (cursor) {
            let key = cursor.key; // ключ Student (поле id)
            let value = cursor.value; // объект Student
            databox.innerHTML = '<div> Информацция о Студенте: <br>' + 'ФИО:' + cursor.value.FIO + '<br>' +
                'Курс:' + cursor.value.Kurs + '<br>' + 'Группа:' + cursor.value.Group + '<br>' +
                'Пол:' + cursor.value.Male + '<br>' + 'E-mail:' + cursor.value.Email + '<br>' +
                'Количество "4":' + cursor.value.Count4 + '<br>' + 'Количество "5":' + cursor.value.Count5 + '</div>';
            console.log(key, value);
            cursor.continue();
        } else {
            console.log("Книг больше нет");
        }
    };

}

