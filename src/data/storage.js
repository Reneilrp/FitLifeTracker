import AsyncStorage from '@react-native-async-storage/async-storage';
import { WORKOUTS } from './workoutData';

const STORAGE_KEY = '@workout_app_workouts';

// Save workouts to local storage
export const saveWorkouts = async (workouts) => {
  try {
    const jsonValue = JSON.stringify(workouts);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    return true;
  } catch (error) {
    console.error('Error saving workouts:', error);
    return false;
  }
};

// Load workouts from local storage
export const loadWorkouts = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    if (jsonValue != null) {
      return JSON.parse(jsonValue);
    }
    // If no saved workouts, return default workouts
    return WORKOUTS;
  } catch (error) {
    console.error('Error loading workouts:', error);
    return WORKOUTS;
  }
};

// Delete a workout
export const deleteWorkout = async (workoutId) => {
  try {
    const workouts = await loadWorkouts();
    const updatedWorkouts = workouts.filter(w => w.id !== workoutId);
    await saveWorkouts(updatedWorkouts);
    return updatedWorkouts;
  } catch (error) {
    console.error('Error deleting workout:', error);
    return null;  
  }
};

// Clear all workouts (reset to default)
export const resetWorkouts = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error resetting workouts:', error);
    return false;
  }
};