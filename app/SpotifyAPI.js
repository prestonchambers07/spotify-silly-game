const SpotifyAPIController = (function() {




    const clientID = '1f03dcd0b682463cbbeef1c4455a7f136WhDr76MMPZigcAD8KUL0ogFpYtLVP9M';
    const clientSecret = '53c69359fd584043a637836eea3287a4';  
    const redirectURI = 'http://127.0.0.1:3000/callback';    

    //getting user info -> 

    const app = express(); 
    app.get('/login', function(req, res){
        const state = generateRandomString(16); 
        const scope = 'user-read-private user-read-email';
         res.redirect('https://accounts.spotify.com/authorize?' +
            querystring.stringify({
            response_type: 'code',
            client_id: clientID,
            scope: scope,
            redirect_uri: redirectURI,
            state: state
        }));
    });


    
    const getToken = async(code) => {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(clientID + ':' + clientSecret).toString('base64')
            },
            body: new URLSearchParams({
                code: code,
                redirect_uri: redirectURI,
                grant_type: 'authorization_code'
            })
        });

        const data = await response.json();
        _accessToken = data.access_token;
        return _accessToken; 
    }
    

    app.get('/callback', async(req, res) =>{
        const code = req.query.code || null; 
        const state = req.query.state || null;

        if(state === null){
            res.redirect('/#' + querystring.stringify({
                error: "mismatch"
            }));
        }else {
            const token = await getToken();
            res.redirect('/#' + querystring.stringify({ access_token: token }));

        }

    });

   




   
    return{}; 
   
   
   
   
   
});
export default SpotifyAPIController;