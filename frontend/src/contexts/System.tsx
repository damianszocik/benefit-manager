import React, { useState, useEffect, createContext } from 'react';
import isMobile from 'ismobilejs';
import axios from 'axios';
import { MOBILE_BREAKPOINT } from 'constants/system';
import { getStoredItem, setStoredItem } from 'utils/localStorage';
import { useToast, UseToastReturnType, ToastObject, ToastFn } from 'components/shared/Toast/Toast';

interface UserRole {
	id: number;
	name: string;
	description: string;
	type: string;
}

interface Benefit {
	id: number;
	name: string;
}

interface User {
	id: number;
	username: string;
	email: string;
	provider: string;
	confirmed: boolean;
	blocked: boolean | null;
	role: UserRole;
	name: string;
	surname: string;
	pesel: string;
	avilablePoints: number;
	created_at: string;
	updated_at: string;
	benefits: Benefit[];
	jwt: string;
}

interface SetUser {
	(user: User | {}): void;
}

interface SystemContext {
	user: User | {};
	setUser: SetUser;
	drawerVisibility: boolean;
	toggleDrawerVisibility: (visibility: any) => (event: any) => void;
	mobileView: boolean;
	setMobileView: (newView: boolean) => void;
	currentStep: number;
	setCurrentStep: (newStep: number) => void;
	toggleLoading: (newLoadingState: boolean) => void;
	loading: boolean;
	globalToast: UseToastReturnType;
}

const initialContext: SystemContext = {
	user: (getStoredItem('user') || {}) as User,
	setUser: () => {},
	drawerVisibility: false,
	toggleDrawerVisibility: () => () => {},
	mobileView: false,
	setMobileView: () => {},
	currentStep: 0,
	setCurrentStep: () => {},
	toggleLoading: () => {},
	loading: false,
	globalToast: { toastProperties: {} as ToastObject, toggleToast: {} as ToastFn<void> },
};

export const SystemContext = createContext<SystemContext>(initialContext);
SystemContext.displayName = 'SystemContext';

const SystemContextProvider: React.FC<{}> = ({ children }) => {
	const [user, setUserValue] = useState<User | {}>(initialContext.user);
	const [currentStep, setCurrentStep] = useState(initialContext.currentStep);
	const [mobileView, setMobileView] = useState(initialContext.mobileView);
	const [loading, toggleLoading] = useState(initialContext.loading);
	const [drawerVisibility, setDrawerVisibility] = useState(initialContext.drawerVisibility);
	const globalToast = useToast(false, '', 'success');

	const setUser: SetUser = (userData) => {
		function isUser(userToBe: User | {}): userToBe is User {
			return 'name' in userToBe && 'surname' in userToBe;
		}

		const { name, surname, pesel, confirmed, blocked } = userData as User;
		setUserValue((prevUserData) => {
			if (isUser(userData)) {
				return { ...prevUserData, ...userData };
			} else {
				return {};
			}
		});
		if (confirmed && !blocked) {
			if (name && surname && pesel) {
				setCurrentStep(2);
			} else {
				setCurrentStep(1);
			}
		} else {
			setCurrentStep(0);
		}
	};
	const toggleDrawerVisibility = (visibility: any) => (event: any) => {
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
		if ('jwt' in user) {
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
				loading,
				globalToast,
			}}>
			{children}
		</SystemContext.Provider>
	);
};

export default SystemContextProvider;
