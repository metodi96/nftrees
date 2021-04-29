import React, { useState, useEffect, useContext } from 'react'
import TopTenEntry from './TopTenEntry'
import AppContext from '../appContext'
const TopTenList = () => {
    const { greenCollectibleContract, account, web3 } = useContext(AppContext)
    const [topTenGreenNFTs, setTopTenGreenNFTs] = useState([])

    useEffect(() => {
        const runEffect = async () => {
            if (typeof greenCollectibleContract !== 'undefined' && account !== '') {
                let topTenList = []
                for (let i = 0; i < 10; i++) {
                    const entry = ''
                    topTenList.push(entry)
                }
                console.log(topTenList)
                setTopTenGreenNFTs(topTenList)
            }
        }
        runEffect()
    }, [account, greenCollectibleContract, web3])

    return (
        <div class="flex flex-col">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        #
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Address
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Donations
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Trees Planted
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <TopTenEntry />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopTenList
