import React from 'react'

function ShowData(props) {
    const { label, value } = props
    return (
        <div className="formSingleElement">
            <label className="formSingleElementLabel">{label}</label>
            <label className="formSingleElementField">{value}</label>
        </div>
    )
}

export default ShowData
