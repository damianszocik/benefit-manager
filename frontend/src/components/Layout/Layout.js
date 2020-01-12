import React, { useContext, useEffect } from 'react';
import { withTheme } from '@material-ui/core/styles';
import { SystemContext } from 'contexts/System';
import Topbar from './Topbar/Topbar';
import MobileDrawer from './MobileDrawer/MobileDrawer';

const Layout = () => {
	const { setUserName, mobileView } = useContext(SystemContext);
	useEffect(() => {
		//TODO: api call or smth
		setUserName('Sample Username');
	}, []);
	return (
		<div>
			<Topbar />
			{mobileView && <MobileDrawer />}
		</div>
	);
};

export default withTheme(Layout);
