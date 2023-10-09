// Example content for routes/minioRoutes.js
const express = require('express');
const minioController = require('../controllers/minioController');
const multer = require('multer');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

// Routes for MinIO CRUD operations
router.get('/buckets', minioController.listBuckets);
router.post('/buckets', minioController.createBucket);
router.post('/upload', upload.single('file'), minioController.uploadFile);
router.get('/download/:bucketName/:fileName', minioController.downloadFile);
router.delete('/delete/:bucketName/:fileName', minioController.deleteFile);
router.delete('/buckets/:bucketName', minioController.deleteBucket);

module.exports = router;



