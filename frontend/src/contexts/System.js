import React, { useState, useEffect, createContext } from 'react';
import isMobile from 'ismobilejs';
import { MOBILE_BREAKPOINT } from 'constants/system';

export const SystemContext = createContext();
SystemContext.displayName = 'SystemContext';

const SystemContextProvider = ({ children }) => {
	const [userName, setUserName] = useState();
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
	return (
		<SystemContext.Provider
			value={{
				userName,
				setUserName,
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
