const mongoose = require('mongoose');
const Restaurant = require('../internal/models/restaurants');
require('dotenv').config();

const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URI, {})
    .then(() => {
        console.log("Mongoose Connected");
    }).catch((error) => {
        console.log(error);
    });
}

const commonObject = (objectName) =>{
    return "http://"+process.env.MINIO_ENDPOINT+":"+process.env.MINIO_PORT+"/"+process.env.MINIO_STORAGE+"/"+objectName;
}

const restaurantsData = [
  {
    name: 'Golden Spoons',
    location: 'Số 60 phố Giang Văn Minh, Phường Đội Cấn, Quận Ba Đình, Hà Nội',
    image: commonObject("4ce79b06-19a9-4755-96ac-d05872613934")
  },
  {
    name: 'Crystal Jade',
    location: 'Vincom Center, 119 Đường Trần Duy Hưng, Phường Trung Hòa, Quận Cầu Giấy, Hà Nội ',
    image: commonObject("41fda088-dc72-41da-9597-f2808ef92b52.jpg")
  },
  {
    name: 'GoGi House',
    location: '30 - 32, Phố Quán Sứ, Phường Hàng Bông, Quận Hoàn Kiếm, Hà Nội ',
    image: commonObject('42dc3fb3-7612-4886-942e-62c866ec67ba.jpg')
  },
  {
    name: 'Manwah',
    location: 'T147-1 (Tầng 1), TTTM Aeon mall Long Biên, 27 Cổ Linh, Long Biên, Hà Nội',
    image: commonObject('b9c99318-c1c3-4fe0-8309-b37495b248e0.jpg')
  },
  {
    name: 'Mak Mak',
    location: 'Vincom Center, 191 P. Bà Triệu, Lê Đại Hành, Hai Bà Trưng, Hà Nội',
    image: commonObject('ff45aeb2-e836-49e5-abac-f1005d139df6.jpg')
  }
];

async function migrateData() {
  connectDatabase();
  try {
    await Restaurant.deleteMany();
    await Restaurant.insertMany(restaurantsData);
    console.log('Data migration completed successfully.');
  } catch (err) {
    console.error('Data migration failed:', err);
  } finally {
    mongoose.disconnect();
  }
}

module.exports = migrateData;