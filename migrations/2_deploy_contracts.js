const GreenCollectible = artifacts.require("GreenCollectible");

module.exports = async (deployer, network, accounts) => {
  deployer.deploy(GreenCollectible);
};
