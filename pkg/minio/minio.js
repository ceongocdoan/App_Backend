const Minio = require('minio');
const fs = require('fs');

const imageFolder = './pkg/assets';

const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT || 'localhost',
    port: parseInt(process.env.MINIO_PORT) || 9000,
    useSSL: process.env.MINIO_USESSL === 'true' || false,
    accessKey: process.env.MINIO_ACCESSKEY,
    secretKey: process.env.MINIO_SECRET_KEY,

})

const migrateData = async () =>{
    const exists = await minioClient.bucketExists(process.env.MINIO_STORAGE)
    if (!exists) {
        minioClient.makeBucket(process.env.MINIO_STORAGE, process.env.MINIO_STORAGE, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Bucket created successfully');
            const policy = `{"Version": "2012-10-17","Statement": [{"Action": ["s3:GetObject"],"Effect": "Allow","Principal": {"AWS": ["*"]},"Resource": ["arn:aws:s3:::` +process.env.MINIO_STORAGE+ `/*"],"Sid": ""}]}`
            minioClient.setBucketPolicy(process.env.MINIO_STORAGE, policy, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('Bucket policy set successfully');
            });
        });
        fs.readdir(imageFolder, (err, files) => {
            if (err) {
                console.log('Error reading directory:', err);
                return;
            }
            files.forEach(file => {
                const filePath = `${imageFolder}/${file}`;
                const fileStat = fs.statSync(filePath);
                if (fileStat.isFile() && file.toLowerCase().endsWith('.jpg')) {
                  minioClient.fPutObject(process.env.MINIO_STORAGE, file, filePath, (err, etag) => {
                    if (err) {
                      console.log(`Error uploading ${file}:`, err);
                    } else {
                      console.log(`${file} uploaded successfully.`);
                    }
                  });
                }
              });
            
        });
    }
    console.log(`Uploading data to ${process.env.MINIO_STORAGE} bucket`)
}

module.exports = migrateData;