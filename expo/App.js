// App.js
import './global.css'
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Modal,
  Pressable,
  Dimensions,
  useWindowDimensions
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Circle } from 'react-native-svg';
import FeaturesSection from './components/HeroSection';
import WorkWithUs from './components/AboutUs';
import Footer from './components/Footer';
import { Button } from 'react-native';

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

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDocsDropdownOpen, setIsDocsDropdownOpen] = useState(false);
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const menuItems = ['Home', 'Company', 'Marketplace', 'Resources', 'Contact', 'DOCS', 'SigIn', 'SigOut'
    ,

  ];
 
  const dropdownItems = [
    { title: 'METASPLOIT', desc: 'Connect with metasploit and build to us' },
    { title: 'MSF', desc: 'Connect with third-party tools' },
    { title: 'console', desc: 'Connect with third-party tools' },
    { title: 'Comunidad', desc: 'Connect with third-party tools' },
    { title: 'API', desc: 'Connect with third-party tools' },
    { title: 'Marketing Automation', desc: 'Connect with third-party tools' },
    { title: 'Typefish/comunidad', desc: 'Connect with us and us community!'},
    { title: 'Policy about modules/metasploit', desc: 'Policy and security'}
  ];
    const docsDropdownItems = [
    { title: 'Getting Started', desc: 'Guía rápida para comenzar con typefish.app' },
    { title: 'API Reference', desc: 'Documentación completa de la API' },
    { title: 'Modules', desc: 'Creación y uso de módulos personalizados' },
    { title: 'CLI Commands', desc: 'Todos los comandos de la consola MSF' },
    { title: 'Security Policy', desc: 'Políticas de seguridad y buenas prácticas' },
    { title: 'Contributing', desc: 'Cómo contribuir al proyecto' },
    { title: 'Changelog', desc: 'Historial de versiones y cambios' },
    { title: 'FAQ', desc: 'Preguntas frecuentes' },
  ];



  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor="#0a0a0a" />
      
      {/* Navbar */}
      <View style={styles.navbar}>
        <View style={styles.navbarContent}>
          {/* Logo */}
          <TouchableOpacity style={styles.logoContainer}>
            <BorgbaseIcon size={45} color="#353835" />
            <Text style={styles.logoTitle}>Typefish.app</Text>
             <Button
                     title='Download'
                     color='#1975c5'
                     accessibilityLabel='Descargar console'>
                    </Button>
           
          </TouchableOpacity>

          {/* Desktop Menu */}
          {isDesktop && (
            <View style={styles.desktopMenu}>
              {menuItems.map((item, index) => (
                <TouchableOpacity 
                  key={index}
                  style={styles.menuItem}
                  onPress={() => {
                    if (item === 'Company') {
                      setIsDropdownOpen(!isDropdownOpen);
                      setIsDocsDropdownOpen(false);
                    }else if(item === 'DOCS'){
                      setIsDocsDropdownOpen(!isDocsDropdownOpen);
                      setIsDropdownOpen(false);
                    }else{
                      setIsDropdownOpen(false);
                      setIsDocsDropdownOpen(false);
                    }
                  }}
                >
                  <Text style={styles.menuText}>
                    {item}
                    {(item === 'Company' || item === 'DOCS') && (
                      <Ionicons 
                        name={(item === 'Company' && isDropdownOpen) || (item === 'DOCS' && isDocsDropdownOpen) 
                          ? 'chevron-up' 
                          : 'chevron-down'
                        }
                        
                        size={16} 
                        color="#8e9fb6" 
                        style={{ marginLeft: 4 }}
                      />
                    )}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Mobile Menu Button */}
          {!isDesktop && (
            <TouchableOpacity 
              style={styles.mobileMenuButton}
              onPress={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Ionicons name="menu" size={28} color="#333633" />
            </TouchableOpacity>
          )}
        </View>

        {/* Dropdown Menu (Desktop) */}
        {isDropdownOpen && isDesktop && (
          <View style={styles.dropdownContainer}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.dropdownScroll}
            >
              {dropdownItems.map((item, index) => (
                <TouchableOpacity key={index} style={styles.dropdownItem}>
                  <Text style={styles.dropdownTitle}>{item.title}</Text>
                  <Text style={styles.dropdownDesc}>{item.desc}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
     
      {isDocsDropdownOpen && isDesktop **(
        <View style={styles.dropdownContainer}>
           <ScrollView
           horizontal
           showsHorizontalScrollIndicator={false}
           style={styles.dropdownScroll}
           >
             {docsDropdownItems.map((item, index) => (
                <TouchableOpacity key={index} style={styles.dropdownItem}>
                  <Text style={styles.dropdownTitle}>{item.title}</Text>
                  <Text style={styles.dropdownDesc}>{item.desc}</Text>
                </TouchableOpacity>
              ))}
           </ScrollView>
        </View>
      )}


      {/* Mobile Menu Modal */}
      <Modal
        visible={isMenuOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsMenuOpen(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setIsMenuOpen(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Menu</Text>
              <TouchableOpacity onPress={() => setIsMenuOpen(false)}>
                <Ionicons name="close" size={28} color="#383938" />
              </TouchableOpacity>
            </View>
            
            <ScrollView>
              {menuItems.map((item, index) => (
                <TouchableOpacity 
                  key={index}
                  style={styles.modalMenuItem}
                  onPress={() => {
                    setIsMenuOpen(false);
                    if (item === 'Company') {
                      setIsDropdownOpen(!isDropdownOpen)
                      set
                    }
                  }}
                >
                  <Text style={styles.modalMenuText}>{item}</Text>
                  {item === 'Company' && (
                    <Ionicons 
                      name={isDropdownOpen ? "chevron-up" : "chevron-down"} 
                      size={20} 
                      color="#2a2a2a" 
                    />
                  )}
                </TouchableOpacity>
              ))}
              
              {isDropdownOpen && (
                <View style={styles.modalDropdown}>
                  {dropdownItems.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.modalDropdownItem}>
                      <Text style={styles.modalDropdownTitle}>{item.title}</Text>
                      <Text style={styles.modalDropdownDesc}>{item.desc}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
              {/*Dropdown DOCS en movil*/}
              {isDropdownOpen && (
                <View style={styles.modalDropdown}>
                   {docsDropdownItems.map((item, index)=>(
                     <TouchableOpacity key={index} style={styles.modalDropdownItem}>
                       <Text style={styles.modalDropdownTitle}>{item.title}</Text>
                       <Text style={styles.modalDropdownDesc}>{item.desc}</Text>
                     </TouchableOpacity>
                   ))}
                </View>
              )}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>

      {/* Hero Section */}
      <View style={styles.heroContainer}>
        <FeaturesSection/>
      </View>
      {/** footer*/}
      <Footer/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  heroContainer: {
    flex: 1,
  },
  navbar: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
    width: '100%',
    zIndex: 20,
  },
  navbarContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    maxWidth: 1280,
    width: '100%',
    alignSelf: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2a2c2a',
    fontFamily: 'Franklin Gothic Medium',
    letterSpacing: 0.5,
  },
  desktopMenu: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  menuText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8e9fb6',
    fontFamily: 'Franklin Gothic Medium',
  },
  mobileMenuButton: {
    padding: 8,
  },
  dropdownContainer: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ffffff',
    alignSelf: 'center',
    width: 'auto',
    minWidth: 300,
    maxWidth: '80%',
    borderRadius: 12,
    marginHorizontal: 20,
    paddingVertical: 20
  },
  dropdownScroll: {
    paddingHorizontal: 50,
  },
  dropdownItem: {
    width: 120,
    height: 200,
    padding: 10,
    backgroundColor: '#fff',
  
    gap: '10px'
     
  },
  dropdownTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3e453e',
    marginBottom: 4,
    fontFamily: 'Franklin Gothic Medium',

  },
  dropdownDesc: {
    fontSize: 12,
    color: '#8e9fb6',
    fontFamily: 'Franklin Gothic Medium',

  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'flex-start',
  },
  modalContent: {
    backgroundColor: '#0a0a0a',
    marginTop: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: '#1a1a1a',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
    paddingBottom: 16,
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#3e3f3e',
    fontFamily: 'Franklin Gothic Medium',

  },
  modalMenuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  modalMenuText: {
    fontSize: 20,
    color: '#8e9fb6',
    fontFamily: 'Franklin Gothic Medium',
  },
  modalDropdown: {
    marginTop: 8,
    paddingHorizontal: 8,
  },
  modalDropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#111111',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#1a1a1a',
  },
  modalDropdownTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3b413b',
    fontFamily: 'Franklin Gothic Medium',

  },
  modalDropdownDesc: {
    fontSize: 20,
    color: '#8e9fb6',
    marginTop: 4,
    fontFamily: 'Franklin Gothic Medium',

  },
});