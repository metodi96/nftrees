import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../appContext'
import NFTCard from '../components/NFTCard'
import { convertToBase32 } from '../utils/ipfsUtils'
import axios from 'axios'
import {
    getEthRates,
    fetchConversionRate
} from '../utils/conversionRate';
import { convertToTokens } from '../utils/contracts'

const MyItems = () => {
    const { greenCollectibleContract, account, web3 } = useContext(AppContext)
    const [myItems, setMyItems] = useState([])

    const [ethRatesForDonation, setEthRatesForDonation] = useState({ eth: '', usd: '' })

    useEffect(() => {
        const runEffect = async () => {
            if (typeof greenCollectibleContract !== 'undefined' && account !== '') {
                const donationsFromContract = await greenCollectibleContract.methods.totalDonations(account).call()
                console.log(convertToTokens(donationsFromContract, web3))
                try {
                    await fetchConversionRate();
                    setEthRatesForDonation(getEthRates(parseFloat(convertToTokens(donationsFromContract, web3))));
                } catch (err) {
                    console.log(err)
                }

            }
        }
        runEffect()
    }, [account, greenCollectibleContract, web3])

    useEffect(() => {
        const runEffect = async () => {
            if (typeof greenCollectibleContract !== 'undefined' && account !== '') {
                console.log('Getting my items...')
                let items = []
                const totalSupply = await greenCollectibleContract.methods.totalSupply().call()
                const balanceOf = await greenCollectibleContract.methods.balanceOf(account).call()
                let ownItemsFound = 0;
                for (let i = 1; i <= totalSupply; i++) {
                    if (balanceOf === ownItemsFound) break
                    const owner = await greenCollectibleContract.methods.ownerOf(i).call()
                    if (owner === account) {
                        const tokenURI = await greenCollectibleContract.methods.tokenURI(i).call()
                        const response = await axios.get(`https://${convertToBase32(tokenURI)}.ipfs.dweb.link`)
                        if (response.status === 200) {
                            items.push({ ...response.data, tokenURI: tokenURI })
                        } else {
                            items.push({ name: '', description: '', imageURL: '', tokenURI: tokenURI })
                        }
                        ownItemsFound++;
                    }
                }
                setMyItems(items)
            }
        }
        runEffect()
    }, [account, greenCollectibleContract])
    return (
        <div className='flex flex-col items-center space-y-4 mb-10'>
            <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-center'>
                {
                    myItems.map((entry, index) => (
                        <NFTCard key={index} entry={entry} />
                    ))
                }
            </div>
            <div className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 text-base sm:text-lg font-bold uppercase'>
                <div className='flex p-4 border rounded-md items-center space-x-4 w-full'>
                    <span>Total donations:</span>
                    <span className='font-bold text-xl sm:text-3xl md:text-4xl text-green-700'>${ethRatesForDonation.usd}</span>
                </div>
                <div className='flex p-4 border rounded-md items-center space-x-4 w-full'>
                    <span>Total trees planted:</span>
                    <div className='flex space-x-2'>
                        <span className='font-bold text-xl sm:text-3xl md:text-4xl text-green-700'>{Math.floor(ethRatesForDonation.usd)}</span>
                        <div className='w-5 h-5 sm:w-10 sm:h-10'><img src='tree.png' alt='tree' /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyItems
