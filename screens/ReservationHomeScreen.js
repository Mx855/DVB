import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';

const categories = [
  { title: 'Petit utilitaire', image: require('../assets/Petit_utilitaire.png') },
  { title: 'Moyen utilitaire', image: require('../assets/Moyen_utilitaire.png') },
  { title: 'Grand utilitaire', image: require('../assets/Grand_utilitaire.png') },
  { title: 'Très grand utilitaire', image: require('../assets/Très_grand_utilitaire.png') },
];

export default function ReservationHomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat.title}
          style={styles.card}
          onPress={() => navigation.navigate('VehicleList', { category: cat.title })}
        >
          <Image source={cat.image} style={styles.image} />
          <Text style={styles.text}>{cat.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  card: { margin: 15, alignItems: 'center' },
  image: { width: 200, height: 120, resizeMode: 'contain' },
  text: { fontSize: 18, color: 'black', marginTop: 10 },
});



