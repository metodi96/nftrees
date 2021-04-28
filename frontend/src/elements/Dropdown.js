import React, { useState, useRef, useEffect } from 'react'

const Dropdown = ({ chosenOrganization, pickOrganization }) => {
    const dropdownRef = useRef()
    const [open, setOpen] = useState(false)
    const [nonProfitOrganizations, setNonProfitOrganizations] = useState([
        { name: 'One Tree Planted', address: '0x36b0bCa3ccA85e8ac16195c47735e717dD1fB47A' },
        { name: 'Save the Earth', address: '0xb18af8525F2BF9d71f93163428274aB264412a4d' },
        { name: 'A future for Earth', address: '0xAbF2a39ec8708420b8A573AD50E15c1617BFeeF5' }
    ])

    //https://medium.com/@pitipatdop/little-neat-trick-to-capture-click-outside-with-react-hook-ba77c37c7e82
    const handleClickOutside = e => {
        if (dropdownRef.current.contains(e.target)) {
            // inside click
            return;
        }
        // outside click
        setOpen(false);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className="relative w-full space-y-4">
            <div>
                <span className='font-bold text-lg'>Choose a non-profit organization <br /> to donate to:</span>
            </div>
            <div className='relative'>
                <button type="button"
                    className="inline-flex w-full rounded-sm shadow-md border border-gray-300 px-4 py-4 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={() => setOpen(!open)}>
                    {`${chosenOrganization.name} (${chosenOrganization.address.substr(0, 6)}...${chosenOrganization.address.substr(chosenOrganization.address.length - 3, chosenOrganization.address.length)})`}
                </button>
                <svg className="absolute right-2 top-1/3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </div>
            {open &&
                <div className="origin-top-right w-full absolute right-0 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                    <div className="py-1" role="none">
                        {
                            nonProfitOrganizations.map((entry) => (
                                <button className="text-gray-700 block px-4 py-2 text-sm"
                                    key={entry.address}
                                    onClick={() => { pickOrganization(entry); setOpen(!open) }}>{entry.name} <span>{
                                        `(${entry.address.substr(0, 6)}...${entry.address.substr(entry.address.length - 3, entry.address.length)})`
                                    }</span></button>
                            ))
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default Dropdown
