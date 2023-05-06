import * as docx from "docx";
let request = indexedDB.open('myDB', 1);
let db;

request.onerror = function() {
    console.log('Не удалось открыть базу данных');
};

request.onsuccess = function() {
    console.log('База данных успешно открыта');
    db = request.result;
    //exportToWord();
};
export const exportToWord = () => {
    // Создаем документ
    const doc = new docx.Document();

    // Получаем данные из базы данных
    const trans = db.transaction('Prise', 'readonly');
    const store = trans.objectStore('Prise');
    const request = store.getAll();

    request.onerror = (event) => {
        alert('error fetching data ' + event.target.errorCode);
    };

    request.onsuccess = () => {
        const data = request.result;

        // Добавляем заголовок
        const title = new docx.Paragraph('Данные из базы данных');
        title.heading1();

        // Добавляем таблицу с данными
        const table = new docx.Table({
            rows: [
                new docx.TableRow({
                    children: [
                        new docx.TableCell('Тип стипендии'),
                        new docx.TableCell('Область учебы'),
                        new docx.TableCell('Статус учебы'),
                        new docx.TableCell('Уровень учебы'),
                        new docx.TableCell('ФИО'),
                        new docx.TableCell('Дата рождения'),
                        new docx.TableCell('Фото')
                    ],
                }),
                ...data.map((item) => {
                    return new docx.TableRow({
                        children: [
                            new docx.TableCell(item.Type),
                            new docx.TableCell(item.Obl),
                            new docx.TableCell(item.Stat),
                            new docx.TableCell(item.Urov),
                            new docx.TableCell(item.Name),
                            new docx.TableCell(item.Date),
                            new docx.TableCell(item.Photo)
                        ],
                    });
                })
            ]
        });

        // Добавляем заголовок и таблицу в документ
        doc.addParagraph(title);
        doc.addTable(table);

        // Создаем файл и скачиваем его
        const packer = new docx.Packer();
        packer.toBlob(doc).then(blob => {
            saveAs(blob, 'data.docx');
        });
    };
}