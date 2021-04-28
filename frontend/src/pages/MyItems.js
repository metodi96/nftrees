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
            <div className='flex justify-center mx-4 space-x-4'>
                {
                    myItems.map((entry, index) => (
                        <NFTCard key={index} entry={entry} />
                    ))
                }
            </div>
            <div className='flex space-x-4 text-lg font-bold uppercase'>
                <div className='p-4 border rounded-md items-center space-x-4'>
                    <span>Total donations:</span>
                    <span className='font-bold text-4xl text-green-700'>${ethRatesForDonation.usd}</span>
                </div>
                <div className='flex p-4 border rounded-md items-center space-x-4'>
                    <span>Total trees planted:</span>
                    <div className='flex space-x-2'>
                        <span className='font-bold text-4xl text-green-700'>{Math.floor(ethRatesForDonation.usd)}</span>
                        <img src='tree.png' alt='tree' width='40' height='30' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyItems
