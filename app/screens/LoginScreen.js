// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import CustomButton from '../components/button';

// const LoginScreen = ({ onLogin }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
  

//   const handleLogin = () => {
//     onLogin();
//   };

//   return (
// <View className="px-20 flex-1 justify-center items-center">
//       <Text className='text-2xl font-bold mb-5'>LOGO</Text>
//       <TextInput
//         placeholder="Username"
//         value={username}
//         onChangeText={setUsername}
//         className="w-full h-10 border border-gray-300 rounded-md mb-4 px-2"
//       />
//       <TextInput
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//         className="w-full h-10 border border-gray-300 rounded-md mb-4 px-2"
//       />
//     {/* <CustomButton name="Login" click={handleLogin}/> */}
//     </View>
//   );
// };


// export default LoginScreen;

import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    onLogin();
  };

  return (
    <View style={{ paddingHorizontal: 20, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 5 }}>LOGO</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{ width: '100%', height: 40, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 4, paddingHorizontal: 2 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        // style={{ width: '100%', height: 40, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 4, paddingHorizontal: 2 }}
        className="text-red-800"
      />
     <CustomButton name="Login" click={handleLogin}/>
    </View>
  );
};

export default LoginScreen;

