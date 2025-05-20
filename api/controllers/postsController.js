const db = require('../database/database');

// CREATE post
const createPost = async (req, res) => {
    const { titulo, descricao } = req.body;
    if (!titulo || !descricao) {
        return res.status(400).json({ message: 'Title and content are required' });
    }
    const sql = 'INSERT INTO tbl_posts (titulo, descricao) VALUES (?, ?)';
    db.run(sql, [titulo, descricao], function (err) {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        res.status(201).json({ id: this.lastID, titulo, descricao });
    });
};

// READ all posts
const getAllPosts = async (req, res) => {
    const sql = 'SELECT * FROM tbl_posts';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        res.status(200).json(rows);
    });
};

// UPDATE post
const updatePost = async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao } = req.body;
    if (!titulo || !descricao) {
        return res.status(400).json({ message: 'Title and content are required' });
    }
    const sql = 'UPDATE tbl_posts SET titulo = ?, descricao = ? WHERE id = ?';
    db.run(sql, [titulo, descricao, id], function (err) {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ id, titulo, descricao });
    });
};

// DELETE post
const deletePost = async (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM tbl_posts WHERE id = ?';
    db.run(sql, [id], function (err) {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(204).send();
    });
};

module.exports = {
    createPost,
    getAllPosts,
    updatePost,
    deletePost
};