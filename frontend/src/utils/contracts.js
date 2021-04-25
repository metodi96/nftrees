import GreenCollectible from '../contracts/GreenCollectible.json';

export const getGreenCollectibleContractInstance = (web3) => {
    return new web3.eth.Contract(
        GreenCollectible.abi,
        process.env.REACT_APP_GREEN_COLLECTIBLE_ADDRESS,
    );
};

export const convertToTokens = (n, web3) => {
    return web3.utils.fromWei(n, 'ether');
}

export const convertToWei = (n, web3) => {
    return web3.utils.toWei(n, 'ether');
}