import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Speaking = ({navigation}) => {
  return (
    <View className="flex gap-10">
      <Text className="text-lg font-semibold">
        Welcome to Speaking Section , here we have many options.
      </Text>
      <Text className="font-semibold">GO with the desired option for your purpose </Text>
      <View className="flex gap-5 mx-auto">
        <View>
          <Button title="Read Aloud" onPress={()=>{
            navigation.navigate('ReadAloud')
          }}/>
        </View>
        <View>
          <Button title="Repeat Sentence" />
        </View>
        <View>
          <Button title="Describe Image" />
        </View>
        <View>
          <Button title="Re Tell Lecture" />
        </View>
        <View>
          <Button title="Summarize Written Text" />
        </View>
      </View>
    </View>
  );
};

export default Speaking;

const styles = StyleSheet.create({});
