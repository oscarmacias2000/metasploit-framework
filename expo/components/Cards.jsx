// components/Card.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView,SafeAreaProvider } from 'react-native-safe-area-context';

const platform = Platform.OS;
const platformInfo = Constants.platform;
console.log('Platform Inicializando:', platform, platformInfo);



const Card = ({ 
  title = 'Typefish technology platform 2026',
  description = 'Desplega y construye con typefish utilizando su propia IA Local y su herramienta typeconsole para ejecutar y administrar tus propios modules',
  onPress = () => console.log('Card pressed'),
  icon

}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
     <SafeAreaProvider style={styles.container}>
            <TouchableOpacity
                  style={[
                  styles.card,
                  isHovered && styles.cardHovered,
                   ]}
      onPress={onPress}
      onMouseEnter={() => Platform.OS === 'web' && setIsHovered(true)}
      onMouseLeave={() => Platform.OS === 'web' && setIsHovered(false)}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      
      {icon && (
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={20} color="#6b7280" />
        </View>
      )}
    </TouchableOpacity>
        <TouchableOpacity
      style={[
        styles.card,
        isHovered && styles.cardHovered,
      ]}
      onPress={onPress}
      onMouseEnter={() => Platform.OS === 'web' && setIsHovered(true)}
      onMouseLeave={() => Platform.OS === 'web' && setIsHovered(false)}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      
      {icon && (
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={20} color="6b7280"></Ionicons>
        </View>
      )}
      </TouchableOpacity>
     </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
    container: {
    backgroundColor: '#111827',
    paddingVertical: 20,
    paddingHorizontal: 12,
    display: 'flex',
    paddingHorizontal: 16,
    height: '100%', 
},
  card: {
    backgroundColor: '#f9fafb',
    maxWidth: 384,
    width: '100%',
    padding: 24,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    shadowColor: '#000000',
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent:'center',
    textAlign: 'center',
    marginTop: 50,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...(Platform.OS === 'web' && {
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    }),
  },
  cardHovered: {
    backgroundColor: '#e5e7eb',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    ...(Platform.OS === 'web' && {
      transform: [{ translateY: -2 }],
    }),
  },
  cardContent: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    marginBottom: 12,
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: -0.5,
    color: '#1f2937',
    lineHeight: 32,
  },
  description: {
    color: '#6b7280',
    fontSize: 16,
    lineHeight: 24,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Card;