import sqlite3

class cdb:
    def __init__(self):
        self.conn = sqlite3.connect('database.db')
        self.cur = self.conn.cursor()
        self.cur.execute('''
            CREATE TABLE IF NOT EXISTS users
            (
                id INTEGER PRIMARY KEY,
                username TEXT unique not null,
                password TEXT not null
            )
        ''')
        self.cur.execute('''
            CREATE TABLE IF NOT EXISTS notes
            (
                id INTEGER PRIMARY KEY, 
                owner text, 
                title text, 
                description text, 
                time_create timestamp without time zone
            )
        ''')
        self.cur.execute('''
            CREATE TABLE IF NOT EXISTS todos
            (
            id INTEGER PRIMARY KEY, 
            owner text, 
            title text, 
            is_done text
            )
        ''')
        self.columns_users = ['id', 'username', 'password']
        self.columns_notes = ['id', 'owner', 'title', 'description', 'time_create']
        self.columns_todo = ['id', 'owner', 'title', 'is_done']
        self.conn.commit()

    def add_user(self, user):
        self.cur.execute(f'''
            INSERT INTO users(username, password)
            VALUES ('{user['username']}', '{user['password']}')
        ''')
        self.conn.commit()

    def get_all_users(self):
        self.cur.execute("SELECT * FROM users")
        users = self.cur.fetchall()
        return users

    def get_user(self, username):
        self.cur.execute(f'''SELECT * FROM users WHERE username = '{username}' ''')
        user_info = self.cur.fetchone()
        if not user_info:
            return None
        user = {self.columns_users[i]: user_info[i] for i in range(len(self.columns_users))}
        return user

    def get_notes(self, username):
        self.cur.execute(f'''SELECT * FROM notes WHERE owner = '{username}' ''')
        notes_info = self.cur.fetchall()
        notes = []
        for note in notes_info:
            notes.append({
                self.columns_notes[i]: note[i] for i in range(len(self.columns_notes))
            })
        return notes
    
    def add_note(self, note, username):
        self.cur.execute(f'''
            INSERT INTO notes(owner, title, description)
            VALUES ('{username}', '{note['title']}', '{note['description']}')
        ''')
        self.conn.commit()
        
    def save_note(self, note_id, title):
        self.cur.execute(f'''
            Update notes
            Set    title = '{title}'
            Where
                id = {note_id}
        ''')
        self.conn.commit()

    def get_todos(self, username):
        self.cur.execute(f'''SELECT * FROM todos WHERE owner = '{username}' ''')
        todo_info = self.cur.fetchall()
        todos = []
        for todo in todo_info:
            todos.append({
                self.columns_todo[i]: todo[i] for i in range(len(self.columns_todo))
            })
        return todos
    
    def add_todo(self, todo, username):
        self.cur.execute(f'''
            INSERT INTO todos(owner, title)
            VALUES ('{username}', '{todo['title']}')
        ''')
        self.conn.commit()

    def __del__(self):
        self.conn.close()
        
    
db = cdb()