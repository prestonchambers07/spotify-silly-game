import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import APIController from './API.js';
import Picker from './dropdown.js';
import { useState, useEffect } from 'react';
import * as AuthSession from 'expo-auth-session';
const playlistTracks = async (playlistID) => {
  const pTracks = await api.fetchPlaylistTracks(playlistID);
   console.log("Playlist tracks!");
   console.log(pTracks);
   return pTracks;
}
  

const userPlaylists = async() => {
  const userp = await api.fetchUserPlaylists();
   console.log("user playlists!: ");
   console.log(userp);  
 
}
const api = APIController;


export default function App() {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);


  useEffect(() => {
  const load = async () => {
    const result = await api.fetchUserPlaylists();
    setPlaylists([...result]);
    console.log(playlists);
  };
  load();


}, []);
  console.log("Selected playlist:", selectedPlaylist);


  const handleGetTracks = async () => {
    if (!selectedPlaylist) {
      console.log("No playlist selected!");
      return;
    }
    const result = await api.fetchPlaylistTracks(selectedPlaylist);
    console.log("Tracks:", result);
    setTracks(result);
  };




  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spotify Guessing Game!</Text>
      <Button title="Get Tracks" onPress={handleGetTracks}>  </Button>
      <Button title="get URI" onPress={()=>console.log("URI", + AuthSession.makeRedirectUri())}> </Button>
      <Picker playlist={playlists} onSelect={setSelectedPlaylist}> </Picker>
      <StatusBar style="auto" />
    </View> 
  );


}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1DB954',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#333",
  }
});


