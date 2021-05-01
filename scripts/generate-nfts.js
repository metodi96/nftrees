const GreenCollectible = artifacts.require('GreenCollectible')

module.exports = async callback => {
    const accounts = await web3.eth.getAccounts()
    const greenCollectible = await GreenCollectible.deployed()
    const tx = await greenCollectible.createCollectibleAndDonate('QmT3wEioUVbiESfCRUtj8WQjgCeYpZXCwDwKRAtEVhVVfD', '0x0b4e4abAD034cC88a9e6b17e8B8d0543E3e10986',
     { from: accounts[0], value: '5000000000000000' })
    console.log('TX1: ', tx)
    const tx2 = await greenCollectible.createCollectibleAndDonate('QmW6Gp4PiRrCZEdkWGj5GZUpmxdDrrisC85uVHDjVTa7qZ', '0x0b4e4abAD034cC88a9e6b17e8B8d0543E3e10986',
        { from: accounts[1], value: '3000000000000000' })
    const tx3 = await greenCollectible.createCollectibleAndDonate('QmXYcCQxkTSchjNNMjsJJUrNXTFd1gz7KrpHESpBetj6bM', '0x0b4e4abAD034cC88a9e6b17e8B8d0543E3e10986',
        { from: accounts[0], value: '1000000000000000'  })
    const tx4 = await greenCollectible.createCollectibleAndDonate('QmZ7dGnKbhhrQGSdSG5dBkrDEGYYbLit7aRCM869iNMtG4', '0x0b4e4abAD034cC88a9e6b17e8B8d0543E3e10986',
        { from: accounts[1], value: '1000000000000000'  })
    const tx5 = await greenCollectible.createCollectibleAndDonate('QmYn4sNiEzJ95QTDcxRFL7ivqfRTTqLJRLKdroavjjb9bv', '0x0b4e4abAD034cC88a9e6b17e8B8d0543E3e10986',
        { from: accounts[0], value: '2000000000000000'  })
    callback(tx.tx)
}