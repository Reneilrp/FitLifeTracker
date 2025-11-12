import { View, Text, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/aboutScreen';
import LD from '../assets/LeadDeveloper.jpeg';
import PM from '../assets/ProjectManager.jpg';
import BA from '../assets/BusinessAnalyst.jpg';
import UI_UX from '../assets/UI-UXDesigner.jpg';
import QA from '../assets/QualityAssurance.jpg';

export default function AboutScreen() {
    const teamMembers = [
        { name: 'Pheinz Reneil Magnun', 
          role: 'Lead Developer', 
          image: LD
        },

        { name: 'Neal Jean Claro', 
          role: 'Project Manager', 
          image: PM
        },
        { name: 'John Paul Enriquez', 
          role: 'Business Analyst',
          image: BA  
        },
        { name: 'Ar-rauf Imar', 
          role: 'UI/UX Designer',
          image: UI_UX
        },
        { name: 'Rhadzmiel Sali', 
          role: 'Quality Assurance', 
          image: QA
        },
    ];

    return (
        <ScrollView style={styles.container}>
            {/* App Info Section */}
            <View style={styles.appInfoSection}>
                <View style={styles.appIconContainer}>
                    <Ionicons name="fitness" size={60} color="#fff" />
                </View>
                <Text style={styles.appName}>FitLife Tracker</Text>
                <Text style={styles.version}>Version 1.0.0</Text>
            </View>

            {/* Purpose Section */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Ionicons name="information-circle" size={24} color="#45D9C8" />
                    <Text style={styles.sectionTitle}>About This App</Text>
                </View>
                <Text style={styles.description}>
                    FitLife Tracker is your personal fitness companion designed to help you
                    monitor your daily activities, track workouts, and maintain a healthy
                    lifestyle. Whether you're a beginner or an advanced athlete, our app
                    provides the tools you need to reach your fitness goals.
                </Text>
            </View>

            {/* Features Section */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Ionicons name="sparkles" size={24} color="#4CAF50" />
                    <Text style={styles.sectionTitle}>Key Features</Text>
                </View>

                <View style={styles.featureItem}>
                    <Ionicons name="walk" size={20} color="#45D9C8" />
                    <Text style={styles.featureText}>Daily step tracking and goals</Text>
                </View>

                <View style={styles.featureItem}>
                    <Ionicons name="water" size={20} color="#2196F3" />
                    <Text style={styles.featureText}>Water intake monitoring</Text>
                </View>

                <View style={styles.featureItem}>
                    <Ionicons name="barbell" size={20} color="#FF9800" />
                    <Text style={styles.featureText}>Curated workout library</Text>
                </View>
            </View>

            {/* Team Section */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Development Team</Text>
                </View>

                {teamMembers.map((member, index) => (
                    <View key={index} style={styles.memberCard}>
                        <Image
                            source={member.image}
                            style={styles.memberAvatar}
                        />
                        <View style={styles.memberInfo}>
                            <Text style={styles.memberName}>{member.name}</Text>
                            <Text style={styles.memberRole}>{member.role}</Text>
                        </View>
                    </View>
                ))}
            </View>

            {/* Tech Stack Section */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Ionicons name="code-slash" size={24} color="#4CAF50" />
                    <Text style={styles.sectionTitle}>Built With</Text>
                </View>
                <Text style={styles.techText}>• React Native</Text>
                <Text style={styles.techText}>• Expo SDK 54</Text>
                <Text style={styles.techText}>• Traditional React Navigation</Text>
                <Text style={styles.techText}>• Expo Vector Icons</Text>
            </View>

            {/* Future Improvements */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Ionicons name="rocket" size={24} color="#4CAF50" />
                    <Text style={styles.sectionTitle}>Coming Soon</Text>
                </View>
                <Text style={styles.description}>
                    • Workout tracking with timer{'\n'}
                    • Custom workout creation{'\n'}
                    • Social sharing features{'\n'}
                    • Achievement badges{'\n'}
                    • Weekly/Monthly reports{'\n'}
                    • Integration with fitness devices
                </Text>
            </View>

            {/* Contact Section */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Ionicons name="mail" size={24} color="#4CAF50" />
                    <Text style={styles.sectionTitle}>Contact Us</Text>
                </View>
                <Text style={styles.contactText}>
                    📧 TechWeave@gmail.com{'\n'}
                    🌐 TechWeave FB Page
                </Text>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Made with 💚 by Group 1
                </Text>
                <Text style={styles.footerText}>
                    © 2025 FitLife Tracker. All rights reserved.
                </Text>
            </View>

            <View style={{ height: 30 }} />
        </ScrollView>
    );
}