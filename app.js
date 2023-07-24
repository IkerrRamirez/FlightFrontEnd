const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const moment = require('moment-timezone');

const app = express();
const port = 3000;

// Middleware para el análisis del cuerpo de las solicitudes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Configuración de la conexión a la base de datos MySQL
const dbConfig = {
  host: 'localhost',
  user: 'root',    
  password: 'root',
  database: 'flight'  
};

const connection = mysql.createConnection(dbConfig);

function resetDatabase() {
    const dropTableQuery = 'DROP TABLE IF EXISTS comments';
    const createTableQuery = 'CREATE TABLE comments (id INT AUTO_INCREMENT PRIMARY KEY, comment VARCHAR(255), userId INT, flightId INT, tags VARCHAR(255), commentDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)';
  
    connection.query(dropTableQuery, (err) => {
      if (err) {
        console.error('Error al eliminar la tabla:', err);
        return;
      }
  
      connection.query(createTableQuery, (err) => {
        if (err) {
          console.error('Error al crear la tabla:', err);
          return;
        }
  
        console.log('Base de datos reseteada.');
      });
    });
  }

  resetDatabase();

// Endpoint post comment
app.post('/comments', (req, res) => {
  const { comment, userId, flightId, tags } = req.body;

  // Validación de datos
  if (!comment || !userId || !flightId) {
    return res.status(400).json({ error: 'Comment, UserId, and FlightId are mandatory fields.' });
  }

  const commentDate = moment().tz('Europe/Madrid');
  const formattedDate = commentDate.format('YYYY-MM-DD HH:mm:ss');

  // Gestión de duplicados - Verificar si ya existe un comentario con el mismo UserId y FlightId
  const checkDuplicateQuery = 'SELECT * FROM comments WHERE userId = ? AND flightId = ?';
  connection.query(checkDuplicateQuery, [userId, flightId], (error, results) => {
    if (error) {
      console.error('Error querying the database:', error);
      return res.status(500).json({ error: 'Error querying the database.' });
    }

    if (results.length > 0) {
      return res.status(409).json({ error: 'Comment for this UserId and FlightId already exists.' });
    }

    // Create new Coment
    const insertCommentQuery = 'INSERT INTO comments (comment, userId, flightId, tags) VALUES (?, ?, ?, ?)';
    connection.query(insertCommentQuery, [comment, userId, flightId, JSON.stringify(tags), formattedDate], (error, results) => {
      if (error) {
        console.error('Error inserting the comment:', error);
        return res.status(500).json({ error: 'Error inserting the comment.' });
      }
      
      return res.status(201).json({ message: 'Comment created successfully.', commentId: results.insertId });
    });
  });
});
// Endpoint para obtener comentarios para un ID de vuelo específico
app.get('/comments/:flightId', (req, res) => {
  const flightId = req.params.flightId;

  // Obtener comentarios para el ID de vuelo específico
  const getCommentsQuery = 'SELECT * FROM comments WHERE flightId = ?';
  connection.query(getCommentsQuery, [flightId], (error, results) => {
    if (error) {
      console.error('Error querying the database:', error);
      return res.status(500).json({ error: 'Error querying the database.' });
    }

    return res.status(200).json(results);
  });
});

app.get('/comments/tag/:tag', (req, res) => {
  const tag = req.params.tag;

  // Obtener comentarios para la etiqueta específica
  const getCommentsByTagQuery = 'SELECT * FROM comments WHERE tags LIKE ?';
  connection.query(getCommentsByTagQuery, [`%${tag}%`], (error, results) => {
    if (error) {
      console.error('Error querying the database:', error);
      return res.status(500).json({ error: 'Error querying the database.' });
    }

    return res.status(200).json(results);
  });
});

app.get('/comments', (req, res) => {
    const getAllCommentsQuery = 'SELECT * FROM comments';
    connection.query(getAllCommentsQuery, (error, results) => {
      if (error) {
        console.error('Error querying the database:', error);
        return res.status(500).json({ error: 'Error querying the database.' });
      }
  
      return res.status(200).json(results);
    });
  });

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
