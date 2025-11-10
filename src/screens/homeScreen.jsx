import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/homeScreen';

export default function HomeScreen() {
  const [steps, setSteps] = useState(5420);
  const [waterIntake, setWaterIntake] = useState(4);
  const [workoutsCompleted, setWorkoutsCompleted] = useState(2);

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
            <Ionicons name="walk" size={32} color="#4CAF50" />
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
          <Text style={styles.goalText}>Goal: 5 workouts/week</Text>
        </View>
      </View>

      <View style={styles.motivationCard}>
        <Ionicons name="trophy" size={40} color="#FFD700" />
        <Text style={styles.motivationText}>
          Great progress today! Keep it up! 💪
        </Text>
      </View>
    </ScrollView>
  );
}