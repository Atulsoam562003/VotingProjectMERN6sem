const router = require("express").Router();
const handle = require("../handlers");

router.post("/register", handle.register);

router.post("/login", handle.login);

router.get("/verify/:userId/:uniqueString", handle.verify);

router.get("/verified", handle.verified);

module.exports = router;
