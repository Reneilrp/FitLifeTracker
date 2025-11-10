import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { styles } from '../styles/workoutCard';

const WorkoutCard = ({ workout }) => {
  const handlePress = () => {
    router.push(`/workout/${workout.id}`);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.header}>
        <Text style={styles.title}>{workout.name}</Text>
        <Text style={styles.duration}>{workout.duration} min</Text>
      </View>
      
      <Text style={styles.description}>{workout.description}</Text>
      
      <View style={styles.footer}>
        <Text style={styles.exercises}>{workout.exercises.length} exercises</Text>
        <Text style={styles.difficulty}>{workout.difficulty}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default WorkoutCard;