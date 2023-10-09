// Example content for controllers/minioController.js
const Minio = require('minio');
const minioConfig = require('../config/minio');

const minioClient = new Minio.Client(minioConfig);


// implement all the controllers here

// Get a list of buckets
exports.listBuckets = (req, res) => {
    minioClient.listBuckets((err, buckets) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve buckets from MinIO.' });
      } else {
        res.json(buckets);
      }
    });
  };
  
  // Create a bucket
  exports.createBucket = async (req, res) => {
    const {bucketName } = req.body; // Assuming the bucket name is passed in the request body

    console.log(bucketName)
  
  await  minioClient.makeBucket(bucketName, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create the bucket.' });
      } else {
        res.json({ message: 'Bucket created successfully.' });
      }
    });
  };
  
  // Upload a file to a bucket
  exports.uploadFile = (req, res) => {
    const {bucketName }  = req.body; // Assuming the bucket name is passed in the request body
    const file = req.file; // Assuming you're using a file upload middleware like multer
  
    minioClient.fPutObject(bucketName, file.originalname, file.path, (err, etag) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to upload the file.' });
      } else {
        res.json({ message: 'File uploaded successfully.', etag });
      }
    });
  };
  
  // Download a file from a bucket
  exports.downloadFile = (req, res) => {
    const bucketName = req.params.bucketName; // Assuming the bucket name is passed as a URL parameter
    const fileName = req.params.fileName; // Assuming the file name is passed as a URL parameter
  
    const fileStream = minioClient.getObject(bucketName, fileName);
    fileStream.pipe(res);
  };
  
  // Delete a file from a bucket
  exports.deleteFile = (req, res) => {
    const bucketName = req.params.bucketName; // Assuming the bucket name is passed as a URL parameter
    const fileName = req.params.fileName; // Assuming the file name is passed as a URL parameter
  
    minioClient.removeObject(bucketName, fileName, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete the file.' });
      } else {
        res.json({ message: 'File deleted successfully.' });
      }
    });
  };
  
  // Delete a bucket
  exports.deleteBucket = (req, res) => {
    const bucketName = req.params.bucketName; // Assuming the bucket name is passed as a URL parameter
  
    minioClient.removeBucket(bucketName, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete the bucket.' });
      } else {
        res.json({ message: 'Bucket deleted successfully.' });
      }
    });
  };
