Базовый url для запросов - https://uxcandy.com/~shapoval/test-task-backend/v2

Ожидаемый MIME-type для POST-запросов - multipart/form-data

Ответ сервера - в формате json. 
Ответ может содержать два поля:

status - текстовая строка - "ok" в случае успешного запроса, "error" в случае ошибки
message - текстовая строка или ассоциативный массив - сообщение с результатами запроса (в случае успешного выполнения), сообщение об ошибке (в случае ошибки), поля может не быть или оно может быть пустым
Для всех ответов GET-параметр "developer" является обязательным. 
Просьба указывать в этом параметре своё имя. 
Если параметр не получен, будет возвращено сообщение об ошибке:

    {
        "status": "error",
        "message": "Не передано имя разработчика"
    }
            
Список задач (/):
Обратите внимание - есть разница между https://uxcandy.com/~shapoval/test-task-backend/v2?developer=Name и https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=Name. Правильным является последний вариант.

Допустимые параметры (GET):

sort_field (id | username | email | status) - поле, по которому выполняется сортировка
sort_direction (asc | desc) - направление сортировки
page - номер страницы для пагинации
В ответе сервер в поле "message" передаёт два параметра - "tasks" (список задач на странице) и "total_task_count" (общее количество задач)

Пример ответа:

    {
        "status": "ok",
        "message": {
            "tasks": [
                {
                    "id": 1,
                    "username": "Test User",
                    "email": "test_user_1@example.com",
                    "text": "Hello, world!",
                    "status": 10,
                },
                {
                    "id": 3,
                    "username": "Test User 2",
                    "email": "test_user_2@example.com",
                    "text": "Hello from user 2!",
                    "status": 0,
                },
                {
                    "id": 4,
                    "username": "Test User 3",
                    "email": "test_user_3@example.com",
                    "text": "Hello from user 3!",
                    "status": 0,
                }
            ],
            "total_task_count": "5"
        }
    }
            
Добавление задачи (/create):
Обязательные параметры (POST):

username - текстовое поле - имя пользователя, который добавляет задачу
email - текстовое поле - email-адрес пользователя, который добавляет задачу, email-адрес должен быть валидным
text - текстовое поле - текст задачи
Пример запроса (jquery ajax):

    $(document).ready(function() {
        var form = new FormData();
        form.append("username", "Example");
        form.append("email", "example@example.com");
        form.append("text", "Some text");

        $.ajax({
            url: 'https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=Example',
            crossDomain: true,
            method: 'POST',
            mimeType: "multipart/form-data",
            contentType: false,
            processData: false,
            data: form,
            dataType: "json",
            success: function(data) {
                console.log(data);
            }
        });
    });
            
Пример ответа (успешное добавление):

    {
        "status": "ok",
        "message": {
            "id": 8,
            "username": "Example user",
            "email": "123@example.com",
            "text": "Some text",
            "status": 0
        }
    }
            
Пример ответа (ошибка при добавлении):

    {
        "status": "error",
        "message": {
            "username": "Поле является обязательным для заполнения",
            "email": "Неверный email",
            "text": "Поле является обязательным для заполнения"
        }
    }
            
Логин (/login):
Для проверки данных пользователя нужно в POST передать два поля - username и password. Значения этих полей можно найти в тексте задания.

В случае успешной авторизации в теле сообщения будет передан авторизационный токен, срок жизни которого - 1 день (24 часа).

Пример ответа (ошибка авторизации):

    {
        "status": "error",
        "message": {
            "username": "Поле является обязательным для заполнения",
            "password": "Неверный логин или пароль"
        }
    }
            
Пример ответа:

    {
        "status": "ok"
    }
            
Редактирование задачи (/edit/:id):
Редактирование доступно только для авторизованных пользователей (см логин). В качестве POST-параметра нужно передать авторизационный токен (в поле token). Время жизни токена авторизации - 24 часа.

Допустимые параметры редактирования:

text - тестовое поле - текст задачи
status - числовое поле - статус выполнения задачи (0 - задача не выполнена, 10 - задача выполнена)
Пример ответа (ошибка авторизации):

    {
        "status": "error",
        "message": {
            "token": "Токен истёк"
        }
    }
            
Пример ответа:

    {
        "status": "ok"
    }
            