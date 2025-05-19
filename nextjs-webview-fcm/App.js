import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Alert, Platform, StatusBar, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Device from 'expo-device';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeNotifications, displayLocalNotification } from './notificationService';

const NEXT_JS_URL = ' http://localhost:3000';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [fcmToken, setFcmToken] = useState(null);
  const webViewRef = useRef(null);

  useEffect(() => {
    // Initialize notifications
    const setupNotifications = async () => {
      if (Platform.OS !== 'web') {
        const { token, unsubscribeForeground, unsubscribeOpenedApp } = await initializeNotifications();
        setFcmToken(token);

        return () => {
          if (unsubscribeForeground) unsubscribeForeground();
          if (unsubscribeOpenedApp) unsubscribeOpenedApp();
        };
      }
      return () => {};
    };

    // Test notification (remove in production)
    const testNotification = async () => {
      setTimeout(() => {
        displayLocalNotification(
          'Test Notification',
          'This is a test notification from your Expo app!'
        );
      }, 5000);
    };

    setupNotifications();
    testNotification();
  }, []);

  const handleNavigationStateChange = (navState) => {
    // Handle navigation state changes here
  };

  const handleError = (error) => {
    console.error('WebView Error:', error);
    Alert.alert('Error', 'Failed to load the page. Please check your connection.');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <WebView
        ref={webViewRef}
        source={{ uri: NEXT_JS_URL }}
        style={styles.webview}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        onError={handleError}
        onNavigationStateChange={handleNavigationStateChange}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        allowsFullscreenVideo={true}
        allowsInlineMediaPlayback={true}
        userAgent={`NextJSWebView/${Device.osName}-${Device.osVersion}`}
      />
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});
