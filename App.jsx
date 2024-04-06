
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SecHome from './src/screens/SecHome';
import Home from './src/screens/Home'
import Speaking from './src/screens/speaking/Speaking';
import DesImg from './src/screens/speaking/modules/DesImg';
import ReadAloud from './src/screens/speaking/modules/ReadAloud';
import RepSen from './src/screens/speaking/modules/RepSen';
import ReTellLect from './src/screens/speaking/modules/ReTellLect';
import SummarizeText from './src/screens/speaking/modules/SummarizeText';

const Stack = createNativeStackNavigator();


const App=()=>{
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ReadAloud">
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name="SecHome" component={SecHome}/>
        <Stack.Screen name="Speaking" component={Speaking}/>
        <Stack.Screen name='ReadAloud' component={ReadAloud}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
