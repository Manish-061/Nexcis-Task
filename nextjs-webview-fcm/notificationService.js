import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Store FCM token in AsyncStorage
export const storeFCMToken = async (token) => {
  try {
    await AsyncStorage.setItem('fcmToken', token);
    console.log('FCM token stored successfully');
  } catch (error) {
    console.error('Error storing FCM token:', error);
  }
};

// Retrieve FCM token from AsyncStorage
export const getFCMTokenFromStorage = async () => {
  try {
    const token = await AsyncStorage.getItem('fcmToken');
    return token;
  } catch (error) {
    console.error('Error retrieving FCM token:', error);
    return null;
  }
};

// Request notification permissions
export const requestNotificationPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    return true;
  }
  
  console.log('User denied notification permissions');
  return false;
};

// Get FCM token
export const getFCMToken = async () => {
  try {
    const token = await messaging().getToken();
    await storeFCMToken(token);
    return token;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
};

// Create notification channel for Android
export const createNotificationChannel = async () => {
  try {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      lights: true,
      vibration: true,
      importance: 4, // High importance - will show as a heads-up notification
    });
    
    return channelId;
  } catch (error) {
    console.error('Error creating notification channel:', error);
    return 'default';
  }
};

// Display a local notification for testing
export const displayLocalNotification = async (title, body) => {
  try {
    const channelId = await createNotificationChannel();
    
    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId,
        smallIcon: 'ic_notification',
        pressAction: {
          id: 'default',
        },
        sound: 'default',
      },
    });
    
    console.log('Local notification displayed');
  } catch (error) {
    console.error('Error displaying local notification:', error);
  }
};

// Handle foreground notifications
export const setupForegroundNotificationHandler = () => {
  return messaging().onMessage(async remoteMessage => {
    console.log('Foreground notification received:', remoteMessage);
    
    // Display using notifee
    await displayLocalNotification(
      remoteMessage.notification?.title || 'New Notification',
      remoteMessage.notification?.body || ''
    );
  });
};

// Setup background & quit state handlers
export const setupBackgroundHandler = () => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Background notification received:', remoteMessage);
    
    // You can choose to handle background notifications differently if needed
    await displayLocalNotification(
      remoteMessage.notification?.title || 'New Notification',
      remoteMessage.notification?.body || ''
    );
  });
};

// Handle notification open events
export const setupNotificationOpenedHandler = () => {
  return messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('Notification opened while app was in background:', remoteMessage);
    // You can navigate to a specific screen based on the notification data
  });
};

// Initialize all notification handlers
export const initializeNotifications = async () => {
  try {
    const hasPermission = await requestNotificationPermission();
    
    if (hasPermission) {
      const token = await getFCMToken();
      console.log('FCM Token:', token);
      
      // Create default channel for Android
      await createNotificationChannel();
      
      // Setup handlers
      setupBackgroundHandler();
      const unsubscribeForeground = setupForegroundNotificationHandler();
      const unsubscribeOpenedApp = setupNotificationOpenedHandler();
      
      // Check if app was opened from a notification
      const initialNotification = await messaging().getInitialNotification();
      if (initialNotification) {
        console.log('App opened from quit state by notification:', initialNotification);
        // Handle initial notification if needed
      }
      
      return { token, unsubscribeForeground, unsubscribeOpenedApp };
    }
    
    return { token: null };
  } catch (error) {
    console.error('Error initializing notifications:', error);
    return { token: null };
  }
};