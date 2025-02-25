CREATE DATABASE file_explorer_db;
USE file_explorer_db;

CREATE TABLE folders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent_id INT DEFAULT NULL,
    FOREIGN KEY (parent_id) REFERENCES folders(id) ON DELETE CASCADE
);

CREATE TABLE files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    extension VARCHAR(10) NOT NULL,
    folder_id INT,
    size INT NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (folder_id) REFERENCES folders(id) ON DELETE CASCADE
);

INSERT INTO folders (name, parent_id) VALUES ('C:', NULL); 
INSERT INTO folders (name, parent_id) VALUES ('Users', 1); 
INSERT INTO folders (name, parent_id) VALUES ('Raphaël Gosset', 2); 

INSERT INTO folders (name, parent_id) VALUES ('Documents', 3);
INSERT INTO folders (name, parent_id) VALUES ('Téléchargements', 3);
INSERT INTO folders (name, parent_id) VALUES ('Images', 3);
INSERT INTO folders (name, parent_id) VALUES ('Musique', 3);

INSERT INTO folders (name, parent_id) VALUES ('Dossier1', 4); 
INSERT INTO folders (name, parent_id) VALUES ('Dossier2', 4); 

INSERT INTO files (name, extension, folder_id, size) VALUES ('fichier1.txt', 'txt', 4, 20); 
INSERT INTO files (name, extension, folder_id, size) VALUES ('image1.jpg', 'jpg', 5, 150); 
INSERT INTO files (name, extension, folder_id, size) VALUES ('fichier.zip', 'zip', 6, 500);
INSERT INTO files (name, extension, folder_id, size) VALUES ('musique.mp3', 'mp3', 7, 300); 

