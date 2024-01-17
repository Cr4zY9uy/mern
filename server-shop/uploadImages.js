const cloudinary = require("cloudinary").v2;

const uploadImages = (file) => {
    cloudinary.uploader.upload(file,
        {
            upload_preset: 'yqk67lv3',
        },
        function (error, result) {
            if (error) {
                console.log(error);
            }
            console.log(result);
        });
}
module.exports = uploadImages;