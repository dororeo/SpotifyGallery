import axios from 'axios';
import { useEffect , useState} from 'react';



const Home = () => {
    const [token, setToken] = useState('');
    const [topArtists, setTopArtists] = useState({});
    const [topTracks, setTopTracks] = useState({});
    const [clickTopArtists, setClickTopArtists] = useState(false);
    const [clickTopTracks, setClickTopTracks] = useState(false);

    const TOP_TRACKS_ENDPOINT = "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&offset=0&limit=12"
    const TOP_ARTISTS_ENDPOINT = "https://api.spotify.com/v1/me/top/artists?time_range=short_term&offset=0&limit=12"

    const getParamsfromHash = (hash) => {
        const hashContent = hash.substring(1);
        const paramsSplit = hashContent.split('&');
        let params = {};
        let values = [];
        paramsSplit.forEach((param) => {
            values  = param.split('=');
            params[values[0]] = values[1];
        })
        return params;
    }

    const getData = async (endpoint, setFunction) => {
        await axios.get(endpoint, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(response => {
            setFunction(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error)
        })
    }

    const getTopArtists = () => {
        // setClickTopArtists(true);
        getData(TOP_ARTISTS_ENDPOINT, setTopArtists);
    }

    const getTopTracks = () => {
        // setClickTopTracks(true);
        getData(TOP_TRACKS_ENDPOINT, setTopTracks);
    }

    useEffect(() => {
        setToken(localStorage.getItem('token'));
    }, [token]);

    useEffect(() => {
        if(window.location.hash){
            const hash = window.location.hash;
            const token = getParamsfromHash(hash);
            localStorage.setItem('token', token.access_token);
            setToken(token.access_token);
            window.history.pushState({}, null, '/home');
        }
        
    },[])
    return ( 
        <div>
            {token &&
            <div>
                <h2>Spotify Gallery</h2>
                <h4>Discover Your Top Tracks & Artists</h4>
                <button className='button' onClick={getTopArtists}>Top Artists</button>
                <button className='button' onClick={getTopTracks}>Top Tracks</button>
                {topTracks.items &&
                <div>
                <h4>Top Tracks</h4>
                <div>
                {topTracks.items.map((track, index) => {
                    return (
                        <div key={index}>
                            <img src={track.album.images[1].url} />
                            <h5>{track.name}</h5>
                        </div>
                    )
                })}
                </div>
                </div>
                }
                {topArtists.items &&
                <div>
                <h4>Top Artist</h4>
                <div>
                {topArtists.items.map((artist, index) => {
                    return (
                        <div key={index}>
                            <img src={artist.images[1].url} />
                            <h5>{artist.name}</h5>
                        </div>
                    )
                })}
                </div>
                </div>
                }
            </div>
            }
        </div>
     );
}
 
export default Home;