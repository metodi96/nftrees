import React, { useState, useEffect, useContext } from 'react'
import ImagePicker from '../elements/ImagePicker'
import DonationInput from '../elements/DonationInput'
import GeneralInformation from '../components/GeneralInformation'
import { checkIsValidFile, checkIsValidDonation, checkIsValidName } from '../utils/validation'
import ipfs from '../utils/ipfs'
import { convertToBase32 } from '../utils/ipfsUtils'
import AppContext from '../appContext'
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import Dropdown from '../elements/Dropdown'

const MintingSection = () => {
    const { greenCollectibleContract, account } = useContext(AppContext)
    const [selectedFile, setSelectedFile] = useState({ src: '', alt: '', file: '' });
    const [donation, setDonation] = useState(0.001)
    const [chosenOrganization, setChosenOrganization] = useState(
        { name: 'One Tree Planted', address: '0x36b0bCa3ccA85e8ac16195c47735e717dD1fB47A' }
    )
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [submitted, setSubmitted] = useState(false)

    let history = useHistory();

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
            setSelectedFile({
                src: URL.createObjectURL(e.target.files[0]),
                alt: e.target.files[0].name,
                file: e.target.files[0]
            })
        }
    }

    const removeFile = () => {
        setSelectedFile({
            src: '',
            alt: '',
            file: ''
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

    const pickOrganization = (organization) => {
        setChosenOrganization(organization)
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
                const { cid } = await ipfs.add(selectedFile.file)
                console.log(convertToBase32(cid.string))
                const cidV1 = convertToBase32(cid.string)
                const metadata = {
                    name: name,
                    description: description,
                    imageURL: `ipfs://${cidV1}`
                }

                const cidMetadata = await ipfs.add(JSON.stringify(metadata))
                console.log('You will store the value: ', cidMetadata.cid + " in the smart contract!")
                const chosenNonProfitOrganization = '0x0b4b14BB8f0aD766eEC1C1A4DFBbdf1568eA4d28'
                await greenCollectibleContract.methods.createCollectibleAndDonate(cidMetadata.cid, chosenNonProfitOrganization).send({ from: account, gas: '2000000' })
                    .on('receipt', async () => {
                        toast.success(`Your NFT has been successfully minted!\nYou will now be redirected to your items.`, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            onClose: () => history.push("/my-items")
                        });
                    })
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
                <Dropdown chosenOrganization={chosenOrganization} pickOrganization={pickOrganization} />
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
