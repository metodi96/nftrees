import React from 'react'
import ErrorField from './ErrorField'

const TextInput = (props) => {
    const { inputType, optional, placeholder, input, onChange, isValid, submitted } = props

    return (
        <div className='flex flex-col space-y-2'>
            <div>
                <span className='font-bold text-lg'>{inputType}</span>
                {optional && <span className='ml-2'>(Optional)</span>}
            </div>
            <input
                className={`pb-3 focus:outline-none ${((isValid && submitted) || !submitted) && `focus:border-green-700`} 
                border-b-2 ${!isValid && submitted && `border-red-700`} font-bold`}
                type='text'
                placeholder={placeholder}
                value={input}
                onChange={onChange}
                autoCapitalize='sentences'
                spellCheck='true'
                autoComplete='on'
                autoCorrect='on'
            />
            {!isValid && submitted && <ErrorField content='This field cannot be empty.'/>}
        </div>
    )
}

export default TextInput
