import React from 'react'
// import CheckboxGroup from './CheckboxGroup'
import DatePicker from './DatePicker'
import Input from './Input'
// import RadioButtons from './RadioButtons'
import Select from './Select'
import Textarea from './Textarea'
import FileUpload from './FileUpload'
import RadioButtons from './RadioButtons'
import ShowData from './ShowData'
import FieldArrayMenu from './FieldArrayMenu'

function FormikControl(props) {
    const { control, ...rest } = props
    switch(control){
        case 'input'        : 
            return <Input {...rest}/>
        case 'textarea'     :
            return <Textarea {...rest} />
        case 'select'       :
            return<Select {...rest} />
        case 'radio'        :
            return <RadioButtons {...rest} />
        // case 'checkbox'     :
        //     return <CheckboxGroup {...rest} />
        case 'date'         :
            return <DatePicker {...rest} />
        case 'file'         :
            return <FileUpload {...rest} />
        case 'showdata'     :
            return <ShowData {...rest} />
        case 'addmenu'      :
            return <FieldArrayMenu {...rest} />
        default             :
            return null
    }

}

export default FormikControl