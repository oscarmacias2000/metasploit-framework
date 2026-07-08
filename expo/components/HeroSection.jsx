// components/FeaturesSection.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';

import Svg, { Path, Circle, Rect } from 'react-native-svg';
import Card from './Cards';
import { Button } from 'react-native';
import { SafeAreaView,SafeAreaProvider } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

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


const JSIcon = ({ size = 25 }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 250 250"
      fill="none"
    >
      {/* Sombra exterior */}
      <Circle
        cx="125"
        cy="125"
        r="140"
        fill="#f7df1e"
        opacity="0.1"
      />
      
      {/* Fondo principal */}
      <Rect
        x="15"
        y="15"
        width="220"
        height="220"
        rx="40"
        fill="#f7df1e"
        stroke="#000000"
        strokeWidth="2"
      />
      
      {/* Brillo superior */}
      <Rect
        x="25"
        y="25"
        width="200"
        height="100"
        rx="20"
        fill="#ffffff"
        opacity="0.1"
      />
      
      {/* Letra "J" - con trazo más suave */}
      <Path
        d="M75 75 L175 75 L175 100 L155 100 L155 85 L100 85 L100 155 L75 155 L75 75Z"
        fill="#000000"
      />
      
      {/* Letra "S" - con trazo más suave */}
      <Path
        d="M175 75 L175 100 L135 100 L135 120 L175 120 L175 170 L75 170 L75 145 L120 145 L120 125 L75 125 L75 75 L175 75Z"
        fill="#000000"
      />
      
      {/* Punto decorativo */}
      <Circle cx="80" cy="180" r="8" fill="#000000" />
    </Svg>
  );
};

