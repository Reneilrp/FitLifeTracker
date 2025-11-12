import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/homeScreen';
import WorkoutsScreen from '../screens/workoutsScreen';
import AboutScreen from '../screens/aboutScreen';
import WorkoutDetailScreen from '../screens/workoutDetailScreen';
import { navigationStyles } from '../styles/navigation';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Workouts') {
            iconName = 'barbell';
          } else if (route.name === 'About') {
            iconName = 'information-circle';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: navigationStyles.tabBar.activeTintColor,
        tabBarInactiveTintColor: navigationStyles.tabBar.inactiveTintColor,
        tabBarStyle: navigationStyles.tabBar.style,
        headerStyle: navigationStyles.header.style,
        headerTintColor: navigationStyles.header.tintColor,
        headerTitleStyle: navigationStyles.header.titleStyle,
        headerShown: true,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ 
          title: "Today's Summary", 
          headerTitleAlign: 'center',
         }}
      />
      <Tab.Screen 
        name="Workouts" 
        component={WorkoutsScreen}
        options={{ 
          title: 'My Workouts',
          headerTitleAlign: 'center',
          }}
      />
      <Tab.Screen 
        name="About" 
        component={AboutScreen}
        options={{ 
          title: 'About & Team',
          headerTitleAlign: 'center',
        }}
      />
    </Tab.Navigator>
  );
}

// Root Stack Navigator
export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="MainTabs" 
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="WorkoutDetail" 
        component={WorkoutDetailScreen}
        options={{ 
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}