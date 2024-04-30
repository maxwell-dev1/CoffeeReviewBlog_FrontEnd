'use client'
import { useRouter } from 'next/navigation';
import { ImageList, Card, ImageListItem } from '@mui/material';
import articleImgs from './ArticleImages';
import Link from 'next/link';

export default function ImageListMUI() {
    
    const router = useRouter();
    const images = articleImgs;
    let userVisitURL = '/'


    //you can change this function to receive the index param of the article and then create the url to route to from that
    const goToArticle = (index) => {
        
        userVisitURL = '/articles/' + (index+1);

        router.push(userVisitURL);
    };

    return (
        // container for all the items in the image list
        <ImageList cols={4} gap={24} sx={{height:'90%'}} > 

            {images.map((image, index) => (
                // <Link href='/' style={{backgroundColor:"rgba(0,0,0,0)"}}>
                <Card key={index} sx={{ mt: 2, display: 'flex', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,1)',borderRadius:'10px', transition: 'background-color 0.3s' }} elevation={8} 
                    onMouseEnter={(e) => { e.currentTarget.style.boxShadow= '0px 0px 10px #dbc1ac', e.currentTarget.style.border= '1px solid #ece0d1'}}
                    onMouseLeave={(e) => {  e.currentTarget.style.boxShadow= 'none', e.currentTarget.style.border= 'none' }}
                    onClick={() => goToArticle(index)}
                    >     
                                 
                   
                   {/* set up an array of 8 images for the articles, set img src = array[index] */}


                   
                    <ImageListItem sx={{height:'100%'}} >
                        <img src={image} alt="juan-valdez" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />) 
                    </ImageListItem>

                </Card>
                // </Link> 
            ))}

        </ImageList>
    );
}
