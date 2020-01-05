import React from 'react';
import { Toolbar, Typography, AppBar } from '@material-ui/core';
import { ExitToApp as LogoutIcon, PanToolOutlined as HandIcon } from '@material-ui/icons';
import { TopbarContainer, Logo, HelpSection, UserInfoSection, StyledAppBar } from '../styles/TopbarStyles';

const Topbar = () => {
	return (
		<AppBar elevation={0} position="static">
			<Toolbar>
				<TopbarContainer maxWidth="xl">
					<Logo>benefit market</Logo>
					<HelpSection>
						<HandIcon color="inherit" fontSize="large" />
						<div>
							<Typography noWrap variant="subtitle1">
								Need a helping hand?
							</Typography>
							<Typography variant="subtitle2">
								Mail us at: <strong>hrdepartment@pks.pl</strong> or call <strong>+48 123 321 432</strong>
							</Typography>
						</div>
					</HelpSection>
					<UserInfoSection>
						<Typography noWrap>Janusz Polaczek</Typography>
						<LogoutIcon />
					</UserInfoSection>
				</TopbarContainer>
			</Toolbar>
		</AppBar>
	);
};

export default Topbar;
