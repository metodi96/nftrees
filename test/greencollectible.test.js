const GreenCollectible = artifacts.require('./GreenCollectible')
const truffleAssert = require('truffle-assertions')

const { convertTokensToWei } = require('../utils/tokens')

contract("GreenCollectible", ([owner, artist, nonProfitGreenOrganization, ineligibleWalletAddress]) => {
    let greenCollectible;

    before(async () => {
        greenCollectible = await GreenCollectible.new()
    });

    describe('Green collectible deployment', async () => {
        it("Deploys the GreenCollectible SC successfully.", async () => {
            console.log('Address is ', greenCollectible.address)
            assert.notEqual(greenCollectible.address, '', 'should not be empty');
            assert.notEqual(greenCollectible.address, 0x0, 'should not be the 0x0 address');
            assert.notEqual(greenCollectible.address, null, 'should not be null');
            assert.notEqual(greenCollectible.address, undefined, 'should not be undefined');
        })

        it('The GreenCollectible SC should have a name and a symbol.', async () => {
            const name = await greenCollectible.name()
            assert.equal(name, 'NFTreeCollectible', 'The name should be NFTreeCollectible.')
            const symbol = await greenCollectible.symbol()
            assert.equal(symbol, 'NFTC', 'The symbol should be NFTC.')
        })
    })

    describe('Authorize and unauthorize recipients (non-profit organizations)', async () => {

        it('Only owner can authorize recipient.', async () => {
            await truffleAssert.reverts(greenCollectible.authorizeRecipient(nonProfitGreenOrganization, { from: ineligibleWalletAddress }));
        })

        it('Authorizes a recipient.', async () => {
            const isEligible = await greenCollectible.isAnEligibleNonProfitOrganization(nonProfitGreenOrganization)
            assert.equal(isEligible, false, 'The organization has not yet been authorized to receive eth.')

            const result = await greenCollectible.authorizeRecipient(nonProfitGreenOrganization, { from: owner })
            const isEligibleNew = await greenCollectible.isAnEligibleNonProfitOrganization(nonProfitGreenOrganization)
            assert.equal(isEligibleNew, true, 'The organization should be authorized to receive eth.')
            assert.equal(result.logs.length, 1, 'Should trigger one event');
            assert.equal(result.logs[0].event, 'Authorized', 'Should be the "Authorized" event');
            assert.equal(result.logs[0].args.recipient, nonProfitGreenOrganization, 'Should be the non-profit green organization wallet address.');
        })

        it('Cannot authorize a recipient again.', async () => {
            await truffleAssert.reverts(greenCollectible.authorizeRecipient(nonProfitGreenOrganization, { from: owner }));
        })

        it('Only owner can unauthorize recipient.', async () => {
            await truffleAssert.reverts(greenCollectible.unauthorizeRecipient(nonProfitGreenOrganization, { from: ineligibleWalletAddress }));
        })

        it('Unauthorizes a recipient.', async () => {
            const isEligible = await greenCollectible.isAnEligibleNonProfitOrganization(nonProfitGreenOrganization)
            assert.equal(isEligible, true, 'The organization has been authorized.')

            const result = await greenCollectible.unauthorizeRecipient(nonProfitGreenOrganization, { from: owner })
            const isEligibleNew = await greenCollectible.isAnEligibleNonProfitOrganization(nonProfitGreenOrganization)
            assert.equal(isEligibleNew, false, 'The organization should now not be authorized to receive eth anymore.')
            assert.equal(result.logs.length, 1, 'Should trigger one event');
            assert.equal(result.logs[0].event, 'Unauthorized', 'Should be the "Authorized" event');
            assert.equal(result.logs[0].args.recipient, nonProfitGreenOrganization, 'Should be the non-profit green organization wallet address.');
        })

        it('Cannot unauthorize a recipient again.', async () => {
            await truffleAssert.reverts(greenCollectible.unauthorizeRecipient(nonProfitGreenOrganization, { from: owner }));
        })
    })

    describe('Mint a NFT and donate successfully to a non-profit organization.', async () => {

        before(async () => {
            await greenCollectible.authorizeRecipient(nonProfitGreenOrganization, { from: owner })
        });

        it('The value transfered cannot be lower than 0.001 eth.', async () => {
            await truffleAssert.reverts(greenCollectible.createCollectibleAndDonate('metadata', nonProfitGreenOrganization, { from: artist, value: convertTokensToWei('0.0001') }));
        })

        it('Cannot send the value to yourself or any other account that is ineligible to receive it.', async () => {
            await truffleAssert.reverts(greenCollectible.createCollectibleAndDonate('metadata', artist, { from: artist, value: convertTokensToWei('0.001') }));
        })

        it('The hash "metadata" is not minted before the function call.', async () => {
            const hasBeenMinted = await greenCollectible.hasBeenMinted('metadata')
            assert.equal(hasBeenMinted, false, 'The hash "metadata" has not been minted, so it should be false.')
        })

        it('The artist should have 0 eth for their total donations.', async () => {
            const totalDonationsByArtist = await greenCollectible.totalDonations(artist)
            assert.equal(parseInt(totalDonationsByArtist.toString()), convertTokensToWei('0'), 'The artist should not have donated anything.')
        })

        it('Give a new id to a newly created token', async () => {
            const newTokenId = await greenCollectible.createCollectibleAndDonate.call('metadata', nonProfitGreenOrganization, { from: artist, value: convertTokensToWei('0.001') })
            assert.equal(parseInt(newTokenId.toString()), 1, 'The new token id should be 1.')
        })

        it('Mint a NFT and emit events.', async () => {
            const result = await greenCollectible.createCollectibleAndDonate('metadata', nonProfitGreenOrganization, { from: artist, value: convertTokensToWei('0.001') })
            assert.equal(result.logs.length, 2, 'Should trigger two events.');

            //event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
            assert.equal(result.logs[0].event, 'Transfer', 'Should be the "Transfer" event.');
            assert.equal(result.logs[0].args.from, 0x0000000000000000000000000000000000000000, 'Should be the 0x0000000000000000000000000000000000000000 address.');
            assert.equal(result.logs[0].args.to, artist, 'should log the recipient which is the artist.');
            assert.equal(result.logs[0].args.tokenId, 1, 'should log the token id which is 1.');

            //event Donated(address from, address to, uint256 amount);
            assert.equal(result.logs[1].event, 'Donated', 'Should be the "Donated" event.');
            assert.equal(result.logs[1].args.from, artist, 'Should log the sender which is the artist.');
            assert.equal(result.logs[1].args.to, nonProfitGreenOrganization, 'should log the recipient which is the non-profit organization.');
            assert.equal(result.logs[1].args.amount, convertTokensToWei('0.001'), 'should log the value which is 0.001 eth.');
        })

        it('Check if hash has been minted and that you cannot mint the same hash again.', async () => {
            const hasBeenMinted = await greenCollectible.hasBeenMinted('metadata')
            assert.equal(hasBeenMinted, true, 'The hash "metadata" has been minted.')
            await truffleAssert.reverts(greenCollectible.createCollectibleAndDonate('metadata', nonProfitGreenOrganization, { from: artist, value: convertTokensToWei('0.001') }));
        })

        it('Increment the total donations by the artist.', async () => {
            const totalDonationsByArtist = await greenCollectible.totalDonations(artist)
            assert.equal(parseInt(totalDonationsByArtist.toString()), convertTokensToWei('0.001'), 'The artist should have donated 0.001')
        })

        it('The artist should be part of the top 10 donators array.', async () => {
            const topTenDonation = await greenCollectible.getTopTenDonation(0)
            assert.equal(topTenDonation.donator, artist, 'The array should be of length 10.')
            assert.equal(topTenDonation.totalDonationsByDonator, convertTokensToWei('0.001'), 'The total donated value by the artist should be 0.001 eth.')
        })
    })
});
