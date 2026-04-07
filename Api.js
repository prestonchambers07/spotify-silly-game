const APIController = (function() {




    const clientID = '8TBFzNdd8fDb7PSVXtA7cigOe9VYgFf0';
    const USERID = '';
    const trackid = "253A762353959"
    const _fetchTracks = async () => {
        console.log('working');
        try{
        const response = await fetch(`https://api-v2.soundcloud.com/tracks/${trackid}?client_id=${clientID}`);
        const data = await response.json();
        console.log(data);
        return data;    
        } catch (error) {  
            console.error("bleghh error 4 tracks: ", error);
        }
};
    const pbs = "https://soundcloud.com/mystical7778/sets/my-songs-on-other-pages";
    const mine = "https://soundcloud.com/smhpreston/sets/yawn-im-sleepy";






    const getUserID = async () => {
        let username = "smhpreston";
        try{    
            const response = await fetch("https://api-v2.soundcloud.com/resolve?url=https://soundcloud.com/"+ username + "&client_id=" + clientID);
            const res = await response.json();
            const userID = res.id;
            console.log(res.id);
            return userID;
        }
        catch (error) {
            console.error("Error with getting userID", error);
        }
    }
   
    const _fetchPlaylistTracks = async (playlistID) => {
        let url = mine;
        url = encodeURIComponent(url);
        try{
            const response = await fetch("https://api-v2.soundcloud.com/playlists/"+ playlistID + "?client_id=" + clientID);


           // console.log('Response Status: ', response.status);
            const data = await response.json();
           // console.log(data.tracks);    
           const tracks = data.tracks.map(track => ({
                title: track.title,
                id: track.id,
                url: track.permalink_url,
                }));
                console.log("Tracks:", tracks);
                return tracks;
        }catch (error) {
            console.error("Error with da playlist", error);
        }
    };
const _fetchUserPlaylists = async () => {
  const uID = await getUserID();
 
  console.log("userID:", uID);
 
  try {
    const response = await fetch(
      `https://api-v2.soundcloud.com/users/${uID}/playlists?client_id=${clientID}`
    );
    console.log("Status:", response.status);
    const data = await response.json();
    //console.log("Full response:", JSON.stringify(data));
   
    const playlists = data.collection.map(playlist => ({
      title: playlist.title,        // "yawn?? im sleepy"
      id: playlist.id,              // 2186237219
      //arr of tracks
      tracks: playlist.tracks.map(track => ({
        title: track.title,         // "skinny jeans w the platform boots"
        id: track.id,               // 1449364231
        url: track.permalink_url,   // "https://soundcloud.com/..."
      }))
    }));
return playlists;
  } catch (error) {
    console.error("Error with da playlist", error);
    return [];
  }
};
   
    const _getDirect = async (trackUrl) => {
        const response = await fetch("https://api-v2.soundcloud.com/resolve?url=" + trackURL +"&client_id=${clientId}");
        const track = await response.json();
        const trackID = track.id;
        //get stream urls here ..


        if(track.media && track.media.transcodings){}


            const prog = track.media.transcodings.find(
                t => t.format.protocol === 'progressive'
            );




            if(prog){
                const streamRes = await fetch("${prog.url}?client_id=${clientId}");
                const streamData = await streamRes.json();
            }


    };


   




   
   
   
    return{
        fetchTracks(){
            return _fetchTracks();
        },
       fetchPlaylistTracks(playlistID){
            return _fetchPlaylistTracks(playlistID);
       },
       fetchTrack(){
        return _fetchTrack();
     },
     fetchUserPlaylists(){
        return _fetchUserPlaylists();
     }
       
}
   
   
   
   
   
});


export default APIController;