import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
// import Sound from 'react-native-sound'
import Sound from 'react-native-sound';



const ReadAloud = () => {
    const [sec,setSec]=useState(1);
    const [start,setStart]=useState(0);
    let seconds=0;
    
    const playSound=()=>{
        const sound = new Sound('http://example.com/sound.mp3', null, (error) => {
            if (error) {
              console.log('Failed to load the sound', error);
            }
          });
            
          sound.play((success) => {
            if (success) {
              console.log('Sound played successfully');
            } else {
              console.log('Sound playback failed');
            }
          });
          
          
    }
    const incTime=()=>{
        if(seconds!=5){
            setTimeout(() => {
                setSec(sec=>sec+1);
                seconds+=1;
                incTime();
            }, 1000);
        }else{
            playSound();
            seconds=0;
        }
    }
  return (
    <View>
    {start==0?

        <Button title='Start Test' onPress={()=>{
            setStart(1);
            setSec(0);
            incTime();
        }}/>
        :
        <Text>You will be speaking in {sec} seconds after the sound of Beep.</Text>
    }
      
    </View>
  )
}

export default ReadAloud

const styles = StyleSheet.create({})