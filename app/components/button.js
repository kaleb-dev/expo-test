import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

export default function Button(props) {
  return (
    <Pressable className={`w-9/12 mt-2 flex items-center justify-center py-3 px-8 rounded-md shadow-md ${props.styles}`} onPress={()=>props.click()}>
      <Text className={`text-base font-normal tracking-wide ${props.textStyles}`}>{props.name}</Text>
    </Pressable>
  );
}