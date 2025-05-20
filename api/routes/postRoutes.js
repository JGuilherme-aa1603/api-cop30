const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController.js');

router.post('/', postsController.createPost);
router.get('/', postsController.getAllPosts);
router.put('/:id', postsController.updatePost);
router.delete('/:id', postsController.deletePost);

module.exports = router;