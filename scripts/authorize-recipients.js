const GreenCollectible = artifacts.require('GreenCollectible')

module.exports = async callback => {
    const accounts = await web3.eth.getAccounts()
    console.log('Account 1: ', accounts[0])
    const greenCollectible = await GreenCollectible.deployed()
    console.log('Authorizing recipients on contract: ', greenCollectible.address)
    const tx = await greenCollectible.authorizeRecipient('0x36b0bCa3ccA85e8ac16195c47735e717dD1fB47A', { from: accounts[0] })
    const tx2 = await greenCollectible.authorizeRecipient('0xb18af8525F2BF9d71f93163428274aB264412a4d', { from: accounts[0] })
    const tx3 = await greenCollectible.authorizeRecipient('0xAbF2a39ec8708420b8A573AD50E15c1617BFeeF5', { from: accounts[0] })
    callback(tx.tx)
}