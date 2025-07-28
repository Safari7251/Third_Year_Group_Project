import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface ToggleOption {
  value: string;
  label: string;
}

interface ToggleGroupProps {
  options: ToggleOption[];
  value: string;
  onChange: (value: string) => void;
}

export function ToggleGroup({ options, value, onChange }: ToggleGroupProps) {
  return (
    <View style={styles.container}>
      {options.map((option, index) => {
        const isSelected = value === option.value;
        const isFirst = index === 0;
        const isLast = index === options.length - 1;
        
        return (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.option,
              isSelected && styles.selectedOption,
              isFirst && styles.firstOption,
              isLast && styles.lastOption,
            ]}
            onPress={() => onChange(option.value)}
          >
            <Text style={[
              styles.optionText,
              isSelected && styles.selectedOptionText
            ]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
  },
  option: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  selectedOption: {
    backgroundColor: '#3B82F6',
    shadowColor: '#3B82F6',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  firstOption: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  lastOption: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  selectedOptionText: {
    color: '#FFFFFF',
  },
});