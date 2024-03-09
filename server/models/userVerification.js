const mongoose = require("mongoose");

const userVerificationSchema = new mongoose.Schema({
  userId: String,
  uniqueString: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: Date,
});
// here we have to use async function as it should bind with object not with machine.
// userVerificationSchema.pre("save", async function (next) {
//   try {
//     if (!this.isModified("password")) {
//       return next();
//     }
//     const hashed = await bcrypt.hash(this.password, 10);
//     this.password = hashed;
//     return next();
//   } catch (err) {
//     return next(err);
//   }
// });

// userVerificationSchema.methods.comparePassword = async function (
//   attempt,
//   next
// ) {
//   try {
//     return await bcrypt.compare(attempt, this.password);
//   } catch (err) {
//     return next(err);
//   }
// };

module.exports = mongoose.model("UserVerification", userVerificationSchema);
