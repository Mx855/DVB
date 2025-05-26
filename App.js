import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Updates from 'expo-updates';

// Écrans
import LoginScreen from './screens/LoginScreen';
import MenuScreen from './screens/MenuScreen';
import CalendarScreen from './screens/CalendarScreen';
import ReservationHomeScreen from './screens/ReservationHomeScreen';
import VehicleListScreen from './screens/VehicleListScreen';
import ReservationFormScreen from './screens/ReservationFormScreen';
import CommandeCodialScreen from './screens/CommandeCodialScreen';
import RaccordLaitonASouderEtVisser from './screens/RaccordLaitonASouderEtVisser';

// Contexte global des réservations
import { ReservationProvider } from './contexts/ReservationContext';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔄 Vérification automatique des mises à jour OTA
  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (e) {
        console.log("Erreur lors de la mise à jour OTA :", e);
      }
    };
    checkForUpdates();
  }, []);

  return (
    <ReservationProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isLoggedIn ? (
            <Stack.Screen name="Login">
              {props => (
                <LoginScreen {...props} onLoginSuccess={() => setIsLoggedIn(true)} />
              )}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name="Menu" component={MenuScreen} />
              <Stack.Screen name="Réservation véhicule" component={ReservationHomeScreen} />
              <Stack.Screen name="VehicleList" component={VehicleListScreen} />
              <Stack.Screen name="ReservationFormScreen" component={ReservationFormScreen} />
              <Stack.Screen name="Calendrier Réservation" component={CalendarScreen} />
              <Stack.Screen name="CommandeCodial" component={CommandeCodialScreen} options={{ headerShown: false }} />
              <Stack.Screen
                name="RaccordLaitonASouderEtVisser"
                component={RaccordLaitonASouderEtVisser}
                options={{ headerShown: true, title: "Raccord laiton à souder et à visser" }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </ReservationProvider>
  );
}







