const mongoose = require("mongoose");
const shops = require('./model/shop');
const user = require('./model/user');
const toneRemover = require('./utils/removeTone')

mongoose
    .connect("mongodb+srv://me:123@cluster0.y6ptfbf.mongodb.net/eshop", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((data) => {
        console.log(`mongod connected with server: ${data.connection.host}`);
    });


shops.find().then((documents) => {

    // Iterate over each document and update it
    documents.forEach(document => {


        console.log(document._id.toString());
        // update capabilities field
        // try {
        //     const randomList = getRandomNumbers();
        //     shops.updateOne(
        //         { _id: document._id }, // Use the appropriate identifier for your documents
        //         {
        //             $set: {
        //                 capabilities: [
        //                     capabilityList[randomList[0]],
        //                     capabilityList[randomList[1]],
        //                     capabilityList[randomList[2]],
        //                     capabilityList[randomList[3]],
        //                     capabilityList[randomList[4]],
        //                 ]
        //             }
        //         }
        //     ).then(result => {
        //         console.log(result);
        //     })
        // } catch (e) {
        //     console.log(e)
        // }

        // update images field

        // const shopId = document.name;

        // Create an array of image names based on the shop_id
        // const images = [
        //     `${shopId}_img1.png`,
        //     `${shopId}_img2.png`,
        //     `${shopId}_img3.png`
        // ];

        // try {
        //     const randomList = getRandomNumbers();
        //     shops.updateOne(
        //         { _id: document._id }, // Use the appropriate identifier for your documents
        //         {
        //             $set: {
        //                 images: images
        //             }
        //         }
        //     ).then(result => {
        //         console.log(result);
        //     })
        // } catch (e) {
        //     console.log(e)
        // }

        // 

        // update type
        try {
            var type = "";
            if (Math.round(Math.random()) == 0) {
                type = "Supplier";
            } else {
                type = "Manufacturer"
            }
            shops.updateOne(
                { _id: document._id }, // Use the appropriate identifier for your documents
                {
                    $set: {
                        type: type
                    }
                }
            ).then(result => {
                console.log(result);
            })
        } catch (e) {
            console.log(e)
        }

    });

});

function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, " ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    return str;
}

function getRandomNumbers() {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const result = [];

    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        const randomNum = numbers[randomIndex];

        result.push(randomNum);
        numbers.splice(randomIndex, 1);
    }

    return result;
}

const capabilityList = [
    "R&D capabilities",
    "Full customization",
    "Quality management certified",
    "OEM for well-known brands",
    "Cross-category consolidation",
    "Design-based customization",
    "Environmentally compliant",
    "Socially responsible",
    "ODM service available",
    "On-site technical support",
];
