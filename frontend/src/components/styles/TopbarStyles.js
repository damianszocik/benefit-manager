import styled from 'styled-components';
import { Container } from '@material-ui/core';

export const TopbarContainer = styled(Container)`
	display: flex;
	align-items: center;
	> *:first-child {
		margin-right: ${props => (props.mobile ? 'initial' : props.theme.spacing(8))}px;
	}
	> *:nth-child(2) {
		margin-right: ${props => (props.mobile ? 'initial' : 'auto')};
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

export const HelpSection = styled.div`
	display: flex;
	align-items: center;
	color: ${props => props.theme.palette.grey[500]};
	svg {
		margin-right: ${props => props.theme.spacing(1)}px;
	}
	strong {
		font-weight: 400;
	}
`;

export const UserInfoSection = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: nowrap;
	color: ${props => props.theme.palette.grey[800]};
	> *:first-child {
		font-weight: 300;
		margin-right: ${props => props.theme.spacing(2)}px;
	}
`;
