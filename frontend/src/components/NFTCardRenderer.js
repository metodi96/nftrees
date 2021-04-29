import React from 'react'
import NFTCard from './NFTCard'

const NFTCardRenderer = ({ data, index, style }) => {

    const GUTTER_SIZE = 4;
    const item = data[index]
    return (
        <div style={{
            ...style,
            left: style.left + GUTTER_SIZE*8,
            width: style.width - GUTTER_SIZE*8,
            height: style.height - GUTTER_SIZE*8
          }} className='flex'>
            <NFTCard key={index} entry={item} />
        </div>
    )
}

export default NFTCardRenderer
