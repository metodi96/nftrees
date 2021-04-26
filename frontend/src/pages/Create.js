import React from 'react'

import MintingSection from '../components/MintingSection';

const Create = () => {

    return (
        <div className='flex w-full flex-col space-y-8 mt-4 sm:mt-12 items-center bg-grey-lighter'>
            <h1 className="sm:text-4xl text-2xl font-bold">Create a <span className='text-green-700'>green</span> collectible</h1>
            <MintingSection />
        </div>
    )
}

export default Create
