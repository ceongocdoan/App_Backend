const mongoose = require("mongoose");
const Restaurant = require("../internal/models/restaurants");
require("dotenv").config();

const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URI, {})
    .then(() => {
      console.log("Mongoose Connected");
    })
    .catch((error) => {
      console.log(error);
    });
};

const commonObject = (objectName) => {
  return (
    "http://" +
    process.env.MINIO_ENDPOINT +
    ":" +
    process.env.MINIO_PORT +
    "/" +
    process.env.MINIO_STORAGE +
    "/" +
    objectName
  );
};

const restaurantsData = [
  {
    name: "GoGi House Quán Sứ",
    brand: "Gogi",
    location: {
      latitude: 21.0279089, 
      longitude: 105.8438087,
      province: "Ha Noi",
      district: "Hoàn Kiếm",
      street: "30 - 32 P. Quán Sứ, Hàng Bông",
    },
    image:commonObject('gogi.jpg'),
  },
  {
    name: "GoGi House Trương Định",
    brand: "Gogi",
    location: {
      latitude: 20.9851036, 
      longitude: 105.8377973,
      province: "Ha Noi",
      district: "Hoàng Mai",
      street: "TTTM chợ, 461 Trương Định, Tân Mai",
    },
    image:commonObject('gogi1.jpg'),
  },
  {
    name: "GoGi House Lê Trọng Tấn",
    brand: "Gogi",
    location: {
      latitude: 20.994472, 
      longitude: 105.8119459,
      province: "Ha Noi",
      district: "Thanh Xuân",
      street: "182 P. Lê Trọng Tấn, Khương Mai",
    },
    image:commonObject('main.jpg'),
  },
  {
    name: "GoGi House Tân Mai",
    brand: "Gogi",
    location: {
      latitude: 20.9834341, 
      longitude: 105.8328766,
      province: "Ha Noi",
      district: "Tân Mai",
      street: "655 P. Tân Mai, Tân Mai",
    },
    image:commonObject('main1.jpg'),
  },
  {
    name: "Manwah Hotpot Times",
    brand: "Manwah",
    location: {
      latitude: 20.9834288, 
      longitude: 105.8019765,
      province: "Ha Noi",
      district: "Hai Bà Trưng",
      street: "TL-46C.46D, TTTM Vincom, P. Minh Khai, Khu đô thị Times City",
    },
    image:commonObject('manwah.jpg'),
  },
  {
    name: "Manwah Thái Hà",
    brand: "Manwah",
    location: {
      latitude: 21.063967, 
      longitude: 105.7113612,
      province: "Ha Noi",
      district: "Trung Liệt",
      street: "Số 1 P. Thái Hà",
    },
    image:commonObject('manwah1.jpg'),
  },
  {
    name: "Manwah Center Point Lê Văn Lương",
    brand: "Manwah",
    location: {
      latitude: 21.063967,
      longitude: 105.7113612, 
      province: "Ha Noi",
      district: "Thanh Xuân",
      street: "TTTM Center Point, 27 Đ. Lê Văn Lương, Nhân Chính",
    },
    image:commonObject('manwah2.jpg'),
  },
  {
    name: "Mak Mak Thai Kitchen",
    brand: "MakMak",
    location: {
      latitude: 21.0079397,
      longitude:105.8062335, 
      province: "Ha Noi",
      district: "Đống Đa",
      street: "229 P. Tây Sơn, Ngã Tư Sở",
    },
    image:commonObject('makmak.jpg'),
  },
  {
    name: "Mak Mak Thai Centerpoint",
    brand: "MakMak",
    location: {
      latitude: 21.0048141,
      longitude:105.7660742, 
      province: "Ha Noi",
      district: "Thanh Xuân",
      street: "Tầng 4, Tòa Hà Nội Centerpoint, 27 Lê Văn Lương, Trung Hòa",
    },
    image:commonObject('makmak1.jpg'),
  },
  {
    name: "Dookki",
    brand: "Dookki",
    location: {
      latitude: 21.0048091,
      longitude:105.7660741, 
      province: "Ha Noi",
      district: "Đống Đa",
      street: "54A Đ. Nguyễn Chí Thanh, Láng Thượng",
    },
    image:commonObject('dookki.jpg'),
  },
  {
    name: "Dookki",
    brand: "Dookki",
    location: {
      latitude: 21.0199723,
      longitude:105.7427919, 
      province: "Ha Noi",
      district: "Mỹ Đình",
      street: "Tầng 3, Vincom Plaza Skylake, Phạm Hùng",
    },
    image:commonObject('dookki.jpg'),
  },
  {
    name: "Kichi-Kichi Big C Thăng Long",
    brand: "Kichi-Kichi",
    location: {
      latitude: 21.0199698,
      longitude:105.7427919,
      province: "Ha Noi",
      district: "Cầu Giấy",
      street: "222 Đ. Trần Duy Hưng, Trung Hoà",
    },
    image:commonObject('kichi.jpg'),
  },
];

async function migrateData() {
  connectDatabase();
  try {
    await Restaurant.deleteMany();
    await Restaurant.insertMany(restaurantsData);
    console.log("Data migration completed successfully.");
  } catch (err) {
    console.error("Data migration failed:", err);
  } finally {
    mongoose.disconnect();
  }
}

module.exports = migrateData;
