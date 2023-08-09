import gavinMeme from '../gavinmeme.png';

const NotFound = () => {
    return (
        <div>
            <h1>404 Not Found</h1>
            <br />
            <img src={gavinMeme} alt="404 Meme" height="250px" style={{padding:"20px"}} />
            <br />
            <br />
            <a href='https://spotify-gallery-dororeo.vercel.app/' style={{color:"white", textDecoration:"none", padding:'15px', backgroundColor:"black", borderRadius:"25px", fontSize:"12px"}}>Reload?</a>
        </div>
    );
};

export default NotFound;