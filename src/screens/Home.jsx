
import React, { useState } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  Button,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack'


const Home = ({navigation}) => {
    const [data,setData]=useState({
        fname:"",
        email:"",
        mobile:""
    })

    const handleSubmit=()=>{
      console.log("here it is ");

      navigation.replace("SecHome");
      // try{
      //   axios.post("http://10.0.2.2:3000/signUp",data).then((res)=>{
      //     console.log(res);
      //   }).catch((err)=>{
      //     console.log(err);
      //   })
      // }catch(err){
      //   console.log("Error : ",err);
      // }
    }

  return ( 
    <View>
      <View className="mx-4 my-8">
        <Text className="text-xl ">Name</Text>
        <TextInput
          placeholder="John"
          className="border border-slate-300 h-10 rounded-lg px-2"
          onChangeText={(value)=>setData({...data,fname:value})}
        />
        <Text className="text-xl ">Email</Text>
        <TextInput
          placeholder="abcd@gmail.com"
          className="border border-slate-300 h-10 rounded-lg px-2"
          inputMode="email"
          onChangeText={(value)=>setData({...data,email:value})}
        />
        <Text className="text-xl ">Phone Number </Text>
        <TextInput
          placeholder="+91 XXXXXXXXXX"
          className="border border-slate-300 h-10 rounded-lg px-2"
          inputMode="numeric"
          onChangeText={(value)=>setData({...data,mobile:value})}
        />
      </View>
      <View className="mx-24 my-10">
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default Home