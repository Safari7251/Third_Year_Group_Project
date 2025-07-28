import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Store, Plus } from 'lucide-react-native';
import { ItemCard } from './ItemCard';
import { Button } from './ui/Button';

export interface ItemData {
  id: string;
  name: string;
  quantity: string;
  stockQuantity: string;
  distributionType: 'retailer' | 'wholesaler' | 'both';
  unitPrice: string;
  discountType: 'percentage' | 'fixed' | 'none';
  discountValue: string;
}

export function SellerForm() {
  const [items, setItems] = useState<ItemData[]>([
    {
      id: '1',
      name: '',
      quantity: '',
      stockQuantity: '',
      distributionType: 'retailer',
      unitPrice: '',
      discountType: 'none',
      discountValue: '',
    },
  ]);

  const addNewItem = () => {
    const newItem: ItemData = {
      id: Date.now().toString(),
      name: '',
      quantity: '',
      stockQuantity: '',
      distributionType: 'retailer',
      unitPrice: '',
      discountType: 'none',
      discountValue: '',
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: string, updatedData: Partial<ItemData>) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, ...updatedData } : item
    ));
  };

  const handleSubmit = () => {
    // Validate all items
    const isValid = items.every(item => 
      item.name.trim() && 
      item.quantity.trim() && 
      item.stockQuantity.trim() && 
      item.unitPrice.trim()
    );

    if (!isValid) {
      Alert.alert('Validation Error', 'Please fill in all required fields for all items.');
      return;
    }

    Alert.alert(
      'Success!',
      `Successfully added ${items.length} item(s) to your inventory.`,
      [{ text: 'OK', onPress: () => console.log('Items submitted:', items) }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#3B82F6', '#1D4ED8']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Store size={24} color="#FFFFFF" />
          <Text style={styles.headerTitle}>Add New Items</Text>
          <Text style={styles.headerSubtitle}>Manage your inventory</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {items.map((item, index) => (
            <ItemCard
              key={item.id}
              item={item}
              index={index}
              onUpdate={(updatedData) => updateItem(item.id, updatedData)}
              onRemove={() => removeItem(item.id)}
              canRemove={items.length > 1}
            />
          ))}

          <Button
            title="Add More Item"
            onPress={addNewItem}
            variant="secondary"
            icon={<Plus size={20} color="#3B82F6" />}
            style={styles.addButton}
          />

          <Button
            title={`Submit ${items.length} Item${items.length > 1 ? 's' : ''}`}
            onPress={handleSubmit}
            variant="primary"
            style={styles.submitButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#BFDBFE',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  addButton: {
    marginTop: 16,
    marginBottom: 20,
  },
  submitButton: {
    marginTop: 8,
  },
});