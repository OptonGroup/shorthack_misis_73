import os


def t1():
    cmd = 'fastapi dev backend/server.py'
    os.system(cmd)

def t2():
    cmd = 'npm start --prefix frontend/'
    os.system(cmd)

import subprocess

subprocess.call(['gnome-terminal', '-x', 'fastapi', 'dev', 'backend/server.py'])
subprocess.call(['gnome-terminal', '-x', 'npm', 'start', '--prefix', 'frontend/'])