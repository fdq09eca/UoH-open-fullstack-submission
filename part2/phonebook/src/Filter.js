import React from 'react'

function Filter({ value, onChange }) {
    return <>filter shown with: <input value={value} onChange={onChange} /></>
}

export default Filter
