const {Router} = require("express");
const { registerAdmin, loginAdmin } = require("../handlers/authAdmin");

const router = Router();

router.post("/registerAdmin", registerAdmin);

router.post("/loginAdmin", loginAdmin);

module.exports = router;