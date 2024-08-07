const { register } = require("../controller/userController");
const { login } = require("../controller/userController");
const { setAvatar } = require("../controller/userController");
const { allUsers } = require("../controller/userController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);
router.get("/allUsers/:id", allUsers);



module.exports = router;
