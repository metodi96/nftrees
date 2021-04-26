import React from 'react'

function ErrorField({ content }) {
    return (
        <span className='text-red-700 font-medium text-sm'>
            {content}
        </span>
    )
}

export default ErrorField
