import Typography from '@mui/material/Typography';
import {Button} from '@mui/material'
import CoffeeCodexPanel from '../../../components/CoffeeCodexPanel';

export default function Learn() {
    return (
        <div>   
            
            <CoffeeCodexPanel/>

            <div style={{justifyContent:'center',display:'flex',marginTop:'20px'}}>
            <div style={{width:'40%',justifyContent:'center',display:'flex'}}>
                <Button style={{border: "1px solid rgba(219, 193, 172, 0.5)", backgroundColor: '#5F3D2E',  color: '#FFFFFF', '&:hover': {backgroundColor: '#dbc1ac', color:"black"},marginRight:'20px',}}>Prev</Button>
                <Button style={{border: "1px solid rgba(219, 193, 172, 0.5)", backgroundColor: '#5F3D2E',  color: '#FFFFFF', '&:hover': {backgroundColor: '#dbc1ac', color:"black"},marginLeft:'40px',marginRight:'40px'}}>Shuffle</Button>
                 <Button style={{ border: "1px solid rgba(219, 193, 172, 0.5)", backgroundColor: '#5F3D2E',  color: '#FFFFFF', '&:hover': {backgroundColor: '#dbc1ac', color:"black"},marginLeft:'20px',marginRight:'20px'}}>Next</Button>
            </div>
            </div>
            

            {/* drop down here or input number or slider maybe */}
        </div>
    );
}
{/* <Typography sx={{ color: 'rgb(236,224,209)', fontSize: '1.5rem', textDecoration: 'underline',marginBottom:2 }}>

<Typography sx={{ color: 'rgb(236,224,209)', fontSize: '.8rem',marginBottom:4,}}> */}
