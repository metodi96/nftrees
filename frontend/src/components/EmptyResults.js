import React from 'react'

const EmptyResults = () => {
    return (
        <div className='flex flex-col w-full items-center text-center space-y-2'>
            <h1 className='font-bold'>No items found</h1>
            <h3 className='text-gray-400'>Refresh the page! Or create your own NFT now</h3>
            <a href='/create' rel='noreferrer' className="bg-green-700 w-30 sm:w-40 hover:shadow-xl text-white font-bold py-3 px-4 rounded-2xl">
                Create
            </a>
        </div>
    )
}

export default EmptyResults
