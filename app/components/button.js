
import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

export default function Button(props) {

  return (
    <Pressable style={styles.button} onPress={()=>props.click()}>
      <Text style={styles.text}>{props.name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});



// import React from 'react';
// import { Text, View, StyleSheet, Pressable } from 'react-native';

// export default function Button(props) {
//   return (
//     <Pressable className="flex items-center justify-center py-3 px-8 rounded-md shadow-md bg-black" onPress={()=>props.click()}>
//       <Text className="text-white text-base font-bold tracking-wide">{props.name}</Text>
//     </Pressable>
//   );
// }