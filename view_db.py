import sqlite3

# Conectando ao banco de dados
conn = sqlite3.connect('gifts.db')
c = conn.cursor()

# Consultando todos os presentes cadastrados
c.execute('SELECT * FROM presents')

# Recuperando todos os dados da consulta
gifts = c.fetchall()

# Exibindo os dados dos presentes
for gift in gifts:
    print(f"ID: {gift[0]}, Nome: {gift[1]}, Descrição: {gift[2]}, Imagem: {gift[3]}, Status: {gift[4]}")

# Fechando a conexão
conn.close()