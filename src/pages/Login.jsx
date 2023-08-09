import {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL_AFTER_LOGIN,
  SCOPES_URL_PARAM,
  SPOTIFY_AUTHORIZE_ENDPOINT,
} from "../auth";

const Login = () => {
  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
  };

  return (
    <div>
      <h2>Spotify Gallery</h2>
      <h4>Discover Your Top Tracks & Artists</h4>
      <br />
      <button className="button" onClick={() => handleLogin()}>
        LOG IN WITH SPOTIFY
      </button>
    </div>
  );
};

export default Login;
