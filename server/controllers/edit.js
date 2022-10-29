const User = require("../models/User");
const cloudinary = require("../middleware/cloudinary");
// const Comment = require("../models/Comment");


module.exports = {
    updateUserDetails: async (req, res) => {
        const { profilePic, userName, country, city, campus, sex, twitter, linkedIn, mobile, description } = req.body

        try {
            console.log(req.body);
            if (profilePic){
                const result = await cloudinary.uploader.upload(profilePic);

                if(result){
                    await User.findOneAndUpdate(
                        { _id: req.params.id },
                        {
                          $set: {
                            "profilePic" : result.secure_url,
                            "cloudinaryId": result.public_id,
                            "userName" : userName,
                            "country" : country,
                            "city" : city,
                            "campus" : campus,
                            "sex" : sex,
                            "twitter" : twitter,
                            "linkedin" : linkedIn,
                            "mobile" : mobile,
                            "description" : description,
                          },
                        }
                      );
                }
                res.status(200).send("User Profile edited Successfully");
            }
            else{ res.send("please upload a pic")}

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
}