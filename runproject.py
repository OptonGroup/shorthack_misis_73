import os


def t1():
    cmd = 'fastapi dev backend/server.py'
    os.system(cmd)

def t2():
    cmd = 'npm start --prefix frontend/'
    os.system(cmd)

from threading import Thread
task1 = Thread(target=t1)
task2 = Thread(target=t2)
task1.run()
task2.run()
