const GreenCollectible = artifacts.require('GreenCollectible')

module.exports = async callback => {
    const accounts = await web3.eth.getAccounts()
    const greenCollectible = await GreenCollectible.deployed()
    const tx = await greenCollectible.createCollectibleAndDonate('QmW6Gp4PiRrCZEdkWGj5GZUpmxdDrrisC85uVHDjVTa7qZ', '0x0b4e4abAD034cC88a9e6b17e8B8d0543E3e10986',
        { from: accounts[1], value: '3000000000000000' })
    const tx2 = await greenCollectible.createCollectibleAndDonate('QmXYcCQxkTSchjNNMjsJJUrNXTFd1gz7KrpHESpBetj6bM', '0x0b4e4abAD034cC88a9e6b17e8B8d0543E3e10986',
        { from: accounts[0], value: '1000000000000000'  })
    callback(tx.tx)
}