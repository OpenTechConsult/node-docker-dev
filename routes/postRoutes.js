const express = require('express')

const postController = require('../controllers/postController')

// create a new router
const router = express.Router()

// defining our routes
router
  .route('/')
  .get(postController.getAllPosts)
  .post(postController.createPost)

router
  .route('/:id')
  .get(postController.getOnePost)
  .patch(postController.updatePost)
  .delete(postController.deletePost)

module.exports = router