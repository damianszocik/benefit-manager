import React, { useContext } from 'react';
import { SwipeableDrawer } from '@material-ui/core';
import { SystemContext } from 'contexts/System';
import UserInfoSection from 'components/shared/UserInfoSection/UserInfoSection';
import ProgressStepper from 'components/shared/ProgressStepper/ProgressStepper';
import HelpSection from 'components/shared/HelpSection/HelpSection';

const MobileDrawer = () => {
	const { drawerVisibility, toggleDrawerVisibility, userName, currentStep } = useContext(SystemContext);
	return (
		<SwipeableDrawer open={drawerVisibility} onClose={toggleDrawerVisibility(false)} onOpen={toggleDrawerVisibility(true)}>
			{userName && <UserInfoSection userName={userName} />}
			<ProgressStepper step={currentStep} small />
			<HelpSection />
		</SwipeableDrawer>
	);
};

export default MobileDrawer;
