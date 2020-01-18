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
appTheme.overrides = {
	MuiAppBar: {
		colorPrimary: { backgroundColor: appTheme.palette.common.white },
		root: { borderBottom: `3px solid ${appTheme.palette.grey[100]}`, zIndex: appTheme.zIndex.modal + 1 }
	},
	MuiDrawer: {
		paper: {
			padding: appTheme.spacing(10, 2, 4, 2),
			boxSizing: 'border-box',
			justifyContent: 'space-between',
			alignItems: 'center',
			maxWidth: '250px'
		}
	},
	MuiBackdrop: { root: { backgroundColor: 'rgba(255, 255, 255, .5)' } }
};

export default appTheme;
