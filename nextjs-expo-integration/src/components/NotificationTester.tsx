import { useState } from 'react';
import { Paper, CircularProgress } from '@mui/material';
import { httpsCallable } from '../config/firebase';
import { functions } from '../config/firebase';

const NotificationTester = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const sendTestNotification = async () => {
    setLoading(true);
    try {
      // Example of how to call a Firebase Cloud Function
      const sendNotification = httpsCallable(functions, 'sendTestNotification');
      const response = await sendNotification({ message: 'Test notification' });
      setResult(response.data);
    } catch (error) {
      console.error('Error sending test notification:', error);
      setResult({ error: 'Failed to send notification' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} className="p-4">
      <h2>Notification Tester</h2>
      <button 
        onClick={sendTestNotification}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {loading ? <CircularProgress size={20} color="inherit" /> : 'Send Test Notification'}
      </button>
      
      {result && (
        <div className="mt-4">
          <h3>Result:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </Paper>
  );
};

export default NotificationTester;