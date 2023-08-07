import axios, { all } from 'axios';
import { useEffect , useState} from 'react';



const Home = () => {
    const [token, setToken] = useState('');
    const [topArtists, setTopArtists] = useState({});
    const [topTracks, setTopTracks] = useState({});
    const [clickTopArtists, setClickTopArtists] = useState(false);
    const [clickTopTracks, setClickTopTracks] = useState(false);
    const [lastMonthTracks, setLastMonthTracks] = useState(true);
    const [allTimeTracks, setAllTimeTracks] = useState(false);

    const TOP_ARTISTS_ENDPOINT = "https://api.spotify.com/v1/me/top/artists?time_range=short_term&offset=0&limit=10"
    const TOP_TRACKS_ENDPOINT = "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&offset=0&limit=10"

    const ALL_TIME_ARTISTS_ENDPOINT = "https://api.spotify.com/v1/me/top/artists?time_range=long_term&offset=0&limit=10"
    const ALL_TIME_TRACKS_ENDPOINT = "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&offset=0&limit=10"

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


    const getLastMonthsTracks = () => {
        setAllTimeTracks(false);
        setLastMonthTracks(true);
        console.log("last month")
        if(lastMonthTracks === true){
            radioToggle();
        }
    }

    const getAllTimeTracks = () => {
        setLastMonthTracks(false);
        setAllTimeTracks(true);
        console.log("all time")
        if(allTimeTracks === true){
            radioToggle();
        }
    }

    const getTopArtists = () => {
        setClickTopArtists(true);
        setClickTopTracks(false);
        getData(TOP_ARTISTS_ENDPOINT, setTopArtists);
    }

    const radioToggle = () => {
        if(!lastMonthTracks){
            getData(ALL_TIME_TRACKS_ENDPOINT, setTopTracks);
            console.log(topTracks)
        }else{
            getData(TOP_TRACKS_ENDPOINT, setTopTracks); 
            console.log(topTracks)
        }
    }

    const getTopTracks = () => {
        setClickTopArtists(false);
        setClickTopTracks(true);
        setLastMonthTracks(true);
        setAllTimeTracks(false);
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
            <h2>Spotify Gallery</h2>
                <h4>Discover Your Top Tracks & Artists</h4>
                <button className='button' onClick={getTopArtists}>TOP ARTISTS</button>
                <button className='button' onClick={getTopTracks}>TOP TRACKS</button>
            {token &&
            <div>
                <div className='customized-container'>
                <div className='text'>Hi User Name!</div>
                <div className='text'>Current Date and Time</div>
                </div>
                {topTracks.items && clickTopTracks &&
                <div>
                <div className='choice-container'>
                <h5 id='choice-text'>Top Tracks</h5>

                <input className='radio' type='radio' id='last-month' name='result-type' value="Last Month" onClick={getLastMonthsTracks}/>
                <label className='radio'>LAST MONTH</label>

                <input className='radio' type='radio' id='all-time' name='result-type' value="All Time" onClick={getAllTimeTracks}/>
                <label className='radio'>ALL TIME</label>

                {/* <input type='checkbox' id='btnControl' />
                <label className='toggle-button' for="btnControl" onClick={getLastMonthsTracks}>Last Month</label>

                <input type='checkbox' id='btnControl' />
                <label className='toggle-button' for="btnControl" onClick={getAllTimeTracks}>All Time</label> */}

                {/* <button className='toggle-button' id='month' onClick={getLastMonthsTracks}>Last Month</button>
                <button className='toggle-button' onClick={getAllTimeTracks}>All Time</button> */}
                </div>
                <div className='grid-container'>
                {topTracks.items.map((track, index) => {
                    if(index === 0){
                        return (
                            <div key={index}>
                                <img src={track.album.images[0].url} width={"300px"}/>
                                <div className='grid-title'>{track.name}</div>
                            </div>
                        )
                    }else if(index >= 1){
                        return (
                            <div key={index} className='item-container'>
                                <img className='grid-img' src={track.album.images[1].url} width={"95px"}/>
                                <div className='grid-title'>{track.name}</div>
                            </div>
                        )
                    }
                })}
                </div>
                </div>
                }
                {topArtists.items && clickTopArtists &&
                <div>
                <div className='choice-container'>
                <h5>Top Artist</h5>
                </div>
                <div className='grid-container'>
                {topArtists.items.map((artist, index) => {
                     if(index === 0){
                        return (
                            <div key={index}>
                                <img src={artist.images[0].url} width={"300px"}/>
                                <div className='grid-title'>{artist.name}</div>
                            </div>
                        )
                    }else if(index >= 1){
                    return (
                        <div key={index} className='item-container'>
                            <img className='grid-img' src={artist.images[1].url} width={"95px"}/>
                            <div className='grid-title'>{artist.name}</div>
                        </div>
                    )
                }
                })}
                </div>
                </div>
                }
            <div className='selection-text'>
                    {!clickTopArtists && !clickTopTracks &&
                    <h5>Select Top Artists / Tracks to view your stats for the month</h5>}
                </div>
            </div>
            }
        </div>
     );
}
 
export default Home;