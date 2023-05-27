import React, { useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { Text, View } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider as PaperProvider, Appbar } from "react-native-paper";
import LoginScreen from "./app/screens/LoginScreen";
import HomeScreen from "./app/screens/HomeScreen";
import ProfileScreen from "./app/screens/ProfileScreen";
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import Animated, { Easing } from 'react-native-reanimated';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "red",
  },
};

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const renderHeader = ({ previous, navigation }) => {
    return (
      <Appbar.Header>
        <Appbar.Content />
        <Appbar.Action
          icon={loggedIn ? 'dots-horizontal' : 'dots-horizontal'}
          onPress={loggedIn ? handleLogout : handleLogin}
        />
      </Appbar.Header>
    );
  };

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        // fadeIn.start(() => {
          setAppIsReady(true);
          SplashScreen.hideAsync(); // Hide the splash screen
        // });
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return null; // Render null or a loading component while app is preparing
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        {!loggedIn ? (
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              header: renderHeader,
            }}
          >
            <Stack.Screen
              name="Login"
              options={{ headerShown: false }}
            >
              {(props) => <LoginScreen {...props} onLogin={handleLogin} />}
            </Stack.Screen>
          </Stack.Navigator>
        ) : (
          <Tab.Navigator
            screenOptions={{
              header: renderHeader,
            }}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
          </Tab.Navigator>
        )}
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
