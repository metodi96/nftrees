import React from 'react'
import '../styles/about.css'

const About = () => {
    return (
        <div>
            <section className="text-gray-700">
                <div className="container px-5 py-24 mx-auto">
                    <div className="text-center mb-20">
                        <h1 className="sm:text-5xl text-2xl text-center font-bold title-font text-gray-900 mb-4">
                            What is <span className='text-green-700'>NFTrees</span> all about?
                        </h1>
                        <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
                            Here you will find some answers about the platform and how it approaches the issue with the high energy consumption that comes with minting a single NFT
                        </p>
                    </div>
                    <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
                        <div className="w-full lg:w-1/2 px-4 py-2">
                            <details className="mb-4 border-2 rounded-xl p-2" >
                                <summary className="font-semibold text-sm bg-white rounded-xl hover:bg-gray-100 cursor-pointer py-4 px-4">
                                    What is an NFT?
                                </summary>
                                <div className='py-4 px-2'>
                                    <span>
                                        A non-fungible token (NFT) is a special token that is different from the fungible ones
                                        in a sense that each piece is unique and cannot be replaced with something else.
                                        This means that each digital artwork created on this platform has its own unique value
                                        independent from the value of the other artworks.
                                </span>
                                </div>
                            </details>

                            <details className="mb-4 border-2 rounded-xl p-2" >
                                <summary className="font-semibold text-sm bg-white rounded-xl hover:bg-gray-100 cursor-pointer py-4 px-4">
                                    What does minting a token mean?
                                </summary>
                                <div className='py-4 px-2'>
                                    <span>
                                        Minting is the process of creating/generating a new NFT. There is no fixed total supply.
                                </span>
                                </div>
                            </details>

                            <details className="mb-4 border-2 rounded-xl p-2" >
                                <summary className="font-semibold text-sm bg-white rounded-xl hover:bg-gray-100 cursor-pointer py-4 px-4">
                                    What issues from environmental nature come from minting?
                                </summary>
                                <div className='py-4 px-2'>
                                    <span>
                                        Currently due to the nature of the Proof-of-Work consensus nature of Ethereum and many other blockchain networks
                                        each transaction on the blockchain needs to be validated by the so called miners who in turn try to guess a nonce
                                        which is a key that is necessary to solve a cryptographic puzzle and to form a block. This costs a tremendous amount
                                        of energy resources which in turn are obtained by razing forests or mining coal.
                                </span>
                                </div>
                            </details>

                            <details className="mb-4 border-2 rounded-xl p-2" >
                                <summary className="font-semibold text-sm bg-white rounded-xl hover:bg-gray-100 cursor-pointer py-4 px-4">
                                    How do we approach those issues?
                                </summary>
                                <div className='py-4 px-2'>
                                    <span>
                                        We incorporate a tax of minimum 0.001 eth in the minting process. This will be sent to one of the authorized recipients
                                        which are non-profit organizations whose goal is to plant trees all around the world.
                                    </span>
                                </div>
                            </details>

                            <details className="mb-4 border-2 rounded-xl p-2" >
                                <summary className="font-semibold text-sm bg-white rounded-xl hover:bg-gray-100 cursor-pointer py-4 px-4">
                                    Which ERC-standard does the smart contract comply to?
                                </summary>
                                <div className='py-4 px-2'>
                                    <span>
                                        ERC-721.
                                </span>
                                </div>
                            </details>

                            <details className="mb-4 border-2 rounded-xl p-2" >
                                <summary className="font-semibold text-sm bg-white rounded-xl hover:bg-gray-100 cursor-pointer py-4 px-4">
                                    Where can I find the source code?
                                </summary>
                                <div className='py-4 px-2'>
                                    <span>
                                        https://github.com/metodi96/nftrees
                                    </span>
                                </div>
                            </details>
                        </div>
                        <div className="w-full lg:w-1/2 px-4 py-2">
                            <details className="mb-4 border-2 rounded-xl p-2" >
                                <summary className="font-semibold text-sm  bg-white rounded-xl hover:bg-gray-100 cursor-pointer py-4 px-4">
                                    How can I be sure that the fee will go to the authorized NPOs?
                                </summary>
                                <div className='py-4 px-2'>
                                    <span>
                                        The transaction will fail if the address of the recipient which is specified as a parameter to the minting function
                                        in the smart contract is not part of the list of authorized accounts.
                                </span>
                                </div>
                            </details>
                            <details className="mb-4 border-2 rounded-xl p-2" >
                                <summary className="font-semibold text-sm bg-white rounded-xl hover:bg-gray-100 cursor-pointer py-4 px-4">
                                    What is the current state of the platform?
                                </summary>
                                <div className='py-4 px-2'>
                                    <span>
                                        Currently the platform tries to showcase the idea of incorporating a small extra fee in the minting process
                                        which is to be sent to a list of authorized accounts. These are test accounts which should be replaced with
                                        ones by NPOs (non-profit organizations) should the project be launched on the mainnet. Users can now mint
                                        a NFT, transfer fees to one of the few authorized accounts and see a list of their own NFTs, each of which
                                        has a name, description, a digital artpiece as an image and a so called green rank.
                                    </span>
                                </div>
                            </details>
                            <details className="mb-4 border-2 rounded-xl p-2" >
                                <summary className="font-semibold text-sm bg-white rounded-xl hover:bg-gray-100 cursor-pointer py-4 px-4">
                                    I noticed that my minted NFTs have ranks. What do they mean?
                                </summary>
                                <div className='py-4 px-2'>
                                    <span>
                                        The ranks are calculated based on the amount of eth that has been transferred via transactions
                                        with the NFT. There are for now 5 ranks in total.
                                        Rank 1 is for total donations less than Ξ0.01.
                                        Rank 2 is for donations larger than or equal to Ξ0.01 and less than Ξ0.02.
                                        Rank 2 is for donations larger than or equal to Ξ0.02 and less than Ξ0.04.
                                        Rank 2 is for donations larger than or equal to Ξ0.04 and less than Ξ0.07.
                                        Rank 5 is for donations larger than or equal to Ξ0.07.
                                        More ranks might be included in the future.
                                    </span>
                                </div>
                            </details>

                            <details className="mb-4 border-2 rounded-xl p-2" >
                                <summary className="font-semibold text-sm bg-white rounded-xl hover:bg-gray-100 cursor-pointer py-4 px-4">
                                    How are the non-profit organizations being authorized?
                                </summary>
                                <div className='py-4 px-2'>
                                    <span>
                                        Currently only the owner of the deployed smart contract has the power to authorize recipients (non-profit organizations).
                                        In the future a governance system might be introduced to eliminate the need to trust a single individual.
                                    </span>
                                </div>
                            </details>

                            <details className="mb-4 border-2 rounded-xl p-2" >
                                <summary className="font-semibold text-sm bg-white rounded-xl hover:bg-gray-100 cursor-pointer py-4 px-4">
                                    Does NFTrees have a governance system?
                                </summary>
                                <div className='py-4 px-2'>
                                    <span>
                                        This can be introduced in the future. A possible approach is to have each NFT receive governance tokens
                                        based on its rank. The owner of that NFT can vote on non-profit organizations which are to be included or excluded
                                        from the list.
                                    </span>
                                </div>
                            </details>

                            <details className="mb-4 border-2 rounded-xl p-2" >
                                <summary className="font-semibold text-sm bg-white rounded-xl hover:bg-gray-100 cursor-pointer py-4 px-4">
                                    What are the next steps?
                                </summary>
                                <div className='py-4 px-2'>
                                    <span>
                                        Include an auction system where users can sell their NFTs and again part of the
                                        price will be redirected to a non-profit organization. The exact % has yet to be determined
                                        in the future.
                                    </span>
                                </div>
                            </details>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About
