import Typography from '@mui/material/Typography';
import CoffeeCodexPanel from '../../../components/CoffeeCodexPanel';
import ImageListMUI from '../../../components/ImageListMUI';

export default function Learn() {
    return (
        <div>   
            
            <CoffeeCodexPanel/>
            
            <div style={{ width: '90%', boxShadow: '0px 0px 10px #dbc1ac', border: '1px solid #ece0d1', borderRadius: '10px', background: 'linear-gradient(rgb(163, 138, 105,.75),rgba(56, 41, 29, 0.928))', height: '130vh', margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }}>
                <div id='darkBrownInner' style={{ backgroundColor: "rgba(0,0,0,.55)", height: '90%', width: '99%', borderRadius: '10px', boxShadow: 'inset 0px 0px 10px rgba(0,0,0,.8)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backdropFilter: "blur(10px)" }}>
                    
                    {/* container for learn articles title and underline div */}
                    <div style={{ width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                        <Typography sx={{ fontSize: '38px', textShadow: '0px 0px 10px #dbc1ac', color: "rgba(219,193,172,1)", wordSpacing: '.74em', margin: 'auto' }}>Learn Coffee Articles</Typography>
                        {/* This next div is just the underline */}
                        <div style={{ backgroundColor: 'rgba(219,193,172,.4)', height: '2px', width: '95%', boxShadow: '0px 0px 10px rgba(0,0,0,.4)', borderRadius: '10px' }}></div>
                    </div>

                    <div style={{ width: '90%', flex: 1, overflow: 'hidden' }}>
                        <ImageListMUI></ImageListMUI>
                    </div>

                    
                </div>
            </div>

        </div>
    );
}
