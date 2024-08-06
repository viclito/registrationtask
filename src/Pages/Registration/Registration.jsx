import { useState } from 'react'
import Layout from '../../components/Layout'
import { Box, Button, Checkbox, FormControlLabel, IconButton, MenuItem, TextField, Typography } from '@mui/material'
import Textfield from '../../components/form/Textfield';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useRegistrationSubmit } from '../../Hooks/useRegistrationSubmit';

const Registration = () => {

    const [typeToggle , setTypeToggle] = useState(false)
    const [mobile , setMobile] = useState('Telephone')

    const telephoneNo = ()=>{
        setMobile('Telephone') 
        setTypeToggle(false)
    }
    const mobileNo = ()=>{
        setMobile('Mobile') 
        setTypeToggle(false)
    }
    const [communications, setCommunications] = useState([
        { id: 1, mobileNo: '', telephoneNo:'', countryCode: '', areaCode: '', telephone: '' , checked: false},
      ]);

    const [formData, setFormData] = useState({
        panNumber: '',
        OrganaizationEmail: '',
        DarpanId:'',
        ConfirmEmail:'',
        OrganaizationName:'',
        communications:communications ,
        name :'' ,
        place :'',
        designation :'',
        consent:'',
        uploadFile: null,
      });

      
    
      const handleInputChange = (index, event) => {
        const { name, value , type, checked} = event.target;
        const updatedCommunications = [...communications];
        updatedCommunications[index][name] =  type === 'checkbox' ? checked : value;
        setCommunications(updatedCommunications);
      };

      const handleDeleteChecked = () => {
        const updatedCommunications = communications.filter((comm) => !comm.checked);
        setCommunications(updatedCommunications);
      };

      const handleSelectAll = (e) => {
        const { checked } = e.target;
        const updatedCommunications = communications.map((comm) => ({
          ...comm,
          checked,
        }));
        setCommunications(updatedCommunications);
      };

      const handleAddClick = () => {
        setCommunications([
          ...communications,
          { id: communications.length + 1, number: '', country: '', area: '', pincode: '', checked: false },
        ]);
      };
    
      const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
          ...formData,
          [name]: type === 'file' ? files[0] : value,
        });
      };

      const {mutate , error , isSuccess} = useRegistrationSubmit()

    const handleSubmit =async(e)=>{
        e.preventDefault()
        console.log( formData);
        let uploadFileBase64 = null;
        if (formData.uploadFile) {
            uploadFileBase64 = await fileToBase64(formData.uploadFile);
        }
        const formattedData = {
            arg :{
                name : "",
                initial_registration_answers :[
                    {
                        question_no:"IRQ-00001",
                        answer: formData.panNumber
                    },
                    {
                        question_no:"IRQ-00002",
                        answer: formData.DarpanId
                    },
                    {
                        question_no:"IRQ-00003",
                        answer: formData.OrganaizationName
                    },
                    {
                        question_no:"IRQ-00004",
                        answer: formData.OrganaizationEmail
                    },
                    {
                        question_no:"IRQ-00005",
                        answer: formData.ConfirmEmail
                    },
                    {
                        question_no:"IRQ-00006",
                        answer: ""
                    },
                    {
                        question_no:"IRQ-00007",
                        answer: formData.name
                    },
                    {
                        question_no:"IRQ-00008",
                        answer: formData.designation
                    },
                    {
                        question_no:"IRQ-00009",
                        answer: formData.place
                    },
                    {
                        question_no:"IRQ-00010",
                        answer: formData.consent
                    },
                    {
                        question_no:"IRQ-00011",
                        file_name : formData.uploadFile?.name || '',
                        attach_file:uploadFileBase64
                    },
                ]
            }
        }
        console.log(formattedData);
        
        
        mutate(formattedData)
        
    }

    const fileToBase64 = (file)=>{
        return new Promise ((resolve ,reject) =>{
            const reader = new FileReader()
            reader.onloadend = ()=> resolve(reader.result.split(',')[1])
            reader.onerror = reject
            reader.readAsDataURL(file)
        })
    }
  return (
    <Layout>
        <Box sx={{p:'30px 16px', width:'100%' , maxWidth:'1200px'}}>
            <form onSubmit={handleSubmit} style={{width:'100%'}}>
                <Box sx={{display:'flex' , flexWrap :'wrap' , gap:2  , maxWidth:'1050px'}}>
                    
                    <Textfield 
                        value ={formData.panNumber}
                        handleChange ={handleChange}
                        name ="panNumber"
                        label ="PAN Number"  
                        width='calc(50% - 10px)'
                        helperText="Organization's PAN exactly as per PAN card all CAPITALS without any spaces or full stop"
                    />
                    
                    <Textfield 
                        value ={formData.OrganaizationEmail}
                        handleChange ={handleChange}
                        name ="OrganaizationEmail"
                        label ="Organization Primary Email"  
                        helperText=""
                        width='calc(50% - 10px)'
                    />
                    
                    <Textfield 
                        value ={formData.DarpanId}
                        handleChange ={handleChange}
                        name ="DarpanId"
                        label ="Darpan ID"  
                        helperText="If you are not registered on NITI AAYOG DARPAN , please enter NA"
                        width='calc(50% - 10px)'
                    />
                    
                    <Textfield 
                        value ={formData.ConfirmEmail}
                        handleChange ={handleChange}
                        name ="ConfirmEmail"
                        label ="Confirm Email Address"  
                        helperText=""
                        width='calc(50% - 10px)'
                    />
                    
                    <Textfield 
                        value ={formData.OrganaizationName}
                        handleChange ={handleChange}
                        name ="OrganaizationName"
                        label ="Name of the Organization"  
                        helperText="Name as per Registration Certificate or Deed"
                        width='calc(50% - 10px)'
                    />
                </Box>
                <Box sx={{width:'100%' , border:'solid 1px #ccc' , borderRadius:2 }}>

                    <Box sx={{display:'flex' , justifyContent:'space-between' , py:2 , px:1 , borderBottom:'1px solid #ccc'}}>
                        <Typography variant='h6'>Communications</Typography>
                        <Box sx={{display:'flex' , gap:1}}>
                            {communications.length>1 ? <Button sx={{borderRadius:6 , textTransform:'inherit' , backgroundColor:'#C00000', '&:hover': { backgroundColor: '#C00000' }}} size='small' variant='contained' onClick={handleDeleteChecked}>Delete</Button> : <></>}
                            <Button sx={{borderRadius:6 , textTransform:'inherit' ,backgroundColor:'#00447b', '&:hover': { backgroundColor: '#00447b' }}} size='small' variant='contained' onClick={handleAddClick}>Add</Button>
                        </Box>
                    </Box>
                    <Box  sx={{display:'flex' , gap:1 , alignItems:'center', width:'100%' , p:1, borderBottom:'1px solid #ccc'}}>
                        {communications.length>1 ? 
                            <FormControlLabel
                            control={
                            <Checkbox
                                // checked='false'
                                // onChange={(e) => handleInputChange(index, e)}
                                onChange={handleSelectAll} 
                                name="selectAll"
                            />
                            }
                        />:<></>
                        }
                        <Box sx={{width:'30px', minWidth:'30px' , display:'flex' , justifyContent:'center' , alignItems:'center'}}>
                            <Typography variant='subtitle2' >No.</Typography>
                        </Box>
                        <Box sx={{flex:1 , display:'flex' }}>
                            <Box sx={{width:'25%', display:'flex' , pl:1 , position:'relative'}}>
                                <Typography variant='subtitle2' >{mobile} No .</Typography>
                                <IconButton disableRipple sx={{p:0}} onClick={()=>setTypeToggle(!typeToggle)}>
                                    <Typography variant='subtitle2' sx={{color:'black'}}> Type </Typography>
                                    <ArrowDownwardIcon sx={{fontSize:'1rem' , color:'black'}}/>
                                </IconButton>
                                <Box sx={{position:'absolute', top:'30px' , backgroundColor:'white' , boxShadow:'1px 1px 2px #ccc' , zIndex:30 , width:'150px' , display:typeToggle?'block':'none'}}>
                                    <Button variant='text' sx={{color:'black' , textTransform:'inherit'}} fullWidth onClick={telephoneNo}>Telephone</Button>
                                    <Button variant='text' sx={{color:'black' , textTransform:'inherit'}} fullWidth onClick={mobileNo}>Mobile</Button>
                                </Box>
                            </Box>
                            <Box sx={{width:'25%', display:'flex', pl:1}}>
                                <Typography variant='subtitle2' >Country </Typography>
                                <IconButton disableRipple sx={{p:0}} onClick={()=>setTypeToggle(!typeToggle)}>
                                    <Typography variant='subtitle2' sx={{color:'black'}}> Code </Typography>
                                    <ArrowDownwardIcon sx={{fontSize:'1rem' , color:'black'}}/>
                                </IconButton>
                            </Box>
                            <Box sx={{width:'25%', pl:1}}>
                                <Typography variant='subtitle2' >Area Code </Typography>
                            </Box>
                            <Box sx={{width:'25%', pl:1}}>
                                <Typography variant='subtitle2' >Telephone No </Typography>
                            </Box>
                        </Box>
                                
                    </Box>
                    
                    {
                        communications.map((item, index)=>(
                            <Box key={item.id} sx={{display:'flex' , gap:1 , alignItems:'center' , p:1}}>
                                {communications.length>1 ? 
                                    <FormControlLabel
                                    control={
                                    <Checkbox
                                        checked={item.checked}
                                        onChange={(e) => handleInputChange(index, e)}
                                        name="checked"
                                    />
                                    }
                                />:<></>
                                }
                                <Box sx={{width:'30px', minWidth:'30px' , display:'flex' , justifyContent:'center' , alignItems:'center'}}>
                                    <Typography variant='subtitle2' >{index +1}</Typography>
                                </Box>
                                <TextField 
                                    label="Number"
                                    name={mobile == 'Telephone'?"telephoneNo":"mobileNo"}
                                    value={mobile == 'Telephone'? item.telephoneNo :item.mobileNo}
                                    onChange={(e) => handleInputChange(index, e)}
                                    fullWidth
                                    
                                />
                                <TextField 
                                    label="Country Code"
                                    name="countryCode"
                                    value={item.countryCode}
                                    onChange={(e) => handleInputChange(index, e)}
                                    fullWidth
                                    
                                />
                                <TextField 
                                    label="Area Code"
                                    name="areaCode"
                                    value={item.areaCode}
                                    onChange={(e) => handleInputChange(index, e)}
                                    fullWidth
                                    
                                />
                                <TextField 
                                    label="Telephone"
                                    name="telephone"
                                    value={item.telephone}
                                    onChange={(e) => handleInputChange(index, e)}
                                    fullWidth
                                
                                />
                            </Box>
                        ))
                    }
                </Box>
                <Box sx={{display:'flex' , maxWidth:'1050px' , gap:'20px' , mt:3}}>
                    <Box sx={{width:'calc(50% - 10px)'}}>
                        <Textfield 
                            value ={formData.name}
                            handleChange ={handleChange}
                            name ="name"
                            label ="Name of the person filling the Form"  
                            helperText=""
                            width="100%"
                        />
                        <Textfield 
                            value ={formData.place}
                            handleChange ={handleChange}
                            name ="place"
                            label ="Place"  
                            helperText=""
                            width="100%"
                        />
                        <Textfield 
                            value ={formData.designation}
                            handleChange ={handleChange}
                            name ="designation"
                            label ="Designation of the Person"  
                            helperText=""
                            width="100%"
                        />
                    </Box>
                    <Box sx={{width:'calc(50% - 10px)'}}>
                        
                        <TextField
                            name="consent"
                            select
                            // size="small"
                            value={formData.consent}
                            onChange={handleChange}
                            label="Consent Obtained via"
                            required
                            type='text'
                            fullWidth
                            sx={{mb:2 , 
                            '& .MuiInputBase-input': { fontSize: '14px' },
                            '& .MuiOutlinedInput-input':{padding:' 12px 14px'}
                            }}
                            InputLabelProps={{
                                sx:{fontSize:'14px' , fontWeight:500}
                            }}
                        >
                            <MenuItem value='Online form submitted by NPO'>Online form submitted by NPO</MenuItem>
                            <MenuItem value='Obtained via call'>Obtained via call</MenuItem>
                            <MenuItem value='Obtained via email'>Obtained via email</MenuItem>
                        </TextField>
                        {formData.consent === 'Obtained via email' ?
                        <Box sx={{ borderRadius:1 , position:'relative'}} >
                            <TextField
                                
                                name="uploadFile"
                                
                                onChange={handleChange}
                                type="file"
                                // size='small'
                                sx={{fontSize:'12px' , width:"100%" ,mb:2  ,'& .MuiOutlinedInput-input':{padding:' 12px 14px' , opacity: 0} }}
                                
                            />
                                <Box sx={{display:'flex' , justifyContent:'space-between' , alignItems:'center' , width:'100%', position:'absolute' , pointerEvents:'none' , px:2 , top:'3px'}}>
                                    <Typography variant='subtitle2' sx={{fontWeight:400 }}>Consent Obtained Proof</Typography>
                                    <IconButton sx={{ pointerEvents:'none' , color:'#00447b'}} disableRipple>
                                        <AttachFileIcon />
                                    </IconButton>
                                </Box>
                        </Box>: <></>}
                        {formData.consent === 'Obtained via call' ?
                        <Box sx={{ borderRadius:1 , position:'relative'}} >
                            <TextField
                                
                                name="uploadFile"
                                
                                onChange={handleChange}
                                type="file"
                                // size='small'
                                sx={{fontSize:'12px' , width:"100%" ,mb:2  ,'& .MuiOutlinedInput-input':{padding:' 12px 14px' , opacity: 0} }}
                                
                            />
                                <Box sx={{display:'flex' , justifyContent:'space-between' , alignItems:'center' , width:'100%', position:'absolute' , pointerEvents:'none' , px:2 , top:'3px'}}>
                                    <Typography variant='subtitle2' sx={{fontWeight:400 }}>Consent Obtained Proof</Typography>
                                    <IconButton sx={{ pointerEvents:'none' , color:'#00447b'}} disableRipple>
                                        <AttachFileIcon />
                                    </IconButton>
                                </Box>
                        </Box>: <></>}
                    </Box>
                </Box>
                
                <Box sx={{display:'flex' , justifyContent:'end' , mt:2}}>
                    <Button variant='contained' type='submit' size='small' sx={{borderRadius:6 , textTransform:'inherit' , backgroundColor:'#00447b', '&:hover': { backgroundColor: '#00447b' }}}>Save & Next</Button>
                </Box>
                {error && <Typography color="error">An error occurred: {error.message}</Typography>}
                {isSuccess && <Typography color="success">Form submitted successfully!</Typography>}
            </form>
        </Box>
    </Layout>

  )
}

export default Registration