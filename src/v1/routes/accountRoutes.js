const express = require("express");
const accountController = require("../../controllers/accountController");

const router = express.Router();

router.get("/", accountController.getAllAccounts);

router.get("/:accountId", accountController.getOneAccount);

router.post("/", accountController.createNewAccount);

router.patch("/:accountId", accountController.updateOneAccount);

router.delete("/:accountId", accountController.deleteOneAccount);

module.exports = router;