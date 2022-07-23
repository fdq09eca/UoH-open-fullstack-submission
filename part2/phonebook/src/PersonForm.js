import React from 'react'

function InputNumber({ value, onChange }) {
    return <>number: <input value={value} onChange={onChange} /></>
}
function InputName({ value, onChange }) {
    return <>name: <input value={value} onChange={onChange} /></>
}

function PersonForm({ onSubmit, nameValue, numberValue, onChangeNewName, onChangeNewNumber }) {
    return <form onSubmit={onSubmit}>
        <h2>add a new</h2>
        <InputName value={nameValue} onChange={onChangeNewName} />
        <InputNumber value={numberValue} onChange={onChangeNewNumber} />
        <div>
            <button type="submit">add</button>
        </div>
    </form>
}



export default PersonForm