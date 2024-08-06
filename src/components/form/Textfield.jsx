import { TextField } from '@mui/material'
import React from 'react'

const Textfield = ({value , handleChange , name , label , helperText , width}) => {
  return (
    <>
        <TextField
            label={label}
            required
            name={name}
            value={value}
            onChange={handleChange}
            // size='small'
            sx={{fontSize:'12px' , width:width ,mb:2 ,'& .MuiOutlinedInput-input':{padding:' 12px 14px'}}}
            InputLabelProps={{
                sx:{fontSize:'14px', color:'#1976d2' , fontWeight:500}
            }}
            helperText={helperText}
        />
    </>
  )
}

export default Textfield