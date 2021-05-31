// Components
import RootContent from '../root-content.js'

const state = {
  rootContent: RootContent,
  theme: {},
  leftMenu: {
    leftMenuEnabled: false,
    leftMenuTitle: '',
    visible: false,
    expandedMenuItems: [],
    menuItems: [],
    onLeftMenuItemClick: (e) => {},
    onLeftMenuClose: (e) => {},
    onLeftMenuOpen: (e) => {}
  },
  rightMenu: {
    rightMenuEnabled: false,
    rightMenutitle: '',
    visible: false,
    menuItems: [],
    expandedMenuItems: []
  },
  tabNavigation: {
    enabled: false,
    activeKey: '',
    animated: false,
    onTabChange: (key) => {},
    onTabClose: (key, action) => {},
    rootTabKey: '',
    rootTabTitle: '',
    tabs: []
  },
  toolbar: {
    enabled: false,
    title: '',
    customMenus: {
      content: null
    }
  }
}

export default state
