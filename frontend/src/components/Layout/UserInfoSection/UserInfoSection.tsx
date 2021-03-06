import React, { useContext } from 'react';
import { SystemContext } from 'contexts/System';
import styled from 'styled-components';
import { Typography, IconButton } from '@material-ui/core';
import { ExitToApp as LogoutIcon } from '@material-ui/icons';

interface UserObject {
	name?: string;
	surname?: string;
	username?: string;
}

interface UserInfoSectionProps {
	user: UserObject;
}

const UserInfoSection = ({ user = {} }: UserInfoSectionProps) => {
	const { setUser, setCurrentStep } = useContext(SystemContext);
	const logoutHandler = (): void => {
		setUser({});
		setCurrentStep(0);
	};
	const getUserName = (user: UserObject): string => {
		const { name, surname, username = '' } = user;
		return name && surname ? `${name} ${surname}` : username;
	};
	return (
		<UserInfoStyles>
			<Typography noWrap>{getUserName(user)}</Typography>
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
	color: ${(props) => props.theme.palette.grey[800]};
	> *:first-child {
		font-weight: 300;
		margin-right: ${(props) => props.theme.spacing(2)}px;
	}
`;

export default UserInfoSection;
