import React from 'react'
import '../styles/dimmer.css'

const Dimmer = ({ reason }) => {

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-800 opacity-90 flex flex-col items-center justify-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            <h2 className="text-center text-white text-xl font-semibold">{reason === 'TX' ? 'Processing transaction...' : 'You are on a wrong network...'}</h2>
            <p className="w-1/3 text-center text-white">{reason === 'TX' ? 'The screen will be shown again upon success or failure.' : 'Please switch to either Rinkeby or your local Ganache network.'}</p>
        </div>
    )
}

export default Dimmer
