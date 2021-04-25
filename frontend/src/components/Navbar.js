import React, { useContext } from 'react'
import CustomNavLink from '../elements/CustomNavLink'
import AppContext from '../appContext'
import { handleConnect, handleInstall } from '../utils/metamask'

const Navbar = () => {
    const { account, hasWalletAddressAfterChange } = useContext(AppContext);

    const renderMetaMaskLabel = () => {
        if (window.ethereum) {
            return !hasWalletAddressAfterChange && !account ?
                <button type="button" onClick={handleConnect} className="bg-transparent flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                    <span className="sr-only">Open user menu</span>
                    <img className="h-8 w-8 rounded-full" src="metamask.png" alt="metamask-icon" />
                    <span className='hover:text-gray-500'>Connect</span>
                </button>
                :
                <div>Connected
                    <span className="absolute -left-4 top-1.5 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                </div>


        } else {
            return (
                <button type="button" className="bg-transparent flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                    <span className="sr-only">Open user menu</span>
                    <img className="h-8 w-8 rounded-full" src="metamask.png" alt="metamask-icon" />
                    <button onClick={handleInstall} className='hover:text-grey-500'>Connect</button>
                </button>
            )
        }
    };

    return (
        <div className='shadow-md'>
            <nav className="bg-white">
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between h-20">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <button type="button" className="inline-flex items-center justify-center p-2 rounded-md hover:text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                                <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex-shrink-0 flex items-center">
                            <a className="block lg:hidden" href="/" rel='noreferrer'><img className="h-16 w-auto" src="logo.png" alt="NFTrees Logo" /></a>
                            <a className="hidden lg:block" href="/" rel='noreferrer'><img className="h-16 w-auto" src="logo.png" alt="NFTrees Logo" /></a>
                            </div>
                            <div className="hidden sm:block sm:ml-6">
                                <div className="flex space-x-4 my-2">
                                    <CustomNavLink content='Explore' path='/' activeClassName='nav-link-active' classes="relative nav-link text-gray-800 px-3 py-2 rounded-md text-md font-bold" />
                                    <CustomNavLink content='Create' path='/create' activeClassName='nav-link-active' classes="relative nav-link text-gray-800 px-3 py-2 rounded-md text-md font-bold" />
                                    <CustomNavLink content='About' path='/about' activeClassName='nav-link-active' classes="relative nav-link text-gray-800 px-3 py-2 rounded-md text-md font-bold" />
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <div className="ml-3 relative">
                                <div>
                                    {renderMetaMaskLabel()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sm:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <CustomNavLink content='Explore' path='/' classes="text-gray-800 hover:bg-green-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" />
                        <CustomNavLink content='Create' path='/create' classes="text-gray-800 hover:bg-green-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" />
                        <CustomNavLink content='About' path='/about' classes="text-gray-800 hover:bg-green-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" />
                    </div>
                </div>

            </nav>
            {/*<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#065f46" fillOpacity="1" d="M0,96L60,85.3C120,75,240,53,360,64C480,75,600,117,720,160C840,203,960,245,1080,266.7C1200,288,1320,288,1380,288L1440,288L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
                </svg>*/}
        </div>
    )
}

export default Navbar
