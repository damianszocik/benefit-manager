import React, { useContext } from 'react';
import styled from 'styled-components';
import { Toolbar, AppBar, Container } from '@material-ui/core';
import { SystemContext } from 'contexts/System';
import HelpSection from 'components/shared/HelpSection/HelpSection';
import UserInfoSection from 'components/shared/UserInfoSection/UserInfoSection';
import MenuButton from './MenuButton';

const Topbar = () => {
	const { mobileView, drawerVisibility, toggleDrawerVisibility, userName } = useContext(SystemContext);
	return (
		<AppBar elevation={0} position="fixed">
			<Toolbar>
				<TopbarContainer maxWidth="xl">
					{mobileView && (
						<MenuButton mobileDrawerVisibility={drawerVisibility} mobileDrawerToggleHandler={toggleDrawerVisibility} />
					)}
					<Logo>benefit market</Logo>
					{!mobileView && (
						<>
							<HelpSection />
							{userName && <UserInfoSection userName={userName} />}
						</>
					)}
				</TopbarContainer>
			</Toolbar>
		</AppBar>
	);
};

const TopbarContainer = styled(Container)`
	display: flex;
	align-items: center;
	justify-content: center;
	> h1:first-child {
		margin-right: ${props => (props.mobileView ? 'initial' : props.theme.spacing(8) + 'px')};
	}
	> div:first-of-type {
		margin-right: ${props => (props.mobileView ? 'initial' : 'auto')};
	}
`;

export const Logo = styled.h1`
	font-weight: 900;
	font-size: 18px;
	white-space: nowrap;
	text-transform: uppercase;
	background: linear-gradient(to right, #163a83, #3f7cc9);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
`;

export default Topbar;
