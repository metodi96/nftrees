import React from 'react'
import CustomNavLink from '../elements/CustomNavLink'

const Footer = () => {
    return (
        <div className="bg-green-700 bottom-0 w-full">
            <div className="max-w-6xl m-auto text-white flex h-auto">
                <div className='text-white flex flex-col justify-center space-y-2 p-4'>
                    <img src='logo_white.png' alt='white logo' width='40' height='40' />
                    <h1>NFTrees</h1>
                    <p className='w-44 text-sm'>Mint and trade your NFTs and plant some trees.</p>
                </div>
                <div className="p-5 w-48 ">
                    <div className="font-bold text-white">Home</div>
                    
                    <div className='flex flex-col text-sm'>
                        <CustomNavLink content='Explore' path='/' classes='my-3 text-whitetext-xs hover:text-gray-300' />
                        <CustomNavLink content='About' path='/about' classes="text-whitetext-xs hover:text-gray-300" />
                    </div>
                </div>
                <div className="p-5 w-48 ">
                    <div className="font-bold text-white">My Profile</div>
                    <div className='flex flex-col text-sm'>
                        <CustomNavLink content='My Items' path='/my-items' classes='my-3 text-whitetext-xs hover:text-gray-300' />
                    </div>
                </div>
                <div className="p-5 w-48 ">
                    <div className="font-bold text-white">Useful Links</div>
                    <div className='flex flex-col text-sm'>
                        <a href='https://github.com/levskarcheto96/-Awareness-Bounty-NFTrees' rel='noreferrer' target='_blank' className='my-3 text-whitetext-xs hover:text-gray-300'>Idea</a>
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
