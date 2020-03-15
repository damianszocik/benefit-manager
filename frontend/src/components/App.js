import React, { useContext, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import axios from 'axios';
import { CURRENT_USER } from 'constants/apiEndpoints';
import { SystemContext } from 'contexts/System';
import Toast, { useToast } from 'components/shared/Toast/Toast';
import Layout from './Layout/Layout';
import SignUp from './SignUp/SignUp';
import PersonalDetails from './PersonalDetails/PersonalDetails';
import BenefitsSelection from './BenefitsSelection/BenefitsSelection';
import ResetPassword from './ResetPassword/ResetPassword';

const environmentApiBaseUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;
axios.defaults.baseURL = environmentApiBaseUrl;

const checkConfirmedUser = () => {
	const searchParams = new URLSearchParams(window.location.search);
	return searchParams.has('confirmed');
};

const App = () => {
	const { user, setUser, currentStep, setCurrentStep, toggleLoading, mobileView } = useContext(SystemContext);
	const { toastProperties, toggleToast } = useToast();
	const { location, replace: replaceHistory } = useHistory();
	const renderStepComponent = currentStep => {
		switch (currentStep) {
			case 1:
				return <PersonalDetails />;
			case 2:
				return <BenefitsSelection />;
			case 3:
				return <div>Step3</div>;
			default:
				return <SignUp />;
		}
	};
	const updateUser = async jwt => {
		toggleLoading(true);
		axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
		try {
			const { data: userData } = await axios.get(CURRENT_USER);
			if (userData.blocked) {
				throw new Error();
			}
			if (!userData.confirmed) {
				toggleToast(true, 'Your account is not confirmed. Check your inbox for the message with an activation link.', 'warning');
				throw new Error();
			}
			setUser(prevUserData => ({ ...prevUserData, userData }));
			setCurrentStep(1);
		} catch (error) {
			setUser({});
			setCurrentStep(0);
		}
		toggleLoading(false);
	};
	useEffect(() => {
		if (user.jwt) {
			updateUser(user.jwt);
		}
	}, []);
	useEffect(() => {
		if (checkConfirmedUser()) {
			toggleToast(true, 'Your account has been confirmed. You can now login.', 'success');
		}
		if (location.state && location.state.toast) {
			const { toast, ...cleanedLocationState } = location.state;
			toggleToast(true, toast.message, toast.type);
			replaceHistory({ ...location, state: { ...cleanedLocationState } });
		}
	}, [window.location.href]);
	return (
		<Layout mobile={mobileView}>
			<Switch>
				<Route path="/reset-password">
					<ResetPassword />
				</Route>
				<Route path="/">{renderStepComponent(currentStep)}</Route>
			</Switch>
			<Toast
				visibility={toastProperties.visibility}
				message={toastProperties.message}
				type={toastProperties.type}
				closeHandler={() => toggleToast(false)}
			/>
		</Layout>
	);
};

export default App;
