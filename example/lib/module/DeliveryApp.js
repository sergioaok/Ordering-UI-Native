/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * 
 */
import * as React from 'react';
import * as Sentry from "@sentry/react-native";
import { NavigationContainer } from '@react-navigation/native';
import { ToastProvider } from './providers/ToastProvider';
import { Toast } from './components/shared/OToast';
import RootNavigator from './navigators/RootNavigator';
import { OrderingProvider } from 'ordering-components/native';
import Alert from './providers/AlertProvider';
const configFile = {
  app_id: 'react-native-app',
  project: 'luisv4',
  api: {
    url: 'https://apiv4.ordering.co',
    language: 'en',
    version: 'v400'
  },
  socket: {
    url: 'https://socket.ordering.co'
  }
};
Sentry.init({
  dsn: "https://90197fffe6a1431b8c3eb79e1e36f0ee@o460529.ingest.sentry.io/5722123"
});

const DeliveryApp = () => {
  return /*#__PURE__*/React.createElement(OrderingProvider, {
    settings: configFile,
    Alert: Alert
  }, /*#__PURE__*/React.createElement(ToastProvider, null, /*#__PURE__*/React.createElement(NavigationContainer, null, /*#__PURE__*/React.createElement(RootNavigator, null)), /*#__PURE__*/React.createElement(Toast, null)));
};

export default DeliveryApp;
//# sourceMappingURL=DeliveryApp.js.map