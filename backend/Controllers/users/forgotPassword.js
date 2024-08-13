import userModel from "../../Models/userModel.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const oldUser = await userModel.findOne({ email: email });
    if (!oldUser) {
      return res.json({
        message: "User Not Found",
        error: true,
        success: false,
      });
    }

    const secret = process.env.SECRET_KEY + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, _id: oldUser._id }, secret, {
      expiresIn: "5m",
    });
    const encodedToken = encodeURIComponent(token);
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "manialagesan2001@gmail.com",
        pass: process.env.EMAIL_KEY,
      },
    });

    let mailOptions = {
      from: "manialagesan2001@gmail.com",
      to: oldUser.email,
      subject: "Reset Password Link",
      text: `http://localhost:5173/reset-password/${oldUser._id}/${encodedToken}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.json({
            message:"Email Send Successfully",
            success:true,
            error:false
        })
      }
    });
  } catch (error) {
    return res.json({
      message: error || error.message,
      error: true,
      success: false,
    });
  }
};

export default forgotPassword;
