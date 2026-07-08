// components/WorkWithUs.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const links = [
  { name: 'Open roles', href: '#' },
  { name: 'Internship program', href: '#' },
  { name: 'Our values', href: '#' },
  { name: 'Meet our leadership', href: '#' },
];

const stats = [
  { name: 'Offices worldwide', value: '12' },
  { name: 'Full-time colleagues', value: '300+' },
  { name: 'Hours per week', value: '40' },
  { name: 'Paid time off', value: 'Unlimited' },
];

export default function WorkWithUs() {
  return (
    <View style={styles.container}>
      {/* Imagen de fondo */}
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply' }}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}
      >
        {/* Gradiente superpuesto */}
        <LinearGradient
          colors={['rgba(17, 24, 39, 0.95)', 'rgba(17, 24, 39, 0.8)']}
          style={styles.gradient}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.contentContainer}>
              {/* Efectos de blur (simulados) */}
              <View style={styles.blurEffects}>
                <View style={[styles.blob, styles.blob1]} />
                <View style={[styles.blob, styles.blob2]} />
              </View>

              {/* Título */}
              <View style={styles.headerContainer}>
                <Text style={styles.titleText}>Work with us</Text>
                <Text style={styles.descriptionText}>
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. 
                  Elit sunt amet fugiat veniam occaecat fugiat.
                </Text>
              </View>

              {/* Links */}
              <View style={styles.linksContainer}>
                {links.map((link, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={styles.linkItem}
                    onPress={() => console.log(`Navigate to ${link.name}`)}
                  >
                    <Text style={styles.linkText}>
                      {link.name}
                      <Text style={styles.arrowText}> →</Text>
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Estadísticas */}
              <View style={styles.statsContainer}>
                {stats.map((stat, index) => (
                  <View key={index} style={styles.statItem}>
                    <Text style={styles.statValue}>{stat.value}</Text>
                    <Text style={styles.statName}>{stat.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  imageStyle: {
    resizeMode: 'cover',
  },
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  contentContainer: {
    maxWidth: 1280,
    width: '100%',
    alignSelf: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  blurEffects: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: -1,
  },
  blob: {
    position: 'absolute',
    width: 274.25,
    height: 274.25,
    opacity: 0.2,
    borderRadius: 999,
    transform: [{ scale: 1.5 }],
  },
  blob1: {
    top: -40,
    right: '50%',
    marginRight: 40,
    backgroundColor: '#ff4694',
    ...(Platform.OS === 'web' && {
      filter: 'blur(40px)',
    }),
  },
  blob2: {
    top: -208,
    left: '50%',
    transform: [{ translateX: -137.125 }, { scale: 1.5 }],
    backgroundColor: '#776fff',
    ...(Platform.OS === 'web' && {
      filter: 'blur(40px)',
    }),
  },
  headerContainer: {
    marginBottom: 40,
  },
  titleText: {
    color: '#ffffff',
    fontSize: width > 768 ? 72 : 48,
    fontWeight: 'bold',
    letterSpacing: -1,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    marginBottom: 16,
  },
  descriptionText: {
    color: '#d1d5db',
    fontSize: width > 768 ? 20 : 18,
    lineHeight: 32,
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    maxWidth: 672,
  },
  linksContainer: {
    flexDirection: width > 768 ? 'row' : 'column',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 24,
    marginBottom: 40,
  },
  linkItem: {
    paddingVertical: 8,
    paddingRight: 16,
  },
  linkText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  arrowText: {
    color: '#ffffff',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 24,
    marginTop: 32,
  },
  statItem: {
    flex: 1,
    minWidth: width > 768 ? 'auto' : '45%',
  },
  statValue: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: 'bold',
    letterSpacing: -0.5,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    marginBottom: 4,
  },
  statName: {
    color: '#d1d5db',
    fontSize: 16,
    lineHeight: 28,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
});