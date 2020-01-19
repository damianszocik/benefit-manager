import { createMuiTheme } from '@material-ui/core/styles';

const appTheme = createMuiTheme({
	palette: {
		primary: {
			main: '#2986F8'
		}
	},
	typography: {
		h4: {
			fontSize: '2.25rem',
			fontWeight: 300
		},
		body1: {
			fontSize: '1.125rem',
			fontWeight: 300
		},
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
	MuiBackdrop: { root: { backgroundColor: 'rgba(255, 255, 255, .5)' } },
	MuiButton: {
		root: { padding: appTheme.spacing(1.5, 4) }
	},
	MuiTypography: {
		h5: { color: appTheme.palette.grey[500] },
		colorTextPrimary: { color: appTheme.palette.grey[800] },
		colorTextSecondary: { color: appTheme.palette.grey[600] }
	}
};

export default appTheme;
