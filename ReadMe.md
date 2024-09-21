## Загрузить все библиотеки для сервера
```
pip install -r backend/requirements.txt
```

## !!!ЗАПУСКАТЬ ПРОЕКТ В ДВУХ ТЕРМИНАЛАХ
Первый терминал
```
npm start --prefix frontend/
```

Второй терминал
```
fastapi dev backend/server.py
```