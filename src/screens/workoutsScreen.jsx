import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { WORKOUTS } from '../data/workoutData';
import { styles } from '../styles/workoutsScreen';
import { loadWorkouts, saveWorkouts } from '../data/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const COMPLETED_KEY = '@workout_completed';

export default function WorkoutsScreen({ navigation }) {
  const [workouts, setWorkouts] = useState(WORKOUTS);
  const [modalVisible, setModalVisible] = useState(false);
  const [completedWorkouts, setCompletedWorkouts] = useState({});
  const [newWorkout, setNewWorkout] = useState({
    name: '',
    type: '',
    duration: '',
    calories: '',
    difficulty: 'Beginner',
    description: '',
    equipment: 'None',
    exercises: []
  });

  // Load workouts from storage on mount
  useEffect(() => {
    loadStoredWorkouts();
    loadCompletedWorkouts();
  }, []);

  // Reload completed workouts when screen comes into focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadCompletedWorkouts();
    });
    return unsubscribe;
  }, [navigation]);

  const loadStoredWorkouts = async () => {
    const stored = await loadWorkouts();
    if (stored && stored.length > 0) {
      setWorkouts(stored);
    }
  };

  const loadCompletedWorkouts = async () => {
    try {
      const completed = await AsyncStorage.getItem(COMPLETED_KEY);
      if (completed) {
        const completedObj = JSON.parse(completed);
        setCompletedWorkouts(completedObj);
        console.log('Loaded completed workouts:', completedObj);
      } else {
        setCompletedWorkouts({});
      }
    } catch (error) {
      console.error('Error loading completed workouts:', error);
      setCompletedWorkouts({});
    }
  };

  const handleAddWorkout = async () => {
    if (!newWorkout.name || !newWorkout.type || !newWorkout.duration || !newWorkout.calories) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const workout = {
      ...newWorkout,
      id: Date.now().toString(),
      icon: 'fitness-outline',
      color: getRandomColor(),
      exercises: newWorkout.exercises.length > 0 ? newWorkout.exercises : [
        { name: 'Exercise 1', duration: '30 seconds' }
      ]
    };

    const updatedWorkouts = [...workouts, workout];
    setWorkouts(updatedWorkouts);
    await saveWorkouts(updatedWorkouts);
    
    setModalVisible(false);
    resetForm();
    Alert.alert('Success', 'Workout added successfully!');
  };

  const getRandomColor = () => {
    const colors = ['#4CAF50', '#2196F3', '#FF5722', '#9C27B0', '#FF9800', '#E91E63'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const resetForm = () => {
    setNewWorkout({
      name: '',
      type: '',
      duration: '',
      calories: '',
      difficulty: 'Beginner',
      description: '',
      equipment: 'None',
      exercises: []
    });
  };

  const renderWorkoutCard = ({ item }) => {
    const isCompleted = completedWorkouts[item.id];
    
    return (
      <TouchableOpacity 
        style={[
          styles.workoutCard,
          isCompleted && { opacity: 0.7, borderLeftWidth: 4, borderLeftColor: '#4CAF50' }
        ]}
        onPress={() => navigation.navigate('WorkoutDetail', { id: item.id })}
        activeOpacity={0.7}
      >
        <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
          <Ionicons name={item.icon} size={32} color="#fff" />
        </View>
        
        <View style={styles.workoutInfo}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Text style={styles.workoutName}>{item.name}</Text>
            {isCompleted && (
              <View style={{ 
                backgroundColor: '#4CAF50', 
                borderRadius: 12, 
                paddingHorizontal: 8, 
                paddingVertical: 2 
              }}>
                <Text style={{ color: '#fff', fontSize: 10, fontWeight: '600' }}>
                  ✓ DONE
                </Text>
              </View>
            )}
          </View>
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
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={workouts}
        renderItem={renderWorkoutCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Add Button - Fixed position */}
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Add Workout Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Workout</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={28} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalForm}>
              <Text style={styles.label}>Workout Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Morning Cardio"
                value={newWorkout.name}
                onChangeText={(text) => setNewWorkout({...newWorkout, name: text})}
              />

              <Text style={styles.label}>Type *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Cardio, Strength, HIIT"
                value={newWorkout.type}
                onChangeText={(text) => setNewWorkout({...newWorkout, type: text})}
              />

              <Text style={styles.label}>Duration *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., 30 min"
                value={newWorkout.duration}
                onChangeText={(text) => setNewWorkout({...newWorkout, duration: text})}
              />

              <Text style={styles.label}>Calories *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., 300"
                keyboardType="numeric"
                value={newWorkout.calories}
                onChangeText={(text) => setNewWorkout({...newWorkout, calories: text})}
              />

              <Text style={styles.label}>Difficulty</Text>
              <View style={styles.difficultyContainer}>
                {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                  <TouchableOpacity
                    key={level}
                    style={[
                      styles.difficultyButton,
                      newWorkout.difficulty === level && styles.difficultyButtonActive
                    ]}
                    onPress={() => setNewWorkout({...newWorkout, difficulty: level})}
                  >
                    <Text style={[
                      styles.difficultyText,
                      newWorkout.difficulty === level && styles.difficultyTextActive
                    ]}>
                      {level}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Describe the workout..."
                multiline
                numberOfLines={3}
                value={newWorkout.description}
                onChangeText={(text) => setNewWorkout({...newWorkout, description: text})}
              />

              <Text style={styles.label}>Equipment</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Dumbbells, Mat"
                value={newWorkout.equipment}
                onChangeText={(text) => setNewWorkout({...newWorkout, equipment: text})}
              />

              <TouchableOpacity 
                style={styles.submitButton}
                onPress={handleAddWorkout}
              >
                <Text style={styles.submitButtonText}>Add Workout</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}