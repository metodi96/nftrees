import React, { useState, useEffect, useContext } from 'react'
import TreeSection from '../components/TreeSection'
import AppContext from '../appContext'
import axios from 'axios'
import { convertToBase32 } from '../utils/ipfsUtils'
import DonationsInfo from '../components/DonationsInfo'
import { FixedSizeList as List } from 'react-window';
import NFTCardRenderer from '../components/NFTCardRenderer'

const Explore = () => {

    const { greenCollectibleContract, account } = useContext(AppContext)
    const [allNFTs, setAllNFTs] = useState([])
    const [sumOfAllNFTDonations, setSumOfAllNFTDonations] = useState(0)

    useEffect(() => {
        const runEffect = async () => {
            if (typeof greenCollectibleContract !== 'undefined' && account !== '') {
                console.log('Getting donations...')
                let donations = 0
                const totalSupply = await greenCollectibleContract.methods.totalSupply().call()
                for (let i = 1; i <= totalSupply; i++) {
                    const donationByNFT = await greenCollectibleContract.methods.totalDonationsByNFT(i).call()
                    donations += parseInt(donationByNFT)
                }
                console.log('Donations: ', donations)
                setSumOfAllNFTDonations(donations)
            }
        }
        runEffect()
    }, [account, greenCollectibleContract])

    useEffect(() => {
        const runEffect = async () => {
            if (typeof greenCollectibleContract !== 'undefined' && account !== '') {
                console.log('Getting all items...')
                let items = []
                const totalSupply = await greenCollectibleContract.methods.totalSupply().call()
                for (let i = 1; i <= totalSupply; i++) {
                    const tokenURI = await greenCollectibleContract.methods.tokenURI(i).call()
                    const donationByToken = await greenCollectibleContract.methods.totalDonationsByNFT(i).call()
                    const response = await axios.get(`https://${convertToBase32(tokenURI)}.ipfs.dweb.link`)
                    if (response.status === 200) {
                        items.push({ ...response.data, donation: donationByToken })
                    } else {
                        items.push({ name: '', description: '', imageURL: '', donation: donationByToken })
                    }
                }
                console.log(items)
                setAllNFTs(items)
            }
        }
        runEffect()
    }, [account, greenCollectibleContract])


    return (
        <div className='flex flex-col space-y-4 mb-10'>
            <TreeSection />
            <div className='flex flex-col items-center space-y-4 mb-10'>
                <List
                    height={450}
                    itemCount={allNFTs.length}
                    itemSize={300}
                    itemData={allNFTs}
                    layout="horizontal"
                    width={900}
                >
                    {NFTCardRenderer}
                </List>
                {/*<div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-center'>
                    {
                        allNFTs.map((entry, index) => (
                            <NFTCard key={index} entry={entry} />
                        ))
                    }
                </div>*/}
                <DonationsInfo key={sumOfAllNFTDonations} donation={sumOfAllNFTDonations} />
            </div>

        </div>
    )
}

export default Explore
