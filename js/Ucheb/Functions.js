
function displayOlimpiads() {
    let transaction = db.transaction(["Olimpiad"], "readonly");
    let content="<table class='table table-bordered table-striped'><thead><tr><th>Название</th><th>Информация</th><th>Удалить запись</td></thead><tbody>";
    transaction.oncomplete = function(event) {
        $("#OlimpiadList").html(content);
    };
    // let data = document.getElementById('OlimpiadList');
    // data.innerHTML = "Hi";


    let handleResult = function(event) {
        let cursor = event.target.result;
        if (cursor) {
            content += "<tr data-key=\""+cursor.key+"\"><td class=\"notetitle\">"+cursor.value.Name+"</td>";
            content += "<td>" + 'Статус участия:' + cursor.value.Stat +
                ' Уровень участия:' + cursor.value.Urov + ' Дата участия:'
                + cursor.value.Date+"</td>";
            content += "<td><a class=\"btn btn-danger delete\">Удалить</a></td>";
            content +="</tr>";
            cursor.continue();
        }
        else {
            content += "</tbody></table>";
            $("#OlimpiadList").on("click", "a.delete", function(e) {
                let thisId = $(this).parent().parent().data("key");
                let t = db.transaction(["Olimpiad"], "readwrite");
                let request = t.objectStore("Olimpiad").delete(thisId);
                t.oncomplete = function(event) {
                    displayOlimpiads(); // обновляем таблицу после удаления записи
                };
                return false;
            });
        }
    };
    let objectStore = transaction.objectStore("Olimpiad");
    objectStore.openCursor().onsuccess = handleResult;

}
function displayPrises() {
    let transaction = db.transaction(["Prise"], "readonly");
    let content="<table class='table table-bordered table-striped'><thead><tr><th>Название</th><th>Информация</th><th>Удалить запись</td></thead><tbody>";
    transaction.oncomplete = function(event) {
        $("#PriseList").html(content);
    };
    let handleResult = function(event) {
        let cursor = event.target.result;
        if (cursor) {
            content += "<tr data-key=\""+cursor.key+"\"><td class=\"notetitle\">"+cursor.value.Name+"</td>";
            content += "<td>" + 'Статус участия:' + cursor.value.Stat +
                ' Уровень участия:' + cursor.value.Urov + ' Дата участия:'
                + cursor.value.Date+"</td>";
            content += "<td><a class=\"btn btn-danger delete\">Удалить</a></td>";
            content +="</tr>";
            cursor.continue();
        }
        else {
            content += "</tbody></table>";
            $("#PriseList").on("click", "a.delete", function(e) {
                let thisId = $(this).parent().parent().data("key");
                let t = db.transaction(["Prise"], "readwrite");
                let request = t.objectStore("Prise").delete(thisId);
                t.oncomplete = function(event) {
                    displayPrises(); // обновляем таблицу после удаления записи
                };
                return false;
            });
        }
    };
    let objectStore = transaction.objectStore("Prise");
    objectStore.openCursor().onsuccess = handleResult;

}
function displayAttestation() {
    let transaction = db.transaction(["Attestation"], "readonly");
    let content="<table class='table table-bordered table-striped'><thead><tr><th>Название</th><th>Информация</th><th>Удалить запись</td></thead><tbody>";
    transaction.oncomplete = function(event) {
        $("#AttestationList").html(content);
    };
    let handleResult = function(event) {
        let cursor = event.target.result;
        if (cursor) {
            content += "<tr data-key=\""+cursor.key+"\"><td class=\"notetitle\">"+cursor.value.Name+"</td>";
            content += "<td>" + "Добавлено!</td>";
            content += "<td><a class=\"btn btn-danger delete\">Удалить</a></td>";
            content +="</tr>";
            cursor.continue();
        }
        else {
            content += "</tbody></table>";
            $("#AttestationList").on("click", "a.delete", function(e) {
                let thisId = $(this).parent().parent().data("key");
                let t = db.transaction(["Attestation"], "readwrite");
                let request = t.objectStore("Attestation").delete(thisId);
                t.oncomplete = function(event) {
                    displayAttestation(); // обновляем таблицу после удаления записи
                };
                return false;
            });
        }
    };
    let objectStore = transaction.objectStore("Attestation");
    objectStore.openCursor().onsuccess = handleResult;

}
