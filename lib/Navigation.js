import App from './App.js'
import Home from './components/Home'
import { Navigation } from "react-native-navigation";

Navigation.registerComponent('com.myApp.App', () => App);
Navigation.registerComponent('com.myApp.Home', () => Home);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'com.myApp.App'
            }
          },
          {
            component: {
              name: 'com.myApp.Home'
            }
          },
        ]
      }
    }
  });
});

