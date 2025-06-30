const { status } = require("express/lib/response");
const accountService = require("../services/accountService");

const getAllAccounts = (req, res) => {
    try {
        const allAccounts = accountService.getAllAccounts();
        res.send({status: "success", data: allAccounts});
    } catch (error) {
        res.status(error.status || 500).send({status: "error", message: error.message || "Internal Server Error"});
    }
};

const getOneAccount = (req, res) => {
    const { 
        params: { accountId } 
    } = req;
    if (!accountId) {
        return res.status(400).send({status: "error", message: "Account ID is required"});
    }
    try {
        const account = accountService.getOneAccount(accountId);
        if (!account) {
            return res.status(404).send({status: "error", message: "Account not found"});
        }
        res.send({status: "success", data: account});
    } catch (error) {
        res.status(error.status || 500).send({status: "error", message: error.message || "Internal Server Error"});
    }
};

//ToDo: implementar express-validator para validar el cuerpo de la solicitud
const createNewAccount = (req, res) => {
    const {body} = req;
    if (!body || !body.clienteId || !body.numeroCuenta || !body.tipoCuenta || !body.tipoMoneda || !body.sucursalApertura) {
        return res.status(400).send({status: "error", message: "Missing required fields"});
    }
    const newAccount = {
        clienteId: body.clienteId,
        numeroCuenta: body.numeroCuenta,
        tipoCuenta: body.tipoCuenta,
        tipoMoneda: body.tipoMoneda,
        sucursalApertura: body.sucursalApertura,
    };
    try {
        const createdAccount = accountService.createNewAccount(newAccount);
        res.status(201).send({status: "success", data: createdAccount});
    } catch (error) {
        res.status(error.status || 500).send({status: "error", message: error.message || "Internal Server Error"});
    }

};

const updateOneAccount = (req, res) => {
    const {
        body,
        params: { accountId } 
    } = req;
    if (!accountId) {
        return res.status(400).send({status: "error", message: "Account ID is required"});
    }
    try {
        const updatedAccount = accountService.updateOneAccount(accountId, body);
        res.send({status: "success", data: updatedAccount});
    } catch (error) {
        res.status(error.status || 500).send({status: "error", message: error.message || "Internal Server Error"});
    }
};

const deleteOneAccount = (req, res) => {
    const { 
        params: { accountId } 
    } = req;
    if (!accountId) {
        return res.status(400).send({status: "error", message: "Account ID is required"});
    }
    try {
        accountService.deleteOneAccount(accountId);
        res.status(204).send({status: "success", message: "Account inactivated successfully"});
    } catch (error) {
        res.status(error.status || 500).send({status: "error", message: error.message || "Internal Server Error"});
    }

};

module.exports = {
  getAllAccounts,
  getOneAccount,
  createNewAccount,
  updateOneAccount,
  deleteOneAccount,
};