import React, { useContext } from 'react';
import { SystemContext } from 'contexts/System';
import styled from 'styled-components';
import { Typography, IconButton } from '@material-ui/core';
import { ExitToApp as LogoutIcon } from '@material-ui/icons';

const UserInfoSection = ({ userName }) => {
	const { setUser, setCurrentStep } = useContext(SystemContext);
	const logoutHandler = () => {
		setUser({});
		setCurrentStep(0);
	};
	return (
		<UserInfoStyles>
			<Typography noWrap>{userName}</Typography>
			<IconButton edge="end" aria-label="logout" onClick={logoutHandler}>
				<LogoutIcon />
			</IconButton>
		</UserInfoStyles>
	);
};

const UserInfoStyles = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: nowrap;
	color: ${props => props.theme.palette.grey[800]};
	> *:first-child {
		font-weight: 300;
		margin-right: ${props => props.theme.spacing(2)}px;
	}
`;

export default UserInfoSection;
