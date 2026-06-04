import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';

import BottomNav from './src/components/BottomNav';
import NavigationMenu from './src/components/NavigationMenu';
import { colors, fonts } from './src/constants/theme';
import AdminPanelScreen from './src/screens/AdminPanelScreen';
import CoursesScreen from './src/screens/CoursesScreen';
import EventsScreen from './src/screens/EventsScreen';
import HomeScreen from './src/screens/HomeScreen';
import JobDetailsScreen from './src/screens/JobDetailsScreen';
import JobsScreen from './src/screens/JobsScreen';
import LoginScreen from './src/screens/LoginScreen';
import MessagesScreen from './src/screens/MessagesScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ProfileActionScreen from './src/screens/ProfileActionScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import SearchScreen from './src/screens/SearchScreen';
import SettingsScreen from './src/screens/SettingsScreen';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular: require('@expo-google-fonts/inter/400Regular/Inter_400Regular.ttf'),
    Inter_500Medium: require('@expo-google-fonts/inter/500Medium/Inter_500Medium.ttf'),
    Inter_600SemiBold: require('@expo-google-fonts/inter/600SemiBold/Inter_600SemiBold.ttf'),
    Inter_700Bold: require('@expo-google-fonts/inter/700Bold/Inter_700Bold.ttf'),
  });
  const [screen, setScreen] = useState('login');
  const [routeParams, setRouteParams] = useState({});
  const [feedback, setFeedback] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    if (!feedback) return undefined;

    const timer = setTimeout(() => setFeedback(''), 2300);
    return () => clearTimeout(timer);
  }, [feedback]);

  useEffect(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, [screen]);

  const navigate = (nextScreen, params = {}) => {
    setMenuVisible(false);
    setRouteParams(params || {});
    setScreen(nextScreen);
  };

  const notify = (message) => {
    setFeedback(message);
  };

  const renderScreen = () => {
    const props = { setScreen: navigate, notify, openMenu: () => setMenuVisible(true), routeParams };

    switch (screen) {
      case 'login':
        return <LoginScreen {...props} />;
      case 'register':
        return <RegisterScreen {...props} />;
      case 'home':
        return <HomeScreen {...props} />;
      case 'jobs':
        return <JobsScreen {...props} />;
      case 'jobDetails':
        return <JobDetailsScreen {...props} jobId={routeParams.jobId} backTo={routeParams.backTo} />;
      case 'courses':
        return <CoursesScreen {...props} />;
      case 'events':
        return <EventsScreen {...props} />;
      case 'profile':
        return <ProfileScreen {...props} />;
      case 'settings':
        return <SettingsScreen {...props} />;
      case 'profileAction':
        return <ProfileActionScreen {...props} mode={routeParams.mode} />;
      case 'notifications':
        return <NotificationsScreen {...props} />;
      case 'admin':
        return <AdminPanelScreen {...props} />;
      case 'messages':
        return <MessagesScreen {...props} />;
      case 'search':
        return <SearchScreen {...props} />;
      default:
        return <HomeScreen {...props} />;
    }
  };

  const hideBottomNav = screen === 'login' || screen === 'register' || screen === 'messages';
  const bottomNavScreen = screen === 'jobDetails' ? 'jobs' : ['settings', 'profileAction'].includes(screen) ? 'profile' : screen;

  if (!fontsLoaded) {
    return <SafeAreaView style={styles.app} />;
  }

  return (
    <SafeAreaView style={styles.app}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      {renderScreen()}
      {!hideBottomNav && (
        <BottomNav
          screen={bottomNavScreen}
          setScreen={navigate}
        />
      )}
      <NavigationMenu visible={menuVisible} onClose={() => setMenuVisible(false)} onNavigate={navigate} />
      {!!feedback && (
        <View style={[styles.toast, !hideBottomNav && styles.toastWithNav]}>
          <Text style={styles.toastText}>{feedback}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: colors.white,
  },
  toast: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 22,
    minHeight: 46,
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: colors.blue,
    borderRadius: 12,
    shadowColor: '#111827',
    shadowOpacity: 0.16,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 16,
    elevation: 8,
  },
  toastWithNav: {
    bottom: 88,
  },
  toastText: {
    color: colors.white,
    textAlign: 'center',
    fontFamily: fonts.medium,
    fontWeight: '500',
    fontSize: 14,
  },
});
