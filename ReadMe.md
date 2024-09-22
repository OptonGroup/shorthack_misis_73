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
uvicorn backend.server:app --host 0.0.0.0 --port 8000
```