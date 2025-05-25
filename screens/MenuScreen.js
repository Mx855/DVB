import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const backgroundImage = require('../assets/Fond.jpg'); // Assure-toi que le chemin est correct

export default function MenuScreen({ navigation }) {
  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Menu principal - Version test OTA</Text>
        
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('Réservation véhicule')}
        >
          <Text style={styles.menuText}>1. Réservation véhicule</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => alert('Réservation matériel non implémenté')}
        >
          <Text style={styles.menuText}>2. Réservation matériel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => alert('Demande outillage non implémenté')}
        >
          <Text style={styles.menuText}>3. Demande outillage</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => alert('Commande Codial non implémenté')}
        >
          <Text style={styles.menuText}>4. Commande Codial</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('Calendrier Réservation')}
        >
          <Text style={styles.menuText}>5. Calendrier Réservation</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.85)', // blanc semi-transparent pour la lisibilité
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  menuButton: {
    backgroundColor: '#005864',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginVertical: 8,
    width: '100%',
    alignItems: 'center',
  },
  menuText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
