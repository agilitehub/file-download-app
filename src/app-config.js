import RootContent from './custom/root-content'

const AppConfig = {
  title: process.env.REACT_APP_NAME, // The Title of your React Portal
  enableOnUnloadPrompt: false, // If true, prompts user when closing the browser window. NOTE: Works on modern browsers, but each browser treats functionality differently
  enableCustomIndex: false, // If true, an index.js is required in the 'src/custom' folder, allowing logic to be performed on startup of app
  theme: null, // Leave null for default Agilit-e Theme, provide required Object (e.g. require('../custom/resources/theme').default)
  rootContent: RootContent, // The Component to load when lauching app for the first time
  tabNavigation: {
    enabled: false, // If true, switching components is managed via Tabs, else the Root page is always loaded with the new Component
    rootTabTitle: '',
    rootTabContent: null
  },
  agilite: {
    apiServerUrl: '',
    apiKey: ''
  },
  toolbar: {
    enabled: false,
    defaultState: { // The default state of the Toolbar when loading app for the first time
      title: process.env.REACT_APP_NAME,
      leftMenu: {
        enabled: true,
        title: '',
        content: null
      },
      rightMenu: {
        enabled: false,
        title: '',
        content: null
      },
      customMenu1: null,
      customMenu2: null
    }
  }
}

export default AppConfig
