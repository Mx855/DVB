import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, Text, Alert, ScrollView, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { ReservationContext } from '../contexts/ReservationContext';

dayjs.locale('fr');

const backgroundImage = require('../assets/Fond.jpg');

const CalendarScreen = () => {
  const [reservations, setReservations] = useContext(ReservationContext);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const navigation = useNavigation();

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
    const debut = new Date(res.debut);
    const fin = new Date(res.fin);
    return (
      (debut.getFullYear() === currentYear && debut.getMonth() === currentMonth) ||
      (fin.getFullYear() === currentYear && fin.getMonth() === currentMonth) ||
      (debut < new Date(currentYear, currentMonth + 1, 1) && fin >= new Date(currentYear, currentMonth, 1))
    );
  });

  const getMarkedDates = () => {
    const marked = {};
    reservationsPourMois.forEach(res => {
      const start = new Date(res.debut);
      const end = new Date(res.fin);
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        if (d.getFullYear() === currentYear && d.getMonth() === currentMonth) {
          const dateStr = d.toISOString().split('T')[0];
          if (!marked[dateStr]) {
            marked[dateStr] = { customStyles: { container: {}, text: {} }, creneaux: [] };
          }
          marked[dateStr].creneaux.push(res.creneau);
        }
      }
    });

    Object.keys(marked).forEach(date => {
      const creneaux = marked[date].creneaux;
      if (creneaux.includes('journée entière') || (creneaux.includes('matin') && creneaux.includes('après-midi'))) {
        marked[date].customStyles = {
          container: {
            backgroundColor: '#FFD700',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          },
          text: { color: 'black', fontWeight: 'bold' },
        };
      } else if (creneaux.includes('matin')) {
        marked[date].customStyles = {
          container: {
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            borderLeftWidth: 20,
            borderLeftColor: '#FFD700',
            justifyContent: 'center',
            alignItems: 'center',
          },
          text: { color: 'black', fontWeight: 'bold' },
        };
      } else if (creneaux.includes('après-midi')) {
        marked[date].customStyles = {
          container: {
            backgroundColor: 'white',
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            borderRightWidth: 20,
            borderRightColor: '#FFD700',
            justifyContent: 'center',
            alignItems: 'center',
          },
          text: { color: 'black', fontWeight: 'bold' },
        };
      }

      delete marked[date].creneaux;
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
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>← Retour</Text>
          </TouchableOpacity>
        </View>

        <Calendar
          locale="fr"
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
              <Text style={styles.reservationCreneau}>Créneau : {res.creneau}</Text>
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
    padding: 15,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 40,
    marginBottom: 10,
  },
  backButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  backButtonText: {
    color: '#005864',
    fontWeight: 'bold',
    fontSize: 16,
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
  reservationCreneau: {
    color: 'black',
  }
});

export default CalendarScreen;









