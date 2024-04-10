import {Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, {useEffect, useState} from 'react';
import Sound from 'react-native-sound';
import Voice from '@react-native-voice/voice';
import * as Progress from 'react-native-progress';
import stringSimilarity from "string-similarity"
import axios from "axios"
import {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  AVModeIOSOption,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
 } from 'react-native-audio-recorder-player';
 import RNFS from 'react-native-fs';
 import SoundPlayer from 'react-native-sound-player';

const ReadAloud = () => {
  let seconds = 0;
  const [sec, setSec] = useState(1);
  const [start, setStart] = useState(0);
  const [listen, setListen] = useState(false);
  const [bar, setBar] = useState(0);

  const [result, setResult] = useState('');
  const [err, setErr] = useState('');
  const [isRecording1, setIsRecording1] = useState('');

  const [finish, setFinish] = useState(0);
  const [score ,setScore]=useState(0);

  const [isRecording, setIsRecording] = useState(false);
  const [audioPath, setAudioPath] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
    
  Voice.onSpeechStart = () => setIsRecording1(1);
  Voice.onSpeechEnd = () => setIsRecording1(0);
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
      setIsRecording1(1);
      // startListening();
      progressBar();
      startRecording();
      setTimeout(() => {
        // stopListening();
        setFinish(1);
        setIsRecording1(0);
        // setScore(stringSimilarity.compareTwoStrings("My name is Mayank",result))
        stopRecording();
        prepRecording();
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

  // sound recording 

  const startRecording = async () => {
    // Let's get creative and generate a unique audio name!
    const generateAudioName = () => {
    // Come up with a funky way to generate a name here!
    let a =Math.random()*10000;
    return "record"+a;

    };
   const path = `${generateAudioName()}.aac`;
    // Set up the audio settings for our recording adventure
    const audioSet = {
    AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
    AudioSourceAndroid: AudioSourceAndroidType.MIC,
    AVModeIOS: AVModeIOSOption.measurement,
    AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
    AVNumberOfChannelsKeyIOS: 2,
    AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    const meteringEnabled = false;
   // Let the countdown begin…or not!
    await setCountdown(0);
    await setSeconds(0);
    await setMinutes(0);
    setStartCountdown(true);
   try {
    // Start the recording and get the audio URI
    const uri = await audioRecorderPlayer?.current?.startRecorder(
    path,
    audioSet,
    meteringEnabled,
    );
    setIsRecording1(true);
    setAudio
    setAudioPath(uri);
    } catch (error) {
    console.log('Uh-oh! Failed to start recording:', error);
    }
   };

   const stopRecording = async () => {
    setStartCountdown(false);
    try {
    // Stop the recording and see what we've got
    const result = await audioRecorderPlayer?.current?.stopRecorder();
    setIsRecording(false);
    } catch (error) {
    console.log('Oops! Failed to stop recording:', error);
    }
   };

   const prepRecording = async () => {
    setStartCountdown(false);
    try {
    const result = await audioRecorderPlayer?.current?.stopRecorder();
    const fileContent = await RNFS.readFile(audioPath, 'base64');
    const fileInfo = await RNFS.stat(audioPath);
    const vnData = {
    fileCopyUri: fileInfo?.path,
    size: fileInfo?.size,
    type: 'audio/mpeg',
    name: `${generateAudioName()}.${getFileType(fileInfo?.path)}`,
    };
    const vnBase = `data:application/audio;base64,${fileContent}`;
    setAudioFile(vnData);
    setAudioBase(vnBase);
    // Now input code here to send your voicenote to websocket endpoint.
    setIsRecording(false);
    } catch (error) {
    console.log('Uh-oh! Failed to stop and send recording:', error);
    }
   };


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

          <Text>{isRecording1?"recrofing ":"stop"}</Text>
          
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
