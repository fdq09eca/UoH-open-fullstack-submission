import React from 'react'

function InputNumber({ value, onChange }) {
    return <p>number: <input value={value} onChange={onChange} /></p>
}
function InputName({ value, onChange }) {
    return <p>name: <input value={value} onChange={onChange} /></p>
}

function PersonForm({ onSubmit, nameValue, numberValue, onChangeNewName, onChangeNewNumber }) {
    return <form onSubmit={onSubmit}>
        <h2>add a new</h2>
        <InputName value={nameValue} onChange={onChangeNewName} />
        <InputNumber value={numberValue} onChange={onChangeNewNumber} />
        <button type="submit">add</button>
    </form>
}



export default PersonForm