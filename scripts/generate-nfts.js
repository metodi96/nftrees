const GreenCollectible = artifacts.require('GreenCollectible')

module.exports = async callback => {
    const accounts = await web3.eth.getAccounts()
    const greenCollectible = await GreenCollectible.deployed()
    const tx = await greenCollectible.createCollectibleAndDonate('QmT3wEioUVbiESfCRUtj8WQjgCeYpZXCwDwKRAtEVhVVfD', accounts[9],
     { from: accounts[2], value: '5000000000000000' })
    console.log('TX1: ', tx)
    const tx2 = await greenCollectible.createCollectibleAndDonate('QmW6Gp4PiRrCZEdkWGj5GZUpmxdDrrisC85uVHDjVTa7qZ', accounts[9],
        { from: accounts[1], value: '3000000000000000' })
    const tx3 = await greenCollectible.createCollectibleAndDonate('QmXYcCQxkTSchjNNMjsJJUrNXTFd1gz7KrpHESpBetj6bM', accounts[9],
        { from: accounts[3], value: '1000000000000000'  })
    const tx4 = await greenCollectible.createCollectibleAndDonate('QmZ7dGnKbhhrQGSdSG5dBkrDEGYYbLit7aRCM869iNMtG4', accounts[9],
        { from: accounts[4], value: '1000000000000000'  })
    const tx5 = await greenCollectible.createCollectibleAndDonate('QmYn4sNiEzJ95QTDcxRFL7ivqfRTTqLJRLKdroavjjb9bv', accounts[9],
        { from: accounts[5], value: '2000000000000000'  })
    callback(tx.tx)
}