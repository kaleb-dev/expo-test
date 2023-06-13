import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView, Button, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../components/button";
import { Picker, DatePicker } from "react-native-wheel-pick";

const UserInfoStorage = {
  storeUserInfo: async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.log("Error storing user info:", error);
    }
  },

  getUserInfo: async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.log("Error retrieving user info:", error);
      return null;
    }
  },

  clearUserInfo: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log("Error clearing user info:", error);
    }
  },
};

export const PersonalInformation = ({ navigation }) => {
  const handleNext = () => {
    navigation.navigate("Name");
  };

  return (
    <SafeAreaView>
      <Text>General Info</Text>
      {/* Add your fitness goals content and functionality here */}
      <Button title="Next" onPress={handleNext} />
    </SafeAreaView>
  );
};

export const Name = ({ navigation }) => {
  const [name, setName] = useState("");

  const handleNext = async () => {
    try {
      await UserInfoStorage.storeUserInfo("name", name);
      navigation.navigate("Age");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      {/* Add your onboarding content and functionality here */}
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
        placeholderTextColor="#aaa"
        className="border border-gray-300 rounded-lg p-2 mb-4 w-3/6"
      />
      {/* Add other input fields and UI components as needed */}
      <Button title="Next" onPress={handleNext} />
    </SafeAreaView>
  );
};

export const Age = ({ navigation }) => {
  const [dateOfBirth, setDateOfBirth] = useState(new Date());

  const onDateChange = (date) => {
    setDateOfBirth(date);
  };

  const handleNext = async () => {
    try {
      await UserInfoStorage.storeUserInfo("dateOfBirth", dateOfBirth);
      navigation.navigate("Gender");
    } catch (error) {
      console.log(error);
    }
  };
  const today = new Date();

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <DatePicker
        selectedDate={dateOfBirth}
        onDateChange={onDateChange}
        maximumDate={new Date(today)}
      />
      <Button title="Next" onPress={handleNext} />
    </SafeAreaView>
  );
};

