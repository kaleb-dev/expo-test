import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

export default function Button(props) {
  return (
    <Pressable className="flex items-center justify-center py-3 px-8 rounded-md shadow-md bg-black" onPress={()=>props.click()}>
      <Text className="text-white text-base font-bold tracking-wide">{props.name}</Text>
    </Pressable>
  );
}