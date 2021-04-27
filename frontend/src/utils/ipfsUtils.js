import CID from 'cids'

export const convertToBase32 = (value) => {
    const cid = new CID(value)
    return cid.toV1().toBaseEncodedString('base32')
}