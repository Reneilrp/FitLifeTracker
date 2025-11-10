import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { WORKOUTS } from '../data/workoutData';
import { styles } from '../styles/id';

export default function WorkoutDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const workout = WORKOUTS.find(w => w.id === id);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!workout) {
    return (
      <View style={styles.container}>
        <Text>Workout not found</Text>
      </View>
    );
  }

  const handleComplete = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={[styles.header, { backgroundColor: workout.color }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Ionicons name={workout.icon} size={60} color="#fff" />
          <Text style={styles.headerTitle}>{workout.name}</Text>
          <Text style={styles.headerType}>{workout.type}</Text>
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