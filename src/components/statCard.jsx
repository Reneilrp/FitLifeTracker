import { View, Text, StyleSheet } from 'react-native';
import { styles } from '../styles/statCard';

const StatCard = ({ icon, label, value, unit, color = '#007AFF' }) => {
  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <View style={styles.content}>
        <Text style={styles.icon}>{icon}</Text>
        <View style={styles.textContainer}>
          <Text style={styles.label}>{label}</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.value}>{value}</Text>
            {unit && <Text style={styles.unit}>{unit}</Text>}
          </View>
        </View>
      </View>
    </View>
  );
};
export default StatCard;