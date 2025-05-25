// ReservationFormScreen.js
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  Alert, StyleSheet, ImageBackground
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const backgroundImage = require('../assets/Fond.jpg');

export default function ReservationFormScreen({ route, navigation }) {
  const { plate: selectedPlaque } = route.params;

  const [nom, setNom] = useState('');
  const [raison, setRaison] = useState('');
  const [kilometrage, setKilometrage] = useState('');
  const [creneau, setCreneau] = useState('matin');

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleStartDateChange = (event, date) => {
    if (event.type === 'set' && date) setStartDate(date);
    setShowStartPicker(false);
  };

  const handleEndDateChange = (event, date) => {
    if (event.type === 'set' && date) setEndDate(date);
    setShowEndPicker(false);
  };

  const isDateTaken = async () => {
    const existing = await AsyncStorage.getItem('reservations');
    const reservations = existing ? JSON.parse(existing) : [];
    return reservations.some(res => res.plaque === selectedPlaque && (
      (startDate >= new Date(res.debut) && startDate <= new Date(res.fin)) ||
      (endDate >= new Date(res.debut) && endDate <= new Date(res.fin)) ||
      (startDate <= new Date(res.debut) && endDate >= new Date(res.fin))
    ));
  };

  const handleSubmit = async () => {
    if (!nom || !raison || !kilometrage) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    if (await isDateTaken()) {
      Alert.alert('Erreur', 'Véhicule déjà réservé pour cette période.');
      return;
    }

    const newReservation = {
      nom,
      raison,
      kilometrage,
      creneau,
      plaque: selectedPlaque,
      debut: startDate.toISOString().split('T')[0],
      fin: endDate.toISOString().split('T')[0]
    };

    try {
      const existing = await AsyncStorage.getItem('reservations');
      const reservations = existing ? JSON.parse(existing) : [];
      reservations.push(newReservation);
      await AsyncStorage.setItem('reservations', JSON.stringify(reservations));
      Alert.alert('Succès', 'Réservation enregistrée !');
      navigation.navigate("Calendrier Réservation");
    } catch (error) {
      console.error('Erreur de sauvegarde :', error);
      Alert.alert('Erreur', "Impossible d'enregistrer la réservation.");
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Réserver le véhicule</Text>
        <Text style={styles.plaqueChoisie}>Plaque choisie : {selectedPlaque}</Text>
        <TextInput style={styles.input} placeholder="Nom et Prénom" value={nom} onChangeText={setNom} />
        <TextInput style={styles.input} placeholder="Raison" value={raison} onChangeText={setRaison} />
        <TextInput style={styles.input} placeholder="Kilométrage" value={kilometrage} onChangeText={setKilometrage} keyboardType="numeric" />

        <TouchableOpacity style={styles.button} onPress={() => setShowStartPicker(true)}>
          <Text style={styles.buttonText}>Date de départ</Text>
        </TouchableOpacity>
        {showStartPicker && <DateTimePicker value={startDate} mode="date" display="default" onChange={handleStartDateChange} />}
        <Text style={styles.dateText}>Départ : {startDate.toLocaleDateString()}</Text>

        <TouchableOpacity style={styles.button} onPress={() => setShowEndPicker(true)}>
          <Text style={styles.buttonText}>Date de retour</Text>
        </TouchableOpacity>
        {showEndPicker && <DateTimePicker value={endDate} mode="date" display="default" onChange={handleEndDateChange} />}
        <Text style={styles.dateText}>Retour : {endDate.toLocaleDateString()}</Text>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Valider</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, color: 'black', fontWeight: 'bold', marginBottom: 10 },
  plaqueChoisie: { color: 'black', fontSize: 16, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, backgroundColor: '#fff', borderRadius: 5 },
  button: { backgroundColor: '#005864', padding: 12, borderRadius: 6, alignItems: 'center', marginVertical: 5 },
  buttonText: { color: 'white', fontSize: 16 },
  dateText: { color: 'black', marginBottom: 10 }
});









