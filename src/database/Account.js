const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllAccounts = () => {
  try {
  return DB.accounts;
  } catch (error) {
    throw {
      message: `Error retrieving accounts: ${error?.message}`,
      status: 500,
    };
  }
};

const getOneAccount = (accountId) => {
  try {
    const account = DB.accounts.find((account) => account.numeroCuenta === accountId);
    if (!account) {
      throw {
        message: `Can't find account with the id '${accountId}'`,
        status: 404,
      };
    }
    return account;
  } catch (error) {
     throw{status: error?.status || 500,
      message: error?.message || `Error retrieving account with id '${accountId}'`}
  };
};

const createNewAccount = (newAccount) => {
  const existAccount = 
    DB.accounts.findIndex((account) => account.numeroCuenta === newAccount.numeroCuenta) > -1;
  if (existAccount) {
    throw{
      message: "Account already exists",
      status: 400,
    }
  }
  try {
    DB.accounts.push(newAccount);
    saveToDatabase(DB);
    return newAccount;
  } catch (error) {
    throw{
      message: `Error creating account: ${error?.message}`,
      status: 500,
    };
  }

};

const updateOneAccount = (accountId, params) => {
  try {
    const isAlreadyAdded = DB.accounts.findIndex((account) => account.numeroCuenta === accountId) > -1;
    if (isAlreadyAdded) {
      throw {
        message: `Account with id '${accountId}' already exists`,
        status: 400,
      };
    }
    const accountIndex = DB.accounts.findIndex((account) => account.numeroCuenta === accountId);
    if (accountIndex === -1) {
      throw {
        message: `Can't find account with id '${accountId}'`,
        status: 404,
      };
    }
    DB.accounts[accountIndex] = {
      ...DB.accounts[accountIndex],
      ...params,
      updatedAt: new Date().toISOString(),
    };
    saveToDatabase(DB);
    return DB.accounts[accountIndex];
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || `Error updating account with id '${accountId}'`,
    };
  }
};

const deleteOneAccount = (accountId) => {
  try {
    const accountIndex = DB.accounts.findIndex((account) => account.numeroCuenta === accountId);
    if (accountIndex === -1) {
      throw {
        message: `Can't find account with id '${accountId}'`,
        status: 404,
      };
    }
    // No se elimina la cuenta, se cambia el estado a inactiva
    DB.accounts[accountIndex].estado = "INACTIVA";
    saveToDatabase(DB);
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || `Error deleting account with id '${accountId}'`,
    };
  }
};

module.exports = { 
  getAllAccounts,
  getOneAccount,
  createNewAccount,
  updateOneAccount,
  deleteOneAccount
};