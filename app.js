
const express = require('express');
const bodyParser = require('body-parser');
const minioRoutes = require('./routes/minioRoutes');

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

app.use('/api/minio', minioRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