export const Gender = ({ navigation }) => {
  const [age, setAge] = useState(null);

  useEffect(() => {
    getAge();
  }, []);

  const handleNext = async (gender) => {
    try {
      await UserInfoStorage.storeUserInfo("gender", gender);
      navigation.navigate("HeightAndWeight");
    } catch (error) {
      console.log(error);
    }
  };

  const getAge = async () => {
    try {
      const dateOfBirth = await UserInfoStorage.getUserInfo("dateOfBirth");
      if (dateOfBirth) {
        const today = new Date();
        const [year, month, day] = dateOfBirth
          .split("T")[0]
          .split("-")
          .map(Number);
        const birthDate = new Date(year, month - 1, day);

        let age = today.getFullYear() - birthDate.getFullYear();

        // Check if the birthdate's month and day are greater than the current month and day
        if (
          birthDate.getMonth() > today.getMonth() ||
          (birthDate.getMonth() === today.getMonth() &&
            birthDate.getDate() > today.getDate())
        ) {
          age--;
        }

        setAge(age);
      }
    } catch (error) {
      console.log("Error retrieving user age:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Text>Age: {age}</Text>
      <Text>Onboarding Screen</Text>
      {/* Add your onboarding content and functionality here */}
      <CustomButton
        name="Male"
        click={() => handleNext("Male")}
        styles="bg-blue-500"
      />
      <CustomButton
        name="Female"
        click={() => handleNext("Female")}
        styles="bg-white border-2 border-blue-500 bg-transparent"
      />
    </SafeAreaView>
  );
};


export const HeightAndWeight = ({ navigation }) => {
  const [metric, setMetric] = useState('Imperial');
  const [height, setHeight] = useState({ value: '', decimals: '' });
  const [weight, setWeight] = useState({ value: '', decimals: '' });


  const handleNext = async () => {
    try {
      // Convert the height and weight values to numbers
      const heightValue = parseFloat(height.value);
      const weightValue = parseFloat(weight.value);
      const heightWithDecimals = heightValue + parseFloat(height.decimals);
      const weightWithDecimals = weightValue + parseFloat(weight.decimals);
      
      // Store height and weight values in AsyncStorage
      await UserInfoStorage.storeUserInfo('height', heightWithDecimals);
      await UserInfoStorage.storeUserInfo('weight', weightWithDecimals);
      await UserInfoStorage.storeUserInfo('metric', metric);
      
      
      // Navigate to the next screen
      navigation.navigate('FitnessGoalsScreen');
    } catch (error) {
      console.log(error);
    }
  }

  const handleMetricChange = (selectedMetric) => {
    setMetric(selectedMetric);
  };

  const imperialWeight = [];
  for (let i = 50; i <= 400; i++) {
    imperialWeight.push(i.toString());
  }

  const metricWeight = [];
  for (let i = 25; i <= 180; i++) {
    metricWeight.push(i.toString());
  }

  const imperialHeight = [];
  for (let i = 3; i <= 8; i++) {
    imperialHeight.push(`${i}ft`);
  }

  const metricHeight = [];
  for (let i = 1; i <= 3; i++) {
    metricHeight.push(`${i}m`);
  }

  const Decimals = ['.0', '.1', '.2', '.3', '.4', '.5', '.6', '.7', '.8', '.9'];

  return (
    <SafeAreaView className="flex-1 justify-between items-center">
      <View className="flex flex-row">
        <Button title="Imperial" onPress={() => handleMetricChange('Imperial')} className="mr-2" />
        <Button title="Metric" onPress={() => handleMetricChange('Metric')} />
      </View>
      <Text className="mt-4">Height ({metric === 'Imperial' ? 'feet/inches' : 'meters'})</Text>
      <View className="flex flex-row w-full">
        <Picker
          className="bg-transparent w-1/2 h-215"
          selectedValue={height.value}
          pickerData={metric === 'Imperial' ? imperialHeight : metricHeight}
          onValueChange={(value) => setHeight({ ...height, value })}
          itemSpace={30} // this only supports in android
        />
        <Picker
          className="bg-transparent w-1/2 h-215"
          selectedValue={height.decimals}
          pickerData={Decimals}
          onValueChange={(value) => setHeight({ ...height, decimals: value })}
          itemSpace={30} // this only supports in android
        />
      </View>

      <Text className="mt-4">Weight ({metric === 'Imperial' ? 'pounds' : 'kilograms'})</Text>
      <View className="flex flex-row w-full">
        <Picker
          className="bg-transparent w-1/2 h-215"
          selectedValue={weight.value}
          pickerData={metric === 'Imperial' ? imperialWeight : metricWeight}
          onValueChange={(value) => setWeight({ ...weight, value })}
          itemSpace={30} // this only supports in android
        />
        <Picker
          className="bg-transparent w-1/2 h-215"
          selectedValue={weight.decimals}
          pickerData={Decimals}
          onValueChange={(value) => setWeight({ ...weight, decimals: value })}
          itemSpace={30} // this only supports in android
        />
      </View>

      <Button title="Next" onPress={handleNext} className="mt-4" />
    </SafeAreaView>
  );
};




export const FitnessGoalsScreen = ({ navigation }) => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [metric, setMetric] = useState(''); // Default to Imperial

  const getUserHeight = async () => {
    try {
      const value = await AsyncStorage.getItem('height');
      if (value !== null) {
        // Split the stored value into the main number and decimal part
        const heightValue = parseFloat(value);

        // Set the height state with the main number and decimal part
        setHeight(heightValue.toString());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserWeight = async () => {
    try {
      const value = await AsyncStorage.getItem('weight');
      if (value !== null) {
        // Split the stored value into the main number and decimal part
        const weightValue = parseFloat(value);

        // Set the weight state with the main number and decimal part
        setWeight(weightValue.toString());
      }
    } catch (error) {
      console.log(error);
    }
  };


  const getMetricFromStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('metric');
      if (value !== null) {
        setMetric(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserHeight();
    getUserWeight();
    getMetricFromStorage();
  }, []);

  const handleNext = () => {
    navigation.navigate("MotivationScreen");
  };

  return (
    <SafeAreaView>
      <Text className="text-black">{metric}</Text>
      <Text className="mt-4">
        Height: {height} {metric === "Imperial" ? "ft" : "m"}
      </Text>
  
      {/* ... */}
  
      <Text className="mt-4">
        Weight: {weight} {metric === "Imperial" ? "lbs" : "kg"}
      </Text>
  
      <Text>Fitness Goals Screen</Text>
      {/* Add your fitness goals content and functionality here */}
      <Button title="Next" onPress={handleNext} />
    </SafeAreaView>
  );
}


export const MotivationScreen = ({ navigation }) => {
  const handleLogin = () => {
    navigation.navigate("Home");
  };


  const checkOnboardingStatus = async () => {
    try {
      const value = await UserInfoStorage.getUserInfo("onboardingCompleted");
      if (value === null) {
        // Onboarding not completed, navigate to OnboardingScreen
        navigation.navigate("Login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
      <Text>Motivation and Accountability Screen</Text>
      {/* Add your motivation and accountability content and functionality here */}
      <Button title="Login" onPress={handleLogin} />
    </SafeAreaView>
  );
};
