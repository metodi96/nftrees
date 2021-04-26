import React, { useRef, useEffect } from 'react'
import autosize from 'autosize';

const Textarea = (props) => {
    const { inputType, optional, placeholder, input, onChange } = props
    const textareaRef = useRef()

    useEffect(() => {
        autosize(textareaRef.current);
    }, [])
    
    return (
        <div className='flex flex-col space-y-2'>
            <div>
                <span className='font-bold text-lg'>{inputType}</span>
                {optional && <span className='ml-2'>(Optional)</span>}
            </div>
            <textarea
                ref={textareaRef}
                className='pb-3 focus:outline-none focus:border-green-700 border-b-2 resize-none overflow-hidden font-bold box-border'
                type='text'
                placeholder={placeholder}
                value={input}
                onChange={onChange}
                autoCapitalize='sentences'
                spellCheck='true'
                autoComplete='on'
                autoCorrect='on'
                rows='1'
                dir='auto'
            />
        </div>
    )
}

export default Textarea
