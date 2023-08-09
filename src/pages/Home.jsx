import axios from 'axios';
import { useEffect , useState} from 'react';
import moment from 'moment';
import domtoimage from 'dom-to-image';




const Home = () => {
    const [token, setToken] = useState('');

    const [profile, setProfile] = useState({});

    const date = moment().format("ddd DD MMM");
    const time = moment().format("HH:mm");

    const [topArtists, setTopArtists] = useState({});
    const [topTracks, setTopTracks] = useState({});

    const [clickTopArtists, setClickTopArtists] = useState(false);
    const [lastMonthArtists, setLastMonthArtists] = useState(false);
    const [allTimeArtists, setAllTimeArtists] = useState(false);

    const [clickTopTracks, setClickTopTracks] = useState(false);
    const [lastMonthTracks, setLastMonthTracks] = useState(false);
    const [allTimeTracks, setAllTimeTracks] = useState(false);

    const PROFILE_ENDPOINT = "https://api.spotify.com/v1/me";

    const TOP_ARTISTS_ENDPOINT = "https://api.spotify.com/v1/me/top/artists?time_range=short_term&offset=0&limit=10";
    const ALL_TIME_ARTISTS_ENDPOINT = "https://api.spotify.com/v1/me/top/artists?time_range=long_term&offset=0&limit=10";

    const TOP_TRACKS_ENDPOINT = "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&offset=0&limit=10";
    const ALL_TIME_TRACKS_ENDPOINT = "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&offset=0&limit=10";


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

    const handleMonthResultT = () => {
        setLastMonthTracks((prevState) => {
            if(prevState === true){
                return prevState
            }else {
                setLastMonthTracks(true)               
            }
        })
        setAllTimeTracks((prevState) => {
            if(prevState === false){
                return prevState
            }else {
                setAllTimeTracks(false)               
            }
        })
        if(lastMonthTracks === true && allTimeTracks === false){
            radioToggle();
            //end point === TOP TRACKS ENDPOINT
        }
    }

    const handleAllTimeResultT = () => {
        setAllTimeTracks((prevState) => {
            if(prevState === true){
                return prevState
            }else {
                setAllTimeTracks(true)              
            }
        })
        setLastMonthTracks((prevState) => {
            if(prevState === false){
                return prevState
            }else {
                setLastMonthTracks(false)              
            }
        })
        if(allTimeTracks === true && lastMonthTracks === false){
            radioToggle();
        }
    }

    const handleMonthResultA = () => {
        setLastMonthArtists((prevState) => {
            if(prevState === true){
                return prevState
            }else {
                setLastMonthArtists(true)               
            }
        })
        setAllTimeArtists((prevState) => {
            if(prevState === false){
                return prevState
            }else {
                setAllTimeArtists(false)               
            }
        })
        if(lastMonthArtists === true && allTimeArtists === false){
            radioToggle();
        }
    }

    const handleAllTimeResultA = () => {
        setAllTimeArtists((prevState) => {
            if(prevState === true){
                return prevState
            }else {
                setAllTimeArtists(true)              
            }
        })
        setLastMonthArtists((prevState) => {
            if(prevState === false){
                return prevState
            }else {
                setLastMonthArtists(false)              
            }
        })
        if(allTimeArtists === true && lastMonthArtists === false){
            radioToggle();
        }
    }

    const radioToggle = () => {
        if(lastMonthTracks === true && allTimeTracks === false){
            getData(TOP_TRACKS_ENDPOINT, setTopTracks);
        }else if (allTimeTracks === true && lastMonthTracks === false){
            getData(ALL_TIME_TRACKS_ENDPOINT, setTopTracks); 
        }
        if(lastMonthArtists === true && allTimeArtists === false){
            getData(TOP_ARTISTS_ENDPOINT, setTopArtists);
        }else{
            getData(ALL_TIME_ARTISTS_ENDPOINT, setTopArtists); 
        }
    }

    const changeColorA = () => {
       const buttonA = document.getElementById('topA');
       const buttonT = document.getElementById('topT');

        buttonA.style.background = "#1DB954"
        buttonA.style.color = "black"
        buttonT.style.background = "black"
        buttonT.style.color = "white"
    }

    const changeColorT = () => {
        const buttonA = document.getElementById('topA');
        const buttonT = document.getElementById('topT');
 
         buttonA.style.background = "black"
         buttonA.style.color = "white"
         buttonT.style.background = "#1DB954"
         buttonT.style.color = "black"
    }

    const handleClickA = () => {
        getTopArtists();
        changeColorA();
    }

    const handleClickT = () => {
        getTopTracks();
        changeColorT();
    }

    const getTopArtists = () => {
        setClickTopArtists(true);
        setClickTopTracks(false);
        getData(TOP_ARTISTS_ENDPOINT, setTopArtists);
    }

    const getTopTracks = () => {
        setClickTopArtists(false);
        setClickTopTracks(true);
        setLastMonthTracks(true);
        setAllTimeTracks(false);
        getData(TOP_TRACKS_ENDPOINT, setTopTracks); 
    }
    
    const downloadImg = () => {
        const container = document.getElementById('screenshot');
        
        const backgroundColor = '#ffffff';
        const quality = 1.0;
        
        domtoimage.toJpeg(container, { quality, backgroundColor }) 
          .then(dataUrl => {
            const link = document.createElement('a');
            link.download = 'gallery.jpg';
            link.href = dataUrl;
            link.click();
          })
          .catch(error => {
            console.error('Error capturing screenshot:', error);
          });
      };     

    useEffect(() => {
        setToken(localStorage.getItem('token'));
    }, [token]);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            alert("Please log in again.");
            window.location.href = "https://spotify-gallery-git-main-dororeo.vercel.app/";
        } else {
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        if(window.location.hash){
            const hash = window.location.hash;
            const token = getParamsfromHash(hash);
            localStorage.setItem('token', token.access_token);
            setToken(token.access_token);
            window.history.pushState({}, null, '/home');
        }
        getData(PROFILE_ENDPOINT, setProfile);
    },[])

    const logOut = () => {
        localStorage.removeItem('token');
        window.location.href="https://spotify-gallery-git-main-dororeo.vercel.app/"
    }


    return ( 
        <div className='whole-page'>
            <h2>Spotify Gallery</h2>
                <h4>Discover Your Top Tracks & Artists</h4>
                <button className='button' id='topA' onClick={handleClickA}>TOP ARTISTS</button>
                <button className='button' id='topT' onClick={handleClickT}>TOP TRACKS</button>
            <div id='screenshot'>
            {token &&
            <div>
                <div className='customized-container'>
                <div className='text'>Hi <span id='username'>{profile.display_name}</span>!</div>
                <div className='text'>{date + " " + time}</div>
                </div>
                {topTracks.items && clickTopTracks &&
                <div>
                <div className='choice-container'>
                <h4>Top Tracks</h4>

                <input className='radio' type='radio' id='last-month' name='result-type' value="Last Month" onClick={handleMonthResultT} style={{ backgroundColor: '#1DB954' }}/>
                <label className='radio'>Last Month</label>

                <input className='radio' type='radio' id='all-time' name='result-type' value="All Time" onClick={handleAllTimeResultT} style={{ backgroundColor: '#1DB954' }}/>
                <label className='radio'>All Time</label>

                </div>
                <div className='grid-container'>
                {topTracks.items.map((track, index) => {
                    if(index === 0){
                        return (
                            <div key={index}>
                                <img src={track.album.images[0].url} width={"350px"}/>
                                <div className='grid-title'>{track.name}</div>
                            </div>
                        )
                    }else if(index >= 1){
                        return (
                            <div key={index} className='item-container'>
                                <img className='grid-img' src={track.album.images[0].url} width={"100px"}/>
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
                <h4>Top Artists</h4>

                <input className='radio' type='radio' id='last-month' name='result-type' value="Last Month" onClick={handleMonthResultA} style={{ backgroundColor: '#1DB954' }}/>
                <label className='radio'><span>Last Month</span></label>

                <input className='radio' type='radio' id='all-time' name='result-type' value="All Time" onClick={handleAllTimeResultA} style={{ backgroundColor: '#1DB954' }}/>
                <label className='radio'><span>All Time</span></label>

                </div>
                <div className='grid-container'>
                {topArtists.items.map((artist, index) => {
                     if(index === 0){
                        return (
                            <div key={index}>
                                <img src={artist.images[0].url} width={"350px"}/>
                                <div className='grid-title'>{artist.name}</div>
                            </div>
                        )
                    }else if(index >= 1){
                    return (
                        <div key={index} className='item-container'>
                            <img className='grid-img' src={artist.images[0].url} width={"100px"}/>
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
        {(topTracks.items || topArtists.items) &&
            <button className='button' onClick={downloadImg}>Save Image</button>
        }
        <div className='button' onClick={logOut}>Log Out</div>
        </div>
     );
}
 
export default Home;