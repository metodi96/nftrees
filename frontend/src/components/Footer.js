import React from 'react'
import CustomNavLink from '../elements/CustomNavLink'

const Footer = () => {
    return (
        <div className="bg-green-700 bottom-0 w-full">
            <div className="max-w-6xl m-auto text-white flex sm:flex-row sm:space-x-16 mt-4 flex-col text-center h-auto">
                <div className='text-white flex flex-col justify-center items-center sm:space-y-2 px-4 pb-2'>
                    <img src='logo_white.png' alt='white logo' width='40' height='40' />
                    <h1>NFTrees</h1>
                    <p className='sm:w-44 sm:text-sm text-xs w-24'>Mint and trade your NFTs and plant some trees.</p>
                </div>
                <div className="p-5 mb-2 sm:mb-0">
                    <div className="font-bold text-white">Home</div>
                    
                    <div className='flex flex-col text-sm'>
                        <CustomNavLink content='Explore' path='/' classes='sm:my-3 text-whitetext-xs hover:text-gray-300' />
                        <CustomNavLink content='About' path='/about' classes="text-whitetext-xs hover:text-gray-300" />
                    </div>
                </div>
                <div className="p-5 mb-2 sm:mb-0">
                    <div className="font-bold text-white">My Profile</div>
                    <div className='flex flex-col text-sm'>
                        <CustomNavLink content='My Items' path='/my-items' classes='sm:my-3 text-whitetext-xs hover:text-gray-300' />
                    </div>
                </div>
                <div className="p-5">
                    <div className="font-bold text-white">Useful Links</div>
                    <div className='flex flex-col text-sm'>
                        <a href='https://github.com/levskarcheto96/-Awareness-Bounty-NFTrees' rel='noreferrer' target='_blank' className='sm:my-3 text-whitetext-xs hover:text-gray-300'>Idea</a>
                        <a href='https://github.com/metodi96/nftrees' rel='noreferrer' target='_blank' className='text-whitetext-xs hover:text-gray-300'>Source Code</a>
                    </div>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}

export default Footer
