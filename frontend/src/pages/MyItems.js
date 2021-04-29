import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../appContext'
import NFTCard from '../components/NFTCard'
import { convertToBase32 } from '../utils/ipfsUtils'
import axios from 'axios'
import EmptyResults from '../components/EmptyResults'
import DonationsInfo from '../components/DonationsInfo'

const MyItems = () => {
    const { greenCollectibleContract, account, web3 } = useContext(AppContext)
    const [myItems, setMyItems] = useState([])

    const [donationsByAccount, setDonationsByAccount] = useState(0)

    useEffect(() => {
        const runEffect = async () => {
            if (typeof greenCollectibleContract !== 'undefined' && account !== '') {
                const donations = await greenCollectibleContract.methods.totalDonationsByAccount(account).call()
                setDonationsByAccount(donations)
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
                        const donationByToken = await greenCollectibleContract.methods.totalDonationsByNFT(i).call()
                        const response = await axios.get(`https://${convertToBase32(tokenURI)}.ipfs.dweb.link`)
                        if (response.status === 200) {
                            items.push({ ...response.data, donation: donationByToken })
                        } else {
                            items.push({ name: '', description: '', imageURL: '', donation: donationByToken })
                        }
                        ownItemsFound++;
                    }
                }
                console.log(items)
                setMyItems(items)
            }
        }
        runEffect()
    }, [account, greenCollectibleContract])

    return (
        <div>
            {
                myItems.length > 0 ?
                    <div className='flex flex-col items-center space-y-4 mb-10'>
                        <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-center'>
                            {
                                myItems.map((entry, index) => (
                                    <NFTCard key={index} entry={entry} />
                                ))
                            }
                        </div>
                        <DonationsInfo donation={donationsByAccount} />
                    </div> :
                    <EmptyResults />
            }
        </div>
    )
}

export default MyItems
