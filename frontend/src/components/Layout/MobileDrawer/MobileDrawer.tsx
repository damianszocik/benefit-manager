import React, { useContext } from 'react';
import { SwipeableDrawer } from '@material-ui/core';
import { SystemContext } from 'contexts/System';
import UserInfoSection from '../UserInfoSection/UserInfoSection';
import ProgressStepper from '../ProgressStepper/ProgressStepper';
import HelpSection from '../HelpSection/HelpSection';

const MobileDrawer = () => {
	const { drawerVisibility, toggleDrawerVisibility, user, currentStep } = useContext(SystemContext);
	return (
		<SwipeableDrawer open={drawerVisibility} onClose={toggleDrawerVisibility(false)} onOpen={toggleDrawerVisibility(true)}>
			{'username' in user && <UserInfoSection user={user} />}
			<ProgressStepper step={currentStep} small />
			<HelpSection />
		</SwipeableDrawer>
	);
};

export default MobileDrawer;
