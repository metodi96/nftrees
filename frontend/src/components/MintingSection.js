import React, { useState, useEffect } from 'react'
import ImagePicker from '../elements/ImagePicker'
import DonationInput from '../elements/DonationInput'
import GeneralInformation from '../components/GeneralInformation'
import { checkIsValidFile, checkIsValidDonation, checkIsValidName } from '../utils/validation'
import ipfs from '../utils/ipfs'

const MintingSection = () => {
    const [selectedFile, setSelectedFile] = useState({ src: '', alt: '', buffer: '' });
    const [donation, setDonation] = useState(0.001)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        if ((checkIsValidName(name) && checkIsValidDonation(donation) && checkIsValidFile(selectedFile)) || !submitted) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [donation, name, selectedFile, submitted])

    //https://dev.to/yosraskhiri/make-an-image-preview-in-react-js-301f
    const handlePickFile = (e) => {
        if (e.target.files[0]) {
            const reader = new FileReader()
            reader.readAsArrayBuffer(e.target.files[0])
            reader.onloadend = () => {
                setSelectedFile({
                    src: URL.createObjectURL(e.target.files[0]),
                    alt: e.target.files[0].name,
                    buffer: e.target.files[0]
                })
            }

        }
    }

    const removeFile = () => {
        setSelectedFile({
            src: '',
            alt: '',
            buffer: ''
        });
    }

    const handleDonationInput = (e) => {
        //1231. is valid at this point - we would cover this case on submit!
        const input = e.target.value
        const regExFloatNotStrict = /^([0-9]*[.])?([0-9]?)+$/;
        if (input === '' || regExFloatNotStrict.test(input)) {
            setDonation(input)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitted(true)

        if ((checkIsValidName(name) && checkIsValidDonation(donation) && checkIsValidFile(selectedFile))) {
            console.log('submit')
            console.log('name', name)
            console.log('selected file', selectedFile)
            console.log('donation ', donation)
            try {
                const { cid } = await ipfs.add(selectedFile.buffer)
                console.log(cid)
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <div className='relative border-2 rounded-lg p-8 space-y-4 mb-4'>
            <div className='absolute right-0 top-0 p-2 border-l-2 border-b-2'>
                <span className='font-bold text-gray-400'>ERC-721</span>
            </div>
            <div className='space-y-10'>
                <ImagePicker selectedFile={selectedFile} handlePickFile={handlePickFile} removeFile={removeFile}
                    isValid={checkIsValidFile(selectedFile)} submitted={submitted} />
                <DonationInput donation={donation} handleDonationInput={handleDonationInput} isValid={checkIsValidDonation(donation)}
                    submitted={submitted} />
                <GeneralInformation name={name} description={description} handleChangeName={e => setName(e.target.value)}
                    handleChangeDescription={e => setDescription(e.target.value)} submitted={submitted} />
                <div className='flex justify-center'>
                    <button
                        className={`${disabled ? `bg-gray-200 text-white` :
                            `bg-white border-green-700 border-2 hover:shadow-xl text-green-700`} 
                         w-30 sm:w-40 font-bold py-2 px-4 rounded mt-4`}
                        onClick={handleSubmit}
                        disabled={disabled}>Create Item</button>
                </div>
            </div>
        </div>
    )
}

export default MintingSection
