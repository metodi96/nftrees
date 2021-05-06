#  [Solutions Bounty] NFTrees
This project is developed as a participating solution in the Gitcoin Green NFT hackathon as a Solutions Bounty: https://gitcoin.co/issue/GreenNFT/GreenNFTs/1/100025260
Based on my idea regarding compensating the nature when minting NFTs which is explained in more detail here: https://github.com/levskarcheto96/-Awareness-Bounty-NFTrees

## Description of the current functionality on the [platform](https://nftrees.herokuapp.com/)
Below I will guide you through each of the pages of the NFTrees platform in its current state. The information below is subject to changes as the platform evolves and 
new features are introduced:

### Explore
Here you will find all the NFTs that have been minted on this platform under the big image. Below the list one can see statistics about how much ETH has been
donated via minting of these NFTs as well as how that amount equals to number of trees planted. This is determined based on the equation $1 = 1 tree.

### Create
Here you can create your brand new digital artwork. Currently accepted formats are .png, .jpg, .gif and .webp.
Below we have an input field which corresponds to the donation amount that is to be provided to an authorized non-profit organization
for planting trees all around the world. A minimum amount of 0.001 ETH is to be entered. From the dropdown one could choose from the list
of authorized recipients. Currently the address that is used is for strictly testing purposes and does not have anything to do with the
organization given. This is to be changed once this idea is communicated with a non-profit organization and they open a wallet address on
the Ethereum network. The user can also specify a name and a description for the NFT and click on "Create Item" to mint their brand new NFT.

### My Items
Once the user creates their NFT, they are automatically redirected to this page where they can see a list of their minted NFTs and how much they have
donated to non-profit organizations, similarly to the statistics on the "Explore" page, however, here the data is related to the current wallet account's
NFTs.

### About 
Here you can find some FAQs regarding the platform and also regarding some of the future steps which are to be made.

--------------------------------------------------------------------------------- 
## Development
### Blockchain part - Smart Contracts

#### Setup for local blockchain environment

Make sure to install [Truffle](https://www.trufflesuite.com/docs/truffle/getting-started/installation) and to have a local development Ethereum blockchain started (e.g. [Ganache](https://www.trufflesuite.com/docs/ganache/overview)) and also a wallet provider such as [MetaMask](https://metamask.io/) connected to that development blockchain. 
Then you can run the following commands to deploy the smart contracts and also test them.

```PS
npm install     # install dependencies such as truffle-assertions and @openzeppelin/contracts
truffle migrate # build and deploy the smart contract LightsaberAuction - since it inherits from the LightsaberForge we do not need to deploy the other one
truffle test    # run the tests
```

If at some point you would like to redeploy the contracts just run the command

```PS
truffle migrate --reset # build and redeploy the smart contract
```

#### Learn More

Check out the [Truffle documentation](https://www.trufflesuite.com/docs/truffle/overview).


### Frontend part - React

#### Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

#### Available Scripts

In the project's frontend directory, you can run:

```PS
npm install     # install dependencies for frontend
```
Then: 

```PS
npm start     # Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
```

#### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
