import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { StylesProvider, ThemeProvider } from '@material-ui/styles';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import SystemContextProvider from 'contexts/System';
import appTheme from './components/styles/appTheme';
import GlobalStyle from 'components/styles/Global';
import App from 'components/App';
import * as serviceWorker from './serviceWorker';

const RootComponent: React.FC<{}> = () => (
	<StylesProvider injectFirst>
		<ThemeProvider theme={appTheme}>
			<StyledComponentsThemeProvider theme={appTheme}>
				<SystemContextProvider>
					<GlobalStyle />
					<Router>
						<App />
					</Router>
				</SystemContextProvider>
			</StyledComponentsThemeProvider>
		</ThemeProvider>
	</StylesProvider>
);

ReactDOM.render(<RootComponent />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
