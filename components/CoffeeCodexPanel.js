
import Typography from '@mui/material/Typography';


export default function CoffeeCodexPanel(){
    return (
            <div style={{width:'60%', boxShadow: '0px 0px 10px #dbc1ac', border: '1px solid #ece0d1', borderRadius: '10px', background:'linear-gradient(rgb(163, 138, 105,.75),rgba(56, 41, 29, 0.928))', height:'22vh', margin:'auto', display:'flex', justifyContent:'center', alignItems: 'center',marginTop:'2px'}}>
                        <div style={{backgroundColor:'rgba(56,34,15,.8)', height:'82%', width:'85%', borderRadius:'10px', boxShadow: 'inset 0px 0px 10px rgba(0,0,0,.8)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>
                            {/* <div> */}
                                <Typography style={{fontSize:'22px', textShadow:'0px 0px 10px #dbc1ac',color:"rgba(219,193,172,1)",wordSpacing:'1em'}}>
                                The Coffee Codex 
                                {/* (thou shalt tips) */}
                            </Typography>   
                            <div style={{backgroundColor:'rgba(219,193,172,.4)',height:'2px',width:'95%',boxShadow: '0px 0px 10px rgba(0,0,0,.4)',borderRadius:'10px'}}></div>
                            <Typography style={{width:'90%',marginBottom:'8px',textShadow:'0px 0px 10px #dbc1ac',color:"rgba(219,193,172,.95)",marginTop:'8px'}}>
                                "The first espresso machine was patented in 1884 by Angelo Moriondo of Turin, Italy. However, it wasn't until 1901 that Luigi Bezzera improved upon Moriondo's design and created the first commercial espresso machine.",
                            </Typography>
                            {/* </div> */}
                        </div>            
                    </div>
            )
}