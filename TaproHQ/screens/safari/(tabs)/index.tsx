import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SellerForm } from '@/components/SellerForm';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <SellerForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
});