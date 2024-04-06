import {StyleSheet, Text, View, Button} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const SecHome = ({navigation}) => {
  return (
    <View className="flex gap-12 mt-12 flex-col mx-auto">
      <View className=" bg-pink-400 p-5 mx-auto">
        <Button title="Speaking"  onPress={()=>{
          navigation.navigate('Speaking')
        }}/>
      </View>
      <View className=" bg-pink-400 p-5 mx-auto">
        <Button title="Reading" />
      </View>
      <View className=" bg-pink-400 p-5 mx-auto">
        <Button title="Listening" />
      </View>
      <View className=" bg-pink-400 p-5 mx-auto">
        <Button title="Writing" />
      </View>
    </View>
  );
};

export default SecHome;

const styles = StyleSheet.create({});
