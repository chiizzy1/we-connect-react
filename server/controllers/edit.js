const User = require("../models/User");
const cloudinary = require("../middleware/cloudinary");
// const Comment = require("../models/Comment");


module.exports = {
    updateUserDetails: async (req, res) => {
        const { profilePic, formData } = req.body;
        const { userName, firstName, lastName, country, city, campus, sex, twitter, linkedIn, mobile, description } = formData

        try {
            if (profilePic){
                const result = await cloudinary.uploader.upload(profilePic);

                if(result){
                   const user =  await User.findOneAndUpdate(
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
                            "firstName": firstName,
                            "lastName": lastName
                          },
                        }
                        ); 
                        res.status(200).send(user);
                }
            }
            else{ res.send("please upload a pic")}

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
}