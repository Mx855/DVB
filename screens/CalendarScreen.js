import React, { useState, useCallback, useContext } from 'react';
import { View, Text, Alert, ScrollView, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ReservationContext } from '../contexts/ReservationContext';

const backgroundImage = require('../assets/Fond.jpg');

const CalendrierScreen = () => {
  const [reservations, setReservations] = useContext(ReservationContext);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // 0-based

  const chargerReservations = async () => {
    try {
      const data = await AsyncStorage.getItem('reservations');
      const parsed = data ? JSON.parse(data) : [];
      setReservations(parsed);
    } catch (error) {
      console.error('Erreur chargement réservations :', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      chargerReservations();
    }, [])
  );

  const reservationsPourMois = reservations.filter(res => {
    const start = new Date(res.debut);
    const end = new Date(res.fin);
    return (
      (start.getFullYear() === currentYear && start.getMonth() === currentMonth) ||
      (end.getFullYear() === currentYear && end.getMonth() === currentMonth) ||
      (start < new Date(currentYear, currentMonth + 1, 1) && end >= new Date(currentYear, currentMonth, 1))
    );
  });

  const getMarkedDates = () => {
    const marked = {};

    reservationsPourMois.forEach((res) => {
      const start = new Date(res.debut);
      const end = new Date(res.fin);

      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        if (d.getFullYear() === currentYear && d.getMonth() === currentMonth) {
          const dateStr = d.toISOString().split('T')[0];
          marked[dateStr] = {
            customStyles: {
              container: { backgroundColor: '#FFD700' },
              text: { color: 'black', fontWeight: 'bold' }
            }
          };
        }
      }
    });

    return marked;
  };

  const onReservationPress = (reservation) => {
    Alert.alert(
      "Supprimer la réservation",
      `Voulez-vous supprimer la réservation de ${reservation.nom} (${reservation.plaque}) ?`,
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            const newReservations = reservations.filter(r => r !== reservation);
            setReservations(newReservations);
            try {
              await AsyncStorage.setItem('reservations', JSON.stringify(newReservations));
            } catch (e) {
              console.error("Erreur sauvegarde après suppression", e);
            }
          }
        }
      ]
    );
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.overlay}>
        <Calendar
          markingType={'custom'}
          markedDates={getMarkedDates()}
          style={styles.calendar}
          onMonthChange={month => {
            setCurrentYear(month.year);
            setCurrentMonth(month.month - 1);
          }}
          theme={{
            selectedDayBackgroundColor: '#005864',
            todayTextColor: '#005864',
            arrowColor: '#005864',
            monthTextColor: '#005864',
            textDayFontWeight: 'bold',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: 'bold',
          }}
        />
        <Text style={styles.detailTitle}>Détails du mois sélectionné :</Text>
        <ScrollView style={styles.scroll}>
          {reservationsPourMois.length === 0 && (
            <Text style={styles.noReservationText}>Aucune réservation ce mois-ci.</Text>
          )}
          {reservationsPourMois.map((res, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => onReservationPress(res)}
              style={styles.reservationItem}
            >
              <Text style={styles.reservationName}>{res.nom} - {res.plaque}</Text>
              <Text style={styles.reservationDates}>{res.debut} → {res.fin}</Text>
              <Text style={styles.reservationReason}>{res.raison}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.85)', // Blanc semi-transparent pour lisibilité
    padding: 15,
  },
  calendar: {
    borderRadius: 10,
    elevation: 3,
    backgroundColor: 'white',
  },
  detailTitle: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
  scroll: {
    marginTop: 10,
  },
  noReservationText: {
    fontStyle: 'italic',
    color: '#555',
  },
  reservationItem: {
    paddingVertical: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  reservationName: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
  },
  reservationDates: {
    color: 'black',
  },
  reservationReason: {
    color: 'black',
    fontStyle: 'italic',
  },
});

export default CalendrierScreen;





