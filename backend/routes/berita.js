const express         = require('express');
const router          = express.Router();
const adminController = require('../controllers/adminController');
const upload          = require('../middleware/upload');

router.get('/',    adminController.getAllPosts);
router.post('/',   upload.single('photo'), adminController.createPost);
router.put('/:id', upload.single('photo'), adminController.updatePost);
router.delete('/:id', adminController.deletePost);
 
module.exports = router;