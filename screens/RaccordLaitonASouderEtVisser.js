// RaccordLaitonASouderEtVisser.js

import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';

const produits = [
  {
    id: '31100141',
    nom: 'Union Laiton',
    description: 'Male 341 Gcu 12 3/8 (sachet De 10)',
    image: require('../../assets/CVC/Laiton/RACCORD_LAITON_A_SOUDER_ET_A_VISSER/31100141.png'),
  },
  {
    id: '31100142',
    nom: 'Union Laiton',
    description: 'Male 341 Gcu 14 3/8 (sachet De 10)',
    image: require('../../assets/CVC/Laiton/RACCORD_LAITON_A_SOUDER_ET_A_VISSER/31100142.png'),
  },
  {
    id: '31100143',
    nom: 'Union Laiton',
    description: 'Male 341 Gcu 12 1/2 (sachet De 10)',
    image: require('../../assets/CVC/Laiton/RACCORD_LAITON_A_SOUDER_ET_A_VISSER/31100143.png'),
  },
  {
    id: '31100144',
    nom: "Union Laiton",
    description: 'Male 14 1/2 Sphero-conique 341 Gcu', 
    image: require('../../assets/CVC/Laiton/RACCORD_LAITON_A_SOUDER_ET_A_VISSER/31100144.png'),
  },
];

export default function RaccordLaitonASouderEtVisser() {
  const [panier, setPanier] = useState([]);

  const ajouterAuPanier = (produit) => {
    setPanier([...panier, produit]);
    Alert.alert('Ajouté au panier', `${produit.nom} ajouté avec succès`);
  };

  // Fonction pour grouper les produits deux par deux
  const produitsParDeux = [];
  for (let i = 0; i < produits.length; i += 2) {
    produitsParDeux.push(produits.slice(i, i + 2));
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titre}>Raccord Laiton à souder et visser</Text>

      {produitsParDeux.map((groupe, index) => (
        <View key={index} style={styles.ligne}>
          {groupe.map((produit) => (
            <View key={produit.id} style={styles.produit}>
              <Image source={produit.image} style={styles.image} resizeMode="contain" />
              <Text style={styles.nom}>{produit.nom}</Text>
              <Text style={styles.description}>{produit.description}</Text>
              <TouchableOpacity style={styles.bouton} onPress={() => ajouterAuPanier(produit)}>
                <Text style={styles.boutonTexte}>Ajouter au panier</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
  titre: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color: '#000',
  },
  ligne: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  produit: {
    width: '48%',
    backgroundColor: '#f0f0a0',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  nom: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  description: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#000',
  },
  bouton: {
    backgroundColor: '#007bff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  boutonTexte: {
    color: '#fff',
    fontWeight: 'bold',
  },
});











