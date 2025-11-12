import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/homeScreen';
import { loadWorkouts } from '../data/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const COMPLETED_KEY = '@workout_completed';

export default function HomeScreen({ navigation }) {
  const [steps, setSteps] = useState(5420);
  const [waterIntake, setWaterIntake] = useState(4);
  const [workoutsCompleted, setWorkoutsCompleted] = useState(0);
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [completedCalories, setCompletedCalories] = useState(0);

  useEffect(() => {
    loadWorkoutData();
  }, []);

  // Reload data when screen comes into focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadWorkoutData();
    });
    return unsubscribe;
  }, [navigation]);

  const loadWorkoutData = async () => {
    try {
      // Load all workouts
      const workouts = await loadWorkouts();
      setTotalWorkouts(workouts.length);

      // Load completed workouts
      const completed = await AsyncStorage.getItem(COMPLETED_KEY);
      const completedObj = completed ? JSON.parse(completed) : {};
      
      // Count completed workouts
      const completedCount = Object.keys(completedObj).filter(id => completedObj[id] === true).length;
      setWorkoutsCompleted(completedCount);

      // Calculate calories from completed workouts
      const calories = workouts.reduce((sum, workout) => {
        if (completedObj[workout.id] === true) {
          const cal = parseInt(workout.calories) || 0;
          return sum + cal;
        }
        return sum;
      }, 0);
      setCompletedCalories(calories);

      console.log(`Loaded: ${completedCount} completed out of ${workouts.length} total workouts`);
    } catch (error) {
      console.error('Error loading workout data:', error);
    }
  };

  const addWater = () => {
    setWaterIntake(waterIntake + 1);
  };

  const addSteps = () => {
    setSteps(steps + 100);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, Fitness Enthusiast! 👋</Text>
        <Text style={styles.date}>
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })}
        </Text>
      </View>

      <View style={styles.statsContainer}>
        {/* Steps Card */}
        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <Ionicons name="walk" size={32} color="#45D9C8" />
            <Text style={styles.statValue}>{steps.toLocaleString()}</Text>
          </View>
          <Text style={styles.statLabel}>Steps Today</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${(steps / 10000) * 100}%` }]} />
          </View>
          <Text style={styles.goalText}>Goal: 10,000 steps</Text>
          <TouchableOpacity style={styles.addButton} onPress={addSteps}>
            <Text style={styles.addButtonText}>+ Add 100 Steps</Text>
          </TouchableOpacity>
        </View>

        {/* Water Intake Card */}
        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <Ionicons name="water" size={32} color="#2196F3" />
            <Text style={styles.statValue}>{waterIntake}</Text>
          </View>
          <Text style={styles.statLabel}>Glasses of Water</Text>
          <View style={styles.waterGlasses}>
            {[...Array(8)].map((_, i) => (
              <Ionicons 
                key={i} 
                name={i < waterIntake ? "water" : "water-outline"} 
                size={24} 
                color={i < waterIntake ? "#2196F3" : "#ccc"} 
              />
            ))}
          </View>
          <Text style={styles.goalText}>Goal: 8 glasses</Text>
          <TouchableOpacity style={styles.addButton} onPress={addWater}>
            <Text style={styles.addButtonText}>+ Add Glass</Text>
          </TouchableOpacity>
        </View>

        {/* Workouts Completed Card */}
        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <Ionicons name="barbell" size={32} color="#FF9800" />
            <Text style={styles.statValue}>{workoutsCompleted}</Text>
          </View>
          <Text style={styles.statLabel}>Workouts Completed</Text>
          <View style={styles.progressBar}>
            <View style={[
              styles.progressFill, 
              { 
                width: `${totalWorkouts > 0 ? (workoutsCompleted / totalWorkouts) * 100 : 0}%`,
                backgroundColor: '#FF9800'
              }
            ]} />
          </View>
          <Text style={styles.goalText}>
            {workoutsCompleted} of {totalWorkouts} workouts done
          </Text>
          {completedCalories > 0 && (
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              marginTop: 8,
              backgroundColor: '#FFF3E0',
              padding: 8,
              borderRadius: 8
            }}>
              <Ionicons name="flame" size={20} color="#FF5722" />
              <Text style={{ 
                marginLeft: 5, 
                fontSize: 14, 
                color: '#FF5722',
                fontWeight: '600'
              }}>
                {completedCalories} calories burned! 🔥
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.motivationCard}>
        <Ionicons name="trophy" size={40} color="#FFD700" />
        <Text style={styles.motivationText}>
          {workoutsCompleted > 0 
            ? `Amazing! You've completed ${workoutsCompleted} workout${workoutsCompleted > 1 ? 's' : ''} today! 💪`
            : 'Ready to crush your workout goals? Let\'s go! 💪'
          }
        </Text>
      </View>
    </ScrollView>
  );
}