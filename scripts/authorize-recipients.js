const GreenCollectible = artifacts.require('GreenCollectible')

module.exports = async callback => {
    const accounts = await web3.eth.getAccounts()
    console.log('Account 1: ', accounts[1])
    const greenCollectible = await GreenCollectible.deployed()
    console.log('Authorizing recipients on contract: ', greenCollectible.address)
    const tx = await greenCollectible.authorizeRecipient('0x0b4e4abAD034cC88a9e6b17e8B8d0543E3e10986', { from: accounts[0] })
    callback(tx.tx)
}