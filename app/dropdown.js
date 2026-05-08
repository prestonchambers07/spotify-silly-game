  import { useState, useEffect } from 'react';
  import { View, StyleSheet } from 'react-native';
  import DropDownPicker from 'react-native-dropdown-picker';


  export default function Picker({playlist, onSelect}){
    //meow
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);
    useEffect(() => {
  console.log("playlist received:", playlist);
  console.log("is array:", Array.isArray(playlist));
  console.log("length:", playlist?.length);


  if (playlist && Array.isArray(playlist, onSelect)) {
    const mapped = playlist.map((p) => ({
      label: p.title,
      value: p.id,
    }));
    console.log("mapped items:", mapped);
    setItems(mapped);
  }
}, [playlist]);


      //const [items, setItems] = useState(arr);
      console.log("items at render:", items);
    return (
      <View style={styles.container}>
       <DropDownPicker
          open={open}
          value={value}        
          items={items}
          setOpen={setOpen}
          setValue={setValue}  
          setItems={setItems}
          onChangeValue={(val) => {
            console.log("Selected:", val);
            onSelect(val);
          }}
          placeholder="Select a playlist"
        />
      </View>
    );
  }
    const styles = StyleSheet.create({
      container: {
        padding: 20,
        zIndex: 1000,
      },
      dropdown: {
        borderColor: '#ccc',
        borderRadius: 10,
      },
      dropdownContainer: {
        borderColor: '#140303',
      },
    });


