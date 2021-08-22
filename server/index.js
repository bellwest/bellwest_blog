const express = require('express');
const app = express();
const morgan = require('morgan');
const mysql = require('mysql2');
const cors = require('cors');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'bellwest_blog_db'
});

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/api/get', (req, res) => {
  const sql = "SELECT * FROM posts";
  db.query(sql, (err, result) => {
    res.send(result);
  })
})

app.post('/api/insert', (req, res) => {
  const postTitle = req.body.postTitle;
  const postContent = req.body.postContent;

  const sql = "INSERT INTO posts (post_title, post_content) VALUES (?, ?)";
  db.query(sql, [postTitle, postContent], (err, result) => {
    console.log(result);
  });
});

app.listen(3001, () => {
    console.log('running on port 3001');
});