require("dotenv").config();
const jwt = require("jsonwebtoken");
const db = require("../models");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const path = require("path");

const refresh_token = process.env.REFRESH_TOKEN;
const access_token = process.env.ACCESS_TOKEN;
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "atulsoam5@gmail.com", // Replace with your sender email
    clientId: client_id,
    clientSecret: client_secret,
    refreshToken: refresh_token,
    accessToken: access_token,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("HI");
    console.log(error);
  } else {
    console.log("ready for messages ", success);
  }
});

const iiitgEmailRegex = /^\w+@\w+\.(iiitg\.ac\.in)$/;
exports.register = async (req, res, next) => {
  try {
    const user = await db.User.create(req.body);
    const { id, username } = user;

    // const token = jwt.sign({ id, username }, process.env.SECRET);
    // if (!iiitgEmailRegex.test(username)) {
    // console.log("Not an IIITG email address");
    // } else {
    //handle account verification
    await sendVerificationEmail(id, username, res);
    // }
  } catch (err) {
    if (err.code === 11000) {
      err.message = "Sorry , that username is already taken";
    }
    next(err);
  }
};

//send verification email
const sendVerificationEmail = async (id, username, res) => {
  try {
    const currentUrl =
      "https://voting-backend-si7q.onrender.com" || "http://localhost:4000";
    const uniqueString = uuidv4() + id;

    // Hash the unique string before saving
    const hashedUniqueString = await bcrypt.hash(uniqueString, 10);

    // Create and save the verification record
    const newVerification = new db.UserVerification({
      userId: id,
      uniqueString: hashedUniqueString,
      createdAt: Date.now(),
      expiresAt: Date.now() + 5 * 60 * 1000, // Expires in 5 minutes
    });
    await newVerification.save();

    // Prepare email options
    const mailOptions = {
      from: "atulsoam5@gmail.com",
      to: username, // Replace with actual recipient's username
      subject: "Verify Your Email",
      html: `<p>Verify your email address to complete registration and login.</p>
             <p>This link expires in 5 minutes.</p>
             <p>Press <a href="${currentUrl}/api/auth/verify/${id}/${uniqueString}">here</a> to proceed.</p>`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return true; // Indicate success
  } catch (error) {
    console.error("Error sending verification email:", error);
    // Send appropriate error response
    res.status(400).json({
      message: "An error occurred while sending the verification email",
    });

    return false; // Indicate failure
  }
};

exports.verify = (req, res, next) => {
  const { userId, uniqueString } = req.params;
  db.UserVerification.find({ userId })
    .then((result) => {
      if (result.length > 0) {
        const { expiresAt } = result[0];
        const hashedUniqueString = result[0].uniqueString;

        if (expiresAt < Date.now()) {
          //no longer valid
          db.UserVerification.deleteOne({ userId })
            .then((result) => {
              db.User.deleteOne({ _id: userId })
                .then(() => {
                  const message = "Link has expired please sign up again.";
                  res.redirect(
                    `/api/auth/verified?error=true&message=${message}`
                  );
                })
                .catch((error) => {
                  const message =
                    "Clearing user with expired unique string failure";
                  res.redirect(
                    `/api/auth/verified?error=true&message=${message}`
                  );
                });
            })
            .catch((err) => {
              const message =
                "An error occurred while deleting the user verification record";
              res.redirect(`/api/auth/verified?error=true&message=${message}`);
            });
        } else {
          // valid record exist
          //first compare the hashed unique string
          bcrypt
            .compare(uniqueString, hashedUniqueString)
            .then((result) => {
              if (result) {
                db.User.updateOne({ _id: userId }, { verified: true })
                  .then(() => {
                    db.UserVerification.deleteOne({ userId })
                      .then(() => {
                        res.sendFile(
                          path.join(__dirname, "../views/verified.html")
                        );
                      })
                      .catch((error) => {
                        console.log(error);
                        const message =
                          "An error occurred while finalizing successful verification";
                        res.redirect(
                          `/api/auth/verified?error=true&message=${message}`
                        );
                      });
                  })
                  .catch((error) => {
                    console.log(error);
                    const message =
                      "An error occurred while updating the user record to show verified";
                    res.redirect(
                      `/api/auth/verified?error=true&message=${message}`
                    );
                  });
              } else {
                const message =
                  "Invalid verification details passed , check your inbox.";
                res.redirect(
                  `/api/auth/verified?error=true&message=${message}`
                );
              }
            })
            .catch((error) => {
              const message =
                "An error occurred while comparing the hashed unique string";
              res.redirect(`/api/auth/verified?error=true&message=${message}`);
            });
        }
      } else {
        //user verification result do not exist
        const message =
          "Account record does not exist. Please register or login again";
        res.redirect(`/api/auth/verified?error=true&message=${message}`);
      }
    })
    .catch((error) => {
      console.log(error);
      const message =
        "An error occurred while checking for existing user verification record";
      res.redirect(`/api/auth/verified?error=true&message=${message}`);
    });
};

exports.verified = (req, res, next) => {
  res.sendFile(path.join(__dirname, "../views/verified.html"));
};

exports.login = async (req, res, next) => {
  try {
    const user = await db.User.findOne({ username: req.body.username });
    const { id, username, verified } = user;
    const valid = await user.comparePassword(req.body.password);
    if (!verified) {
      throw new Error();
    } else {
      if (valid) {
        const token = jwt.sign({ id, username }, process.env.SECRET);

        res.json({
          id,
          username,
          token,
        });
      } else {
        throw new Error();
      }
    }
  } catch (err) {
    err.message = "Invalid Username/Password";
    next(err);
  }
};
