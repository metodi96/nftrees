export const checkIsValidFile = (selectedFile) => {
    return selectedFile.src !== '' && selectedFile.alt !== ''
}

export const checkIsValidDonation = (donation) => {
    const regExFloatStrict = /^([0-9]*[.])?[0-9]+$/;
    return donation !== '' && regExFloatStrict.test(donation) && parseFloat(donation) >= 0.001
}

export const checkIsValidName = (name) => {
    return name !== ''
}