const { v4: uuid } = require('uuid');
const Account = require('../database/Account');

const getAllAccounts = () => {
  try {
    const allAccounts = Account.getAllAccounts();
    return allAccounts;
  } catch (error) {
    throw error;
  }
};

const getOneAccount = (accountId) => {
  try {
    const account = Account.getOneAccount(accountId);
    return account;
  } catch (error) {
    throw error;
  }
};

const createNewAccount = (newAccount) => {
  const accountToCreate = {
    id: uuid(),
    ...newAccount,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    estado: "ACTIVA",
  };
  try {
    const createdAccount = Account.createNewAccount(accountToCreate);
    return createdAccount;
  } catch (error) {
    throw error;
  }
};

const updateOneAccount = (accountId, params) => {
  try{
    const updatedAccount = Account.updateOneAccount(accountId, params);
    return updatedAccount;
  } catch (error) {
    throw error;
  }
};

const deleteOneAccount = (accountId) => {
  try{
    Account.deleteOneAccount(accountId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllAccounts,
  getOneAccount,
  createNewAccount,
  updateOneAccount,
  deleteOneAccount,
};