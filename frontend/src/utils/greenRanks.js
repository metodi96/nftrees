import { convertToTokens } from './contracts'

export const calculateRankFor = (donation, web3) => {
    let rank = ''
    const donationInTokens = convertToTokens(donation, web3)
    if (parseFloat(donationInTokens) < 0.01) rank = 'I'
    else if (donationInTokens >= 0.05 && donationInTokens < 0.2) rank = 'II'
    else if (donationInTokens >= 0.2 && donationInTokens < 0.4) rank = 'III'
    else if (donationInTokens >= 0.4 && donationInTokens < 0.7) rank = 'IV'
    else rank = 'V'

    return rank
}