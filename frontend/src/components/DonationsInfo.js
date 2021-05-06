import React, { useState, useEffect, useContext } from 'react'
import { convertToTokens } from '../utils/contracts'
import AppContext from '../appContext'
import { fetchConversionRate, getEthRates } from '../utils/conversionRate'

const DonationsInfo = ({ donation }) => {
    const { greenCollectibleContract, account, web3 } = useContext(AppContext)
    const [ethRatesForDonation, setEthRatesForDonation] = useState({ eth: '', usd: '' })

    useEffect(() => {
        const runEffect = async () => {
            try {
                console.log('Fetching...')
                await fetchConversionRate();
                setEthRatesForDonation(getEthRates(parseFloat(convertToTokens(donation.toString(), web3))));
            } catch (err) {
                console.log(err)
            }
        }
        runEffect()
        return () => {
            //clean up
            setEthRatesForDonation({ eth: '', usd: '' })
        };
    }, [account, greenCollectibleContract, web3, donation])

    return (
        <div className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 text-base sm:text-lg font-bold uppercase'>
            <div className='flex p-4 border rounded-md items-center space-x-4 w-full'>
                <span>Total donations:</span>
                <span className='font-bold text-xl sm:text-3xl md:text-4xl text-green-700'>Ξ{convertToTokens(donation.toString(), web3)}</span>
            </div>
            <div className='flex p-4 border rounded-md items-center space-x-4 w-full'>
                <span>Total trees planted (<span className='lowercase'>$1/tree</span>):</span>
                <div className='flex space-x-2'>
                    <span className='font-bold text-xl sm:text-3xl md:text-4xl text-green-700'>{Math.floor(ethRatesForDonation.usd)}</span>
                    <div className='w-5 h-5 sm:w-10 sm:h-10'><img src='tree.png' alt='tree' /></div>
                </div>
            </div>
        </div>
    )
}

export default DonationsInfo
