# Cancellazione di un database
DROP DATABASE IF EXISTS dbapp;

# Creo un nuovo database
CREATE DATABASE dbapp;

# Seleziono il database nel quale creare le tabelle
USE dbapp;

CREATE TABLE users (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome VARCHAR(30),
    cognome VARCHAR(30),
    indirizzo VARCHAR(50),
    cap CHAR(5),
    citta VARCHAR(50),
    provincia CHAR(2),
    telefono VARCHAR(20),
    cell VARCHAR(20),
    mail VARCHAR(100),
    username VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    ruolo VARCHAR(13) NOT NULL
);

CREATE TABLE prodotti(
    marca VARCHAR(20) NOT NULL,
    barcode VARCHAR(10) PRIMARY KEY NOT NULL,
    prezzo DECIMAL (3,2) NOT NULL,
    tipo VARCHAR(20) NOT NULL
);

CREATE TABLE recensioni(
    valutazione NUMERIC(1) NOT NULL,
    user VARCHAR(20),
    descrizione VARCHAR(100) NOT NULL,
    prodotto VARCHAR(20) REFERENCES prodotti(barcode) 
);

CREATE TABLE logs (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    event VARCHAR(200),
    eventtime TIMESTAMP
);