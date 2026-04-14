import {Text} from react
export default function TestRouter(){
    console.log("New HELLO!!!!"); 
    return(
    <Text> Hello! </Text>
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
