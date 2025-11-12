import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { loadWorkouts } from '../data/storage';
import { styles } from '../styles/workoutDetailScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const COMPLETED_KEY = '@workout_completed';

export default function WorkoutDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const [workout, setWorkout] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    loadWorkoutDetail();
    loadCompletedStatus();
  }, [id]);

  const loadWorkoutDetail = async () => {
    const workouts = await loadWorkouts();
    const foundWorkout = workouts.find(w => w.id === id);
    setWorkout(foundWorkout);
  };

  const loadCompletedStatus = async () => {
    try {
      const completed = await AsyncStorage.getItem(COMPLETED_KEY);
      if (completed) {
        const completedObj = JSON.parse(completed);
        setIsCompleted(completedObj[id] === true);
      }
    } catch (error) {
      console.error('Error loading completed status:', error);
    }
  };

  const handleComplete = async () => {
    const newStatus = !isCompleted;
    setIsCompleted(newStatus);

    try {
      // Load current completed workouts
      const completed = await AsyncStorage.getItem(COMPLETED_KEY);
      const completedObj = completed ? JSON.parse(completed) : {};
      
      // Update the status
      if (newStatus) {
        completedObj[id] = true;
      } else {
        delete completedObj[id];
      }
      
      // Save back to storage
      await AsyncStorage.setItem(COMPLETED_KEY, JSON.stringify(completedObj));
      
      // Show feedback
      Alert.alert(
        'Success', 
        newStatus ? 'Workout marked as completed! 🎉' : 'Workout marked as incomplete',
        [{ text: 'OK' }]
      );
      
      console.log('Saved completion status:', completedObj);
    } catch (error) {
      console.error('Error saving completed status:', error);
      Alert.alert('Error', 'Failed to save completion status');
    }
  };

  if (!workout) {
    return (
      <View style={styles.container}>
        <Text>Loading workout...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={[styles.header, { backgroundColor: workout.color }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Ionicons name={workout.icon} size={60} color="#fff" />
          <Text style={styles.headerTitle}>{workout.name}</Text>
          <Text style={styles.headerType}>{workout.type}</Text>
          {isCompleted && (
            <View style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.3)', 
              borderRadius: 16, 
              paddingHorizontal: 12, 
              paddingVertical: 4,
              marginTop: 8
            }}>
              <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>
                ✓ Completed
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Ionicons name="time" size={24} color="#4CAF50" />
          <Text style={styles.statValue}>{workout.duration}</Text>
          <Text style={styles.statLabel}>Duration</Text>
        </View>
        
        <View style={styles.statBox}>
          <Ionicons name="flame" size={24} color="#FF5722" />
          <Text style={styles.statValue}>{workout.calories}</Text>
          <Text style={styles.statLabel}>Calories</Text>
        </View>
        
        <View style={styles.statBox}>
          <Ionicons name="speedometer" size={24} color="#2196F3" />
          <Text style={styles.statValue}>{workout.difficulty}</Text>
          <Text style={styles.statLabel}>Level</Text>
        </View>
      </View>

      {/* Description */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About This Workout</Text>
        <Text style={styles.description}>{workout.description}</Text>
      </View>

      {/* Equipment */}
      <View style={styles.section}>
        <View style={styles.equipmentHeader}>
          <Ionicons name="barbell-outline" size={20} color="#333" />
          <Text style={styles.sectionTitle}>Equipment Needed</Text>
        </View>
        <Text style={styles.equipment}>{workout.equipment}</Text>
      </View>

      {/* Exercises */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Exercises</Text>
        {workout.exercises.map((exercise, index) => (
          <View key={index} style={styles.exerciseItem}>
            <View style={styles.exerciseNumber}>
              <Text style={styles.exerciseNumberText}>{index + 1}</Text>
            </View>
            <View style={styles.exerciseInfo}>
              <Text style={styles.exerciseName}>{exercise.name}</Text>
              <Text style={styles.exerciseDetail}>
                {exercise.duration || exercise.reps}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Complete Button */}
      <TouchableOpacity 
        style={[
          styles.completeButton, 
          isCompleted && styles.completedButton
        ]}
        onPress={handleComplete}
      >
        <Ionicons 
          name={isCompleted ? "checkmark-circle" : "checkmark-circle-outline"} 
          size={24} 
          color="#fff" 
        />
        <Text style={styles.completeButtonText}>
          {isCompleted ? 'Completed! 🎉' : 'Mark as Complete'}
        </Text>
      </TouchableOpacity>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}