import React, { useContext, useEffect } from 'react';
import { SystemContext } from 'contexts/System';
import Layout from './Layout/Layout';
const App = () => {
	const { setUserName, mobileView } = useContext(SystemContext);
	useEffect(() => {
		//TODO: api call or smth
		setUserName('Sample Username');
	}, []);
	return <Layout mobile={mobileView}>Some content!</Layout>;
};

export default App;
