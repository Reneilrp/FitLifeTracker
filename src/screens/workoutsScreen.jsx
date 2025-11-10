import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { WORKOUTS } from '../data/workoutData';
import { styles } from '../styles/workoutsScreen';

export default function WorkoutsScreen() {
  const router = useRouter();

  const renderWorkoutCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.workoutCard}
      onPress={() => router.push(`/data/workoutData/${item.id}`)}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
        <Ionicons name={item.icon} size={32} color="#fff" />
      </View>
      
      <View style={styles.workoutInfo}>
        <Text style={styles.workoutName}>{item.name}</Text>
        <Text style={styles.workoutType}>{item.type}</Text>
        
        <View style={styles.workoutDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{item.duration}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Ionicons name="flame-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{item.calories} cal</Text>
          </View>
        </View>
      </View>
      
      <Ionicons name="chevron-forward" size={24} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={WORKOUTS}
        renderItem={renderWorkoutCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}