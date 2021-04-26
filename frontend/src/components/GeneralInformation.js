import React from 'react'
import TextInput from '../elements/TextInput'
import Textarea from '../elements/Textarea'
import { checkIsValidName } from '../utils/validation'

const GeneralInformation = (props) => {
    const { name, description, handleChangeName, handleChangeDescription, submitted } = props
    return (
        <div className='flex flex-col space-y-4'>
            <TextInput inputType='Name' optional={false} placeholder='e.g. "A football with gray stripes"'
                input={name} onChange={handleChangeName} isValid={checkIsValidName(name)} submitted={submitted} />
            <Textarea inputType='Description' optional={true} placeholder='e.g. "Hopefully to be used in the next world cup"'
                input={description} onChange={handleChangeDescription} />
        </div>
    )
}

export default GeneralInformation
