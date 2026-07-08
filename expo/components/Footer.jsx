// components/Footer.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';


// Componente SVG optimizado
const BorgbaseIcon = ({ size = 40, color = '#00ff00' }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 1024 1024"
      fill="none"
    >
      <Circle cx="512" cy="512" r="512" fill="#0a0a0a" stroke={color} strokeWidth="4"/>
      <Path
        d="M768 554.7V640c0 23.6-19.1 42.7-42.7 42.7H298.7c-23.6 0-42.7-19.1-42.7-42.7v-85.3c0-23.6 19.1-42.7 42.7-42.7h426.7c23.5 0 42.6 19.1 42.6 42.7z"
        fill={color}
      />
      <Path
        d="M725.3 483.6c9.4 0 18.7 1.9 27.4 5.5l-85.8-128.7c-7.9-11.9-21.2-19-35.5-19H392.6c-14.3 0-27.6 7.1-35.5 19L271.3 489c8.7-3.6 18-5.5 27.4-5.5h426.6z"
        fill={color}
      />
      <Path
        d="M682.7 568.9c-15.7 0-28.4 12.7-28.4 28.4s12.7 28.4 28.4 28.4 28.4-12.7 28.4-28.4-12.7-28.4-28.4-28.4z"
        fill={color}
      />
      <Path
        d="M597.3 568.9c-15.7 0-28.4 12.7-28.4 28.4s12.7 28.4 28.4 28.4 28.4-12.7 28.4-28.4c.1-15.7-12.7-28.4-28.4-28.4z"
        fill={color}
      />
    </Svg>
  );
};



const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      <View style={styles.footerContent}>
        {/* Logo y título */}
        <View style={styles.logoContainer}>
          <View style={styles.logoIcon}>
             <BorgbaseIcon  size={45} color="#353835"></BorgbaseIcon>
          </View>
          <Text style={styles.logoTitle}>Typefish.app</Text>
        </View>

        {/* Links */}
        <View style={styles.linksContainer}>
          {['About', 'Privacy Policy', 'Licensing', 'Contact'].map((link, index) => (
            <TouchableOpacity key={index} style={styles.linkItem}>
              <Text style={styles.linkText}>{link}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Línea divisoria */}
      <View style={styles.divider} />

      {/* Copyright */}
      <Text style={styles.copyright}>
        © 2026 <Text style={styles.copyrightLink}>typefish.app™</Text>. All Rights Reserved.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: '#f9fafb', // bg-neutral-primary-soft
    borderRadius: 8, // rounded-base
    borderWidth: 1,
    borderColor: '#e5e7eb', // border-default
    padding: 16, // p-4
    margin: 16, // m-4
    shadowColor: '#23357a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  footerContent: {
    width: '100%',
    maxWidth: 1280,
    alignSelf: 'center',
    ...(Platform.OS === 'web' && {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }),
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16, // mb-4
    ...(Platform.OS === 'web' && {
      marginBottom: 0,
    }),
  },
  logoIcon: {
    width: 28,
    height: 28,
    backgroundColor: '#ffffff',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  logoText: {
    color: '#0a0a0a',
    fontWeight: 'bold',
    fontSize: 14,
  },
  logoTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937', // text-heading
  },
  linksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    ...(Platform.OS === 'web' && {
      marginBottom: 0,
    }),
  },
  linkItem: {
    marginRight: 16,
    marginBottom: 4,
    ...(Platform.OS === 'web' && {
      marginRight: 24,
      marginBottom: 0,
    }),
  },
  linkText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280', // text-body
    ...(Platform.OS === 'web' && {
      cursor: 'pointer',
      ':hover': {
        textDecoration: 'underline',
      },
    }),
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb', // border-default
    marginVertical: 16,
  },
  copyright: {
    fontSize: 14,
    color: '#6b7280', // text-body
    textAlign: 'center',
  },
  copyrightLink: {
    color: '#6b7280',
    ...(Platform.OS === 'web' && {
      cursor: 'pointer',
      ':hover': {
        textDecoration: 'underline',
      },
    }),
  },
});

export default Footer;