import React, { useContext } from 'react'
import AppContext from '../appContext'

const MyItems = () => {
    const { greenCollectibleContract, account, handleBlockScreen, web3 } = useContext(AppContext)

    return (
        <div>
            My Items
        </div>
    )
}

export default MyItems
