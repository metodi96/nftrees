import React, { useState, useEffect, useContext } from 'react'
import TreeSection from '../components/TreeSection'
import AppContext from '../appContext'
import axios from 'axios'
import { convertToBase32 } from '../utils/ipfsUtils'
import DonationsInfo from '../components/DonationsInfo'
import { FixedSizeList as List } from 'react-window';
import NFTCardRenderer from '../components/NFTCardRenderer'
import LoadingSkeleton from '../components/LoadingSkeleton'
import AutoSizer from "react-virtualized-auto-sizer"
import { computeWidth } from '../utils/autosizer'

const Explore = () => {

    const { greenCollectibleContract, account } = useContext(AppContext)
    const [allNFTs, setAllNFTs] = useState([])
    const [sumOfAllNFTDonations, setSumOfAllNFTDonations] = useState(0)
    const [loading, setLoading] = useState(true)

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
                setLoading(true)
                let items = []
                try {
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
                } catch (e) {
                    console.log(e)
                } finally {
                    setAllNFTs(items)
                    setLoading(false)
                }
            }
        }
        runEffect()
    }, [account, greenCollectibleContract])


    return (
        <div className='flex flex-col space-y-4 mb-10'>
            <TreeSection />
            {loading && <LoadingSkeleton />}
            {!loading && allNFTs.length > 0 && <div className='flex flex-col mt-10'>
                <div className='border-b-2 mb-4 flex space-x-2 px-12'>
                    <img src='art.png' alt='art' width='24' height='24' />
                    <h3 className='text-left text-gray-400 font-bold'>Collectibles</h3>
                </div>
                <div className='w-full mb-10' style={{ height: '450px', width: computeWidth(allNFTs.length) }}>
                    <AutoSizer>
                        {({ height, width }) => (
                            <List
                                height={height}
                                itemCount={allNFTs.length}
                                itemSize={300}
                                itemData={allNFTs}
                                layout="horizontal"
                                width={width}
                            >
                                {NFTCardRenderer}
                            </List>
                        )}
                    </AutoSizer>
                </div>
                <DonationsInfo key={sumOfAllNFTDonations} donation={sumOfAllNFTDonations} />
                </div>
            }
        </div>
    )
}

export default Explore
