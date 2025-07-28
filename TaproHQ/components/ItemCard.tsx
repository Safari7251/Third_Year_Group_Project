import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Trash2 } from 'lucide-react-native';
import { ItemData } from './SellerForm';
import { Input } from './ui/Input';
import { ToggleGroup } from './ui/ToggleGroup';

interface ItemCardProps {
  item: ItemData;
  index: number;
  onUpdate: (data: Partial<ItemData>) => void;
  onRemove: () => void;
  canRemove: boolean;
}

export function ItemCard({ item, index, onUpdate, onRemove, canRemove }: ItemCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Item #{index + 1}</Text>
        {canRemove && (
          <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
            <Trash2 size={18} color="#EF4444" />
          </TouchableOpacity>
        )}
      </View>

      <Input
        label="Item Name"
        value={item.name}
        onChangeText={(name) => onUpdate({ name })}
        placeholder="Enter item name"
        required
      />

      <View style={styles.row}>
        <View style={styles.halfWidth}>
          <Input
            label="Quantity"
            value={item.quantity}
            onChangeText={(quantity) => onUpdate({ quantity })}
            placeholder="0"
            keyboardType="numeric"
            required
            style={styles.quantityBox}
          />
        </View>
        <View style={styles.halfWidth}>
          <Input
            label="Stock Quantity"
            value={item.stockQuantity}
            onChangeText={(stockQuantity) => onUpdate({ stockQuantity })}
            placeholder="0"
            keyboardType="numeric"
            required
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Distribution Type</Text>
        <ToggleGroup
          options={[
            { value: 'retailer', label: 'Retailer' },
            { value: 'wholesaler', label: 'Wholesaler' },
            { value: 'both', label: 'Both' },
          ]}
          value={item.distributionType}
          onChange={(distributionType) => onUpdate({ distributionType })}
        />
      </View>

      <View style={styles.priceBox}>
        <Input
          label="Unit Price"
          value={item.unitPrice}
          onChangeText={(unitPrice) => onUpdate({ unitPrice })}
          placeholder="0.00"
          keyboardType="decimal-pad"
          prefix="$"
          required
          style={styles.priceInput}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Discount</Text>
        <ToggleGroup
          options={[
            { value: 'none', label: 'No Discount' },
            { value: 'percentage', label: 'Percentage' },
            { value: 'fixed', label: 'Fixed Amount' },
          ]}
          value={item.discountType}
          onChange={(discountType) => onUpdate({ discountType })}
        />
        
        {item.discountType !== 'none' && (
          <Input
            value={item.discountValue}
            onChangeText={(discountValue) => onUpdate({ discountValue })}
            placeholder="Enter discount value"
            keyboardType="decimal-pad"
            prefix={item.discountType === 'percentage' ? '%' : '$'}
            style={styles.discountInput}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  removeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#FEF2F2',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  section: {
    marginTop: 20,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  quantityBox: {
    backgroundColor: '#EFF6FF',
    borderColor: '#3B82F6',
  },
  priceBox: {
    marginTop: 20,
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 16,
  },
  priceInput: {
    backgroundColor: '#F9FAFB',
  },
  discountInput: {
    marginTop: 12,
  },
});