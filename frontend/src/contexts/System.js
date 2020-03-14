import React, { useState, useEffect, createContext } from 'react';
import isMobile from 'ismobilejs';
import axios from 'axios';
import { MOBILE_BREAKPOINT } from 'constants/system';
import { getStoredItem, setStoredItem } from 'utils/localStorage';

export const SystemContext = createContext();
SystemContext.displayName = 'SystemContext';

const SystemContextProvider = ({ children }) => {
	const [user, setUser] = useState(getStoredItem('user') || {});
	const [currentStep, setCurrentStep] = useState(0);
	const [mobileView, setMobileView] = useState(false);
	const [loading, toggleLoading] = useState(false);
	const [drawerVisibility, setDrawerVisibility] = useState(false);

	const toggleDrawerVisibility = visibility => event => {
		if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}
		setDrawerVisibility(visibility);
	};
	const windowResizeObserver = () => {
		if (window.innerWidth >= MOBILE_BREAKPOINT) {
			setMobileView(false);
		} else {
			setMobileView(true);
		}
	};
	useEffect(() => {
		//TODO: decide which method should stay
		// setMobileView(isMobile().any);
		windowResizeObserver();
		window.addEventListener('resize', windowResizeObserver);
		return () => {
			window.removeEventListener('resize', windowResizeObserver);
		};
	});
	// preservig values to local storage
	useEffect(() => {
		if (user.jwt) {
			axios.defaults.headers.common['Authorization'] = `Bearer ${user.jwt}`;
		} else {
			delete axios.defaults.headers.common['Authorization'];
		}
		setStoredItem('user', user);
	}, [user]);
	return (
		<SystemContext.Provider
			value={{
				user,
				setUser,
				drawerVisibility,
				toggleDrawerVisibility,
				mobileView,
				setMobileView,
				currentStep,
				setCurrentStep,
				toggleLoading,
				loading
			}}>
			{children}
		</SystemContext.Provider>
	);
};

export default SystemContextProvider;
