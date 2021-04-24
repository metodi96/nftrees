# NFTrees
Based on my idea regarding compensating the nature when minting NFTs which is explained in more detail here: https://github.com/levskarcheto96/-Awareness-Bounty-NFTrees

## Blockchain part - Smart Contracts

### Setup for local blockchain environment

Make sure to have a local development Ethereum blockchain started (e.g. Ganache) and also a wallet provider such as MetaMask connected to that development blockchain. 
Then you can run the following commands deploy the smart contracts and also test them.

```PS
npm install     # install dependencies such as truffle-assertions, @openzeppelin/contracts and ganache-time-traveler
truffle migrate # build and deploy the smart contract LightsaberAuction - since it inherits from the LightsaberForge we do not need to deploy the other one
truffle test    # run the tests
```

If at some point you would like to redeploy the contracts just run the command

```PS
truffle migrate --reset # build and redeploy the smart contract
```

## Frontend part - React

### Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project's frontend directory, you can run:

```PS
npm install     # install dependencies for frontend
```
Then: 

```PS
npm start     # Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
```

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
