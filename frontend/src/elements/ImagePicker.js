import React, { useRef } from 'react'
import ErrorField from './ErrorField'

const ImagePicker = (props) => {

    const { selectedFile, handlePickFile, removeFile, isValid, submitted } = props
    const inputRef = useRef()

    const clickInputField = () => {
        inputRef.current.click()
    }

    return (
        <div>
            <label className='font-bold text-lg'>Upload file</label>
            <div className={`relative w-64 sm:w-96 my-2 flex flex-col items-center px-4 py-6 bg-white rounded-lg shadow-md tracking-wide border-2 border-dashed border-black
             ${!isValid && submitted && `border-red-700`}`}>
                {selectedFile.src === '' ?
                    <div className='flex flex-col space-y-2 items-center'>
                        <span className="text-xs leading-normal">PNG, JPEG, GIF or WEBP. Max 20MB.</span>
                        <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                        </svg>
                        <button className='bg-white border-2 hover:shadow-md hover:border-green-700 hover:text-green-700 px-14 py-2 font-bold rounded-lg' onClick={clickInputField}>
                            <span className="mt-2 text-base leading-normal">Choose File</span>
                        </button>
                        <input ref={inputRef} type='file' className="hidden" accept="image/png,image/jpeg,image/gif,image/webp" onChange={handlePickFile} />
                        {!isValid && submitted && <ErrorField content='No file.' />}
                    </div> : <div><img className='max-w-xs' src={selectedFile.src} alt={selectedFile.alt} />
                        <button className="absolute right-0 top-0 m-2 bg-grey-light hover:bg-grey text-grey-darkest font-bold rounded inline-flex items-center"
                            onClick={removeFile}>
                            <img src='remove.png' alt='remove picked file' width='35' height='35' />
                        </button></div>}
            </div>
        </div>
    )
}

export default ImagePicker
