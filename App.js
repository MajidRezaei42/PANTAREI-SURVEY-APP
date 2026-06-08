// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

import { LanguageProvider } from './src/i18n/LanguageContext';
import HomeScreen        from './src/screens/HomeScreen';
import ConsentScreen     from './src/screens/ConsentScreen';
import SurveyScreen      from './src/screens/SurveyScreen';
import ThankYouScreen    from './src/screens/ThankYouScreen';
import DataManagerScreen from './src/screens/DataManagerScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LanguageProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false, gestureEnabled: false }}
          >
            <Stack.Screen name="Home"        component={HomeScreen} />
            <Stack.Screen name="Consent"     component={ConsentScreen} />
            <Stack.Screen name="Survey"      component={SurveyScreen} />
            <Stack.Screen name="ThankYou"    component={ThankYouScreen} />
            <Stack.Screen name="DataManager" component={DataManagerScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </LanguageProvider>
    </GestureHandlerRootView>
  );
}
