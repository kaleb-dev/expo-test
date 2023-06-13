import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "./firebase";
import { Provider as PaperProvider, Appbar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import {
  PersonalInformation,
  Name,
  Age,
  Gender,
  HeightAndWeight,
  FitnessGoalsScreen,
  MotivationScreen,
} from "./app/screens/UserInfo.js";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
    </View>
  );
}
function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const createAccount = async () => {
    try {
      if (password === confirmPassword) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        setError("Passwords don't match");
      }
    } catch (e) {
      setError("There was a problem creating your account");
    }
  };

  return (
    <View style={styles.outer}>
      <View style={styles.inner}>
        <Text style={styles.header}>Signup</Text>

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Login to existing account</Text>
        </TouchableOpacity>

        <TextInput
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="Enter email address"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Enter password"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          style={styles.input}
        />
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholder="Confirm password"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          style={styles.input}
        />

        <Button
          title="Create Account"
          onPress={createAccount}
          disabled={!email || !password || !confirmPassword}
        />
      </View>
    </View>
  );
}

function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const loginUser = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (
        error.code === "auth/invalid-email" ||
        error.code === "auth/wrong-password"
      ) {
        setError("Your email or password was incorrect");
      } else if (error.code === "auth/email-already-in-use") {
        setError("An account with this email already exists");
      } else {
        setError("There was a problem with your request");
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.outer}>
      <View style={styles.inner}>
        <Text style={styles.header}>Login</Text>

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.link}>Create an account</Text>
        </TouchableOpacity>

        <TextInput
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="Enter email address"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Enter password"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          style={styles.input}
        />

        <TouchableOpacity onPress={() => navigation.navigate("ResetPassword")}>
          <Text style={[styles.link, { color: "#333" }]}>
            I've forgotten my password
          </Text>
        </TouchableOpacity>

        <Button
          title="Login"
          onPress={loginUser}
          disabled={!email || !password}
        />
        <Button title="Google Sign In " onPress={signInWithGoogle} />
      </View>
    </View>
  );
}

function ResetPassword({ navigation }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const resetUserPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setSubmitted(true);
      setError(null);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("User not found");
      } else {
        setError("There was a problem with your request");
      }
    }
  };

  return (
    <View style={styles.outer}>
      <View style={styles.inner}>
        <Text style={styles.header}>Reset Password</Text>

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Back to login</Text>
        </TouchableOpacity>

        {submitted ? (
          <Text>Please check your email for a reset password link.</Text>
        ) : (
          <>
            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="Enter email address"
              autoCapitalize="none"
              placeholderTextColor="#aaa"
              style={styles.input}
            />

            <Button
              title="Reset Password"
              onPress={resetUserPassword}
              disabled={!email}
            />
          </>
        )}
      </View>
    </View>
  );
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "red",
  },
};

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const renderHeader = ({ navigation, route }) => {
    const { name } = route;
    const logout = async () => {
      try {
        await signOut(auth);
      } catch (e) {
        console.error(e);
      }
    };

    return (
      <Appbar.Header>
        <Appbar.Content title={name} />
        <Appbar.Action
          icon={loggedIn ? "dots-horizontal" : "dots-horizontal"}
          onPress={logout}
        />
      </Appbar.Header>
    );
  };

  const renderBackButton = (navigation) => (
    <Ionicons
      name="chevron-back"
      size={24}
      color="black"
      style={{ marginLeft: 10 }}
      onPress={() => navigation.goBack()}
    />
  );

  return (
    <NavigationContainer theme={theme} screenOptions={{ headerShown: false }}>
      <Stack.Navigator>
        {loggedIn ? (
          <>
            <Stack.Screen
              name="PersonalInformation"
              options={({ navigation }) => ({
                headerShown: true,
                headerLeft: () => renderBackButton(navigation),
              })}
              component={PersonalInformation}
            />
            <Stack.Screen
              name="Name"
              options={({ navigation }) => ({
                headerShown: true,
                headerLeft: () => renderBackButton(navigation),
              })}
              component={Name}
            />
            <Stack.Screen
              name="Age"
              options={({ navigation }) => ({
                headerShown: true,
                headerLeft: () => renderBackButton(navigation),
              })}
              component={Age}
            />
            <Stack.Screen
              name="Gender"
              options={({ navigation }) => ({
                headerShown: true,
                headerLeft: () => renderBackButton(navigation),
              })}
              component={Gender}
            />
            <Stack.Screen
              name="HeightAndWeight"
              options={({ navigation }) => ({
                headerShown: true,
                headerLeft: () => renderBackButton(navigation),
              })}
              component={HeightAndWeight}
            />
            <Stack.Screen
              name="FitnessGoalsScreen"
              options={({ navigation }) => ({
                headerShown: true,
                headerLeft: () => renderBackButton(navigation),
              })}
              component={FitnessGoalsScreen}
            />
            <Stack.Screen
              name="MotivationScreen"
              options={({ navigation }) => ({
                headerShown: true,
                headerLeft: () => renderBackButton(navigation),
              })}
              component={MotivationScreen}
            />

            <Stack.Screen
              name="Home"
              options={{ header: renderHeader }}
              component={TabNavigator}
            />
            <Stack.Screen
              name="Profile"
              options={{ header: renderHeader }}
              component={TabNavigator}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              options={{ headerShown: false }}
              component={Login}
            />
            <Stack.Screen
              name="Signup"
              options={{ headerShown: false }}
              component={Signup}
            />
            <Stack.Screen
              name="ResetPassword"
              options={{ headerShown: false }}
              component={ResetPassword}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    width: 240,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  error: {
    marginBottom: 20,
    color: "red",
  },
  link: {
    color: "blue",
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
