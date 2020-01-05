import { createMuiTheme } from '@material-ui/core/styles';

const appTheme = createMuiTheme({
	palette: {
		primary: {
			main: '#2986F8'
		}
	},
	typography: {
		subtitle1: {
			fontSize: '.875rem',
			fontWeight: '400'
		},
		subtitle2: {
			fontSize: '.75rem',
			fontWeight: '300'
		}
	},
	overrides: {}
});

// Override mui components styles after creating theme to use theme properties
// AppBar
appTheme.overrides.MuiAppBar = {
	colorPrimary: { backgroundColor: appTheme.palette.common.white },
	root: { borderBottom: `3px solid ${appTheme.palette.grey[100]}` }
};

export default appTheme;
