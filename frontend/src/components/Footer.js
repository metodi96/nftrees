import React from 'react'
import CustomNavLink from '../elements/CustomNavLink'

const Footer = () => {
    return (
        <div>
            <div className="bg-green-700">
                <div className="max-w-6xl m-auto text-white flex justify-between h-40">
                    <div className="p-5 w-48 ">
                        <div className="text-xs uppercase text-white font-medium">Home</div>
                        <hr />
                        <div className='flex flex-col'>
                            <CustomNavLink content='Explore' path='/' classes='my-3 text-whitetext-xs hover:text-gray-300' />
                            <CustomNavLink content='FAQ' path='/faq' classes="text-whitetext-xs hover:text-gray-300" />
                        </div>
                    </div>
                    <div className="p-5 w-48 ">
                        <div className="text-xs uppercase text-white font-medium">Contact us</div>
                        <hr />
                        <span className="my-3 block" href="/#">NFTrees Inc, Street, Country <span className="text-whitetext-xs p-1"></span></span>
                        <a className="my-3 block" href="/#">contact@company.com <span className="text-whitetext-xs p-1"></span></a>
                    </div>
                </div>
            </div>


        </div >

    )
}

export default Footer
