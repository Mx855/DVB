import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  Alert, StyleSheet, ImageBackground,
  KeyboardAvoidingView, Platform, ScrollView
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const backgroundImage = require('../assets/Fond.jpg');

export default function ReservationFormScreen({ route, navigation }) {
  const { plate: selectedPlaque } = route.params;
  const [plaque, setPlaque] = useState(selectedPlaque || '');
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

    if (endDate < startDate) {
      Alert.alert('Erreur', 'La date de retour doit être égale ou postérieure à la date de départ.');
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
      plaque,
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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        {/* 🔙 Flèche + Retour en vert */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
            <Text style={styles.backText}>← Retour</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <Text style={styles.title}>Réserver le véhicule</Text>

            <Text style={styles.label}>Plaque choisie :</Text>
            <Text style={styles.plaqueCentrale}>{selectedPlaque}</Text>

            <TextInput
              style={styles.inputEncadre}
              placeholder="Nom et Prénom"
              placeholderTextColor="#555"
              value={nom}
              onChangeText={setNom}
            />

            <TextInput
              style={styles.inputEncadre}
              placeholder="Raison"
              placeholderTextColor="#555"
              value={raison}
              onChangeText={setRaison}
            />

            <TextInput
              style={styles.inputEncadre}
              placeholder="Kilométrage"
              placeholderTextColor="#555"
              value={kilometrage}
              onChangeText={setKilometrage}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Créneau :</Text>
            <View style={styles.creneauContainer}>
              {['matin', 'après-midi', 'journée entière'].map((slot) => (
                <TouchableOpacity
                  key={slot}
                  style={[
                    styles.creneauButton,
                    creneau === slot && styles.creneauButtonSelected
                  ]}
                  onPress={() => setCreneau(slot)}
                >
                  <Text
                    style={[
                      styles.creneauText,
                      creneau === slot && styles.creneauTextSelected
                    ]}
                  >
                    {slot.charAt(0).toUpperCase() + slot.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.button} onPress={() => setShowStartPicker(true)}>
              <Text style={styles.buttonText}>Date de départ</Text>
            </TouchableOpacity>
            {showStartPicker && (
              <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                onChange={handleStartDateChange}
              />
            )}
            <Text style={styles.dateText}>Départ : {startDate.toLocaleDateString()}</Text>

            <TouchableOpacity style={styles.button} onPress={() => setShowEndPicker(true)}>
              <Text style={styles.buttonText}>Date de retour</Text>
            </TouchableOpacity>
            {showEndPicker && (
              <DateTimePicker
                value={endDate}
                mode="date"
                display="default"
                onChange={handleEndDateChange}
              />
            )}
            <Text style={styles.dateText}>Retour : {endDate.toLocaleDateString()}</Text>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Valider</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  label: {
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center',
  },
  plaqueCentrale: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 15,
  },
  inputEncadre: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    padding: 10,
    marginBottom: 10,
    color: 'black',
    borderRadius: 5,
  },
  creneauContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
    marginTop: 4,
  },
  creneauButton: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 5,
    paddingVertical: 10,
    width: 110,
    alignItems: 'center',
  },
  creneauButtonSelected: {
    backgroundColor: '#005864',
    borderColor: '#004C50',
  },
  creneauText: {
    color: 'black',
    fontWeight: 'normal',
  },
  creneauTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#005864',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  dateText: {
    padding: 8,
    borderRadius: 5,
    color: 'black',
    marginBottom: 10,
    textAlign: 'center',
  },
    header: {
    position: 'absolute',
    top: 70,          // plus bas
    right: 20,        // à droite
    zIndex: 1,
  },
  backText: {
    fontSize: 18,
    color: '#005864', // couleur bleue foncée
    fontWeight: 'bold',
  },
});




















