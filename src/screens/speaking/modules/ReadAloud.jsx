import {Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, {useEffect, useState} from 'react';
import Sound from 'react-native-sound';
import Voice from '@react-native-voice/voice';
import * as Progress from 'react-native-progress';
import stringSimilarity from "string-similarity"
import axios from "axios"

const ReadAloud = () => {
  let seconds = 0;
  const [data,setData]=useState({});
  const [sec, setSec] = useState(1);
  const [start, setStart] = useState(0);
  const [listen, setListen] = useState(false);
  const [bar, setBar] = useState(0);

  const [result, setResult] = useState('');
  const [err, setErr] = useState('');
  const [isRecording, setIsRecording] = useState('');

  const [finish, setFinish] = useState(0);
  const [score ,setScore]=useState(0);

  // useEffect(()=>{
  //     axios.get("http://10.0.2.2:3000/api/readaloud",{"title":"test"}).then((res)=>{
  //       console.log(res.data);
  //       setData(res.data)
  //     }).catch((err)=>{
  //       console.log(err);
  //     })
  // },[])

  Voice.onSpeechStart = () => setIsRecording(1);
  Voice.onSpeechEnd = () => setIsRecording(0);
  Voice.onSpeechError = err => setErr(err);
  Voice.onSpeechResults = res => setResult(res.value[0]);

  const startListening = async () => {
    try {
      await Voice.start('en-us');
    } catch (err) {
      setErr(err);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
        // console.log(stringSimilarity.compareTwoStrings("My name is Mayank","My Mayank"));
    } catch (err) {
      setErr(err);
    }
  };

  const playSound = () => {
    const sound = new Sound('beep.mp3', null, error => {
      if (error) {
        console.log('Failed to load the sound', error);
      } else {
        console.log('sound is loaded: ', sound.isLoaded());
        sound.play(success => {
          if (success) {
            console.log('Sound played successfully');
            console.log(data);

          } else {
            console.log('Sound playback failed');
          }
        });
      }
    });
  };

  const incTime = () => {
    if (seconds != 2) {
      setTimeout(() => {
        setSec(sec => sec + 1);
        seconds += 1;
        incTime();
      }, 1000);
    } else {
      playSound();
      seconds = 0;
      setStart(1);
      setListen(1);
      setIsRecording(1);
      startListening();
      progressBar();
      setTimeout(() => {
        stopListening();
        setFinish(1);
        setIsRecording(0);
        // setScore(stringSimilarity.compareTwoStrings("My name is Mayank",result))
      }, 4000);

        
    }
  };

  const progressBar=()=>{
     if(seconds!=4){
      setTimeout(()=>{
        setBar(bar=>bar+1/4);
        seconds+=1;
        progressBar();
      },1000)
     }else{
      seconds=0;
      setBar(0);
     }
  }

  const handleSubmit=()=>{
    // mention length of paragraph and check for the length upto the half size ... rest give 0 
    // string similarity will be 60 percent .
    // can not check fluency this way , need to use any other passage 
    // result will be from 10 and wil be including points 
    let paraLength=5; // will change this according to the backend 
    let arr=result.split(" "); 

    console.log(arr);
  }
  return (
    <View>
      {start == 0 ? (
        <Button
          title="Start Test"
          onPress={() => {
            setStart(1);
            setSec(0);
            incTime();
          }}
        />
      ) : (
        <View>
          <Text className="m-4 text-lg">
            Afterwards we will need to load our sound 
          </Text>
          {listen == 0 ? (
            <Text className="text-lg font-semibold">
              You will be speaking in{' '}
              <Text className="text-red-500">{sec} </Text>seconds after the
              sound of Beep.
            </Text>
          ) : (
            ''
          )}

          {finish ? (
            <Text>
              Your result has been recorded , Please proceed to the next task .
            </Text>
          ) : (
            ''
          )}

          {(!finish && listen)?
            <View className="mx-auto ">
            <Progress.Bar progress={bar} width={200} />
          </View>:''}

          <Text>{isRecording?"recrofing ":"stop"}</Text>
          
          <Text>{result}</Text>
          <Text>{score}</Text>
            <Button 
              title='Submit '
              onPress={handleSubmit}
            />
        </View>
      )}
      {result}

    </View>
  );
};

export default ReadAloud;

const styles = StyleSheet.create({});
