const GreenCollectible = artifacts.require("GreenCollectible");

module.exports = async (deployer, network, accounts) => {
  console.log('Deploying Green Collectible from account: ', accounts[0])
  deployer.deploy(GreenCollectible, { from: accounts[0] });
};