// Iconos SVG inline
const CloudArrowUpIcon = ({ color = '#ffffff', size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 16v-6m0 0-2 2m2-2 2 2M5 16a4 4 0 0 1-.91-7.87A5.5 5.5 0 0 1 15 7a4 4 0 0 1 0 8H5z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const LockClosedIcon = ({ color = '#ffffff', size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m0 0h9m-9 0h9m-9 0a2.25 2.25 0 0 0-2.25 2.25v6a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-6a2.25 2.25 0 0 0-2.25-2.25h-9z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ArrowPathIcon = ({ color = '#ffffff', size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const FingerPrintIcon = ({ color = '#ffffff', size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.132 3.993m14.185 2.406A7.5 7.5 0 0 1 12 18a7.5 7.5 0 0 1-5.553-2.261M12 6.75a3.75 3.75 0 0 1 3.75 3.75c0 1.117-.296 2.166-.816 3.064M8.25 10.5A3.75 3.75 0 0 1 12 6.75m0 0V3m0 3.75v3.75m-3.75 0h3.75M12 15a3.75 3.75 0 0 0 3.75-3.75M12 15a3.75 3.75 0 0 0 3.75-3.75m-7.5 0A3.75 3.75 0 0 0 12 15"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const JSONIcon = ({ size = 250, color = '#ffffff' }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 250 250"
      fill="none"
    >
      {/* Fondo del ícono */}
      <Rect
        x="10"
        y="10"
        width="230"
        height="230"
        rx="30"
        fill="#ffffff"
        stroke="#000000"
        strokeWidth="2"
      />
      
      {/* Llaves {} de JSON */}
      <Path
        d="M65 85 L85 85 L85 95 L75 95 L75 125 L85 125 L85 135 L65 135 L65 85Z"
        fill="#000000"
      />
      
      <Path
        d="M185 85 L165 85 L165 95 L175 95 L175 125 L165 125 L165 135 L185 135 L185 85Z"
        fill="#000000"
      />
      
      {/* Texto "JSON" estilizado */}
      <Path
        d="M95 95 L105 95 L110 115 L115 95 L125 95 L115 135 L105 135 L100 115 L95 135 L85 135 L95 95Z"
        fill="#000000"
      />
      
      <Path
        d="M130 95 L155 95 L155 105 L140 105 L140 112 L150 112 L150 122 L140 122 L140 128 L155 128 L155 135 L130 135 L130 95Z"
        fill="#000000"
      />
      
      <Path
        d="M160 95 L170 95 L170 135 L160 135 L160 95Z"
        fill="#000000"
      />
    </Svg>
  );
};

const features = [
  {
    name: 'Push to deploy',
    description: 'Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'SSL certificates',
    description: 'Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.',
    icon: LockClosedIcon,
  },
  {
    name: 'Simple queues',
    description: 'Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Advanced security',
    description: 'Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.',
    icon: FingerPrintIcon,
  },
  {
    name: 'modules BrowserExploitServer',
    description: 'modulos para el navegador y ofuzcacion para javascript',
    icon: JSIcon,
  },
  {
    name: 'modules BrowserExploitServer:html',
    description: 'modules para el navegador y ofuzcacion y contenido html',
    icon: JSONIcon,
  },
  {
    name: 'ofuzcacion JavaScript',
    description: 'informacion principial sobre como ofuscar un navegador con tal lenguaje',
    icon: JSIcon,
  },
   {
    name: 'ofuzcacion C',
    description: 'informacion principial sobre como ofuscar un navegador con tal lenguaje',
    icon: JSIcon,
  }
];


export default function FeaturesSection() {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Header */}
        <View style={styles.headerContainer}>
            <View style={styles.gridContainer}>
             <BorgbaseIcon size={100} color="#353835"></BorgbaseIcon><Text style={styles.titleText}>Typefish.app</Text>
          </View>
          <Text style={styles.badgeText}>Deploy faster</Text>
          <Text style={styles.titleText}>
              Build with typefish all modules 
          </Text>
          <Text style={styles.descriptionText}>
            Quis tellus eget adipiscing convallis sit sit eget aliquet quis. 
            Suspendisse eget egestas a elementum pulvinar et feugiat blandit at. 
            In mi viverra elit nunc.
          </Text>
        </View>

        {/* Features Grid */}
        <View style={styles.gridContainer}>
          {features.map((feature, index) => (
            <View key={feature.name} style={styles.featureItem}>
              <View style={styles.iconContainer}>
                <feature.icon size={24} color="#ffffff" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.featureName}>{feature.name}</Text>
                <Text style={styles.featureDescription}>
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.gridContainer}>
           <Button
             title='Help'
             color="#232023"
             accessibilityLabel='Obtener ayuda con este button!'>

            </Button>
            <Button
            title='Get Started'
            color="#232023"
            accessibilityLabel='Comenzar'>
            </Button>
            <Button
            title='Contribute'
            color="#232023"
            accessibilityLabel='Contribuir al proyecto'
            ></Button>
            <Button
            title='typefish DOCS'
            color="#232023"
            accessibilityLabel='Documentos oficiales'
            ></Button>
            <Button
            title='typefish Pro DOCS'
            color="#232023"
            accessibilityLabel='Documentos oficiales Pro'
            ></Button>
      </View>

      <View style={styles.gridContainer}>
          
            <Image 
              style={styles.iconContainer}
              source={{
                uri:'https://www.svgrepo.com/show/452045/js.svg'
              }}
              >
            </Image>
   
            <Image 
              style={styles.iconContainer}
              source={{
                uri:'https://www.svgrepo.com/show/452091/python.svg'
              }}
              >
            </Image>
           
           <Image
             style={styles.iconContainer}
             source={{
                uri:'https://www.svgrepo.com/show/452092/react.svg'
             }}
             ></Image>
            
            <Image
             style={styles.iconContainer}
             source={{
                uri: 'https://www.svgrepo.com/show/452155/android.svg'
             }}
             ></Image>

             <Image
              style={styles.iconContainer}
              source={{
                uri: 'https://www.svgrepo.com/show/452233/ios.svg'
              }}></Image>
             
        </View>      
      </View>
      <Card/>
    </View>
  );
}

const styles = StyleSheet.create({
    titleCard: {
    fontSize: 24, // text-2xl
    fontWeight: '600', // font-semibold
    color: '#1f2937', // text-heading
    lineHeight: 32, // leading-8
    marginBottom: 12, // mb-3
    letterSpacing: -0.5, // tracking-tight
  },
  descriptionCard: {
    fontSize: 16,
    color: '#6b7280', // text-body
    lineHeight: 24,
  },
     card: {
    backgroundColor: '#f9fafb', // neutral-primary-soft
    maxWidth: 384, // max-w-sm
    padding: 24, // p-6
    borderWidth: 1,
    borderColor: '#e5e7eb', // border-default
    borderRadius: 8, // rounded-base
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1, // shadow-xs
    ...(Platform.OS === 'web' && {
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      ':hover': {
        backgroundColor: '#e5e7eb', // hover:bg-neutral-secondary-medium
      },
    }),
  },
  container: {
    backgroundColor: '#111827',
    paddingVertical: 60,
    paddingHorizontal: 16,
    height: '100%',
    paddingBottom: 10,
    overflow: 'auto', 
},
  contentContainer: {
    maxWidth: 1280,
    width: '100%',
    alignSelf: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  badgeText: {
    color: '#818cf8',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  titleText: {
    color: '#ffffff',
    fontSize: width > 768 ? 48 : 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  descriptionText: {
    color: '#d1d5db',
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'center',
    maxWidth: 672,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
    gap: 32,
  
  },
  featureItem: {
    width: width > 768 ? '45%' : '100%',
    maxWidth: 500,
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#6366f1',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    marginTop: 4,
  },
  textContainer: {
    flex: 1,
  },
  featureName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    color: '#9ca3af',
    fontSize: 14,
    lineHeight: 22,
  },
});