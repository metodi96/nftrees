const Migrations = artifacts.require("Migrations");

module.exports = function (deployer, network, accounts) {
  console.log('Deploying Migrations from account: ', accounts[0])
  deployer.deploy(Migrations, { from: accounts[0] });
};
