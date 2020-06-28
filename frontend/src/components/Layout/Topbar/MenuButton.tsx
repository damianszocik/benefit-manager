import React from 'react';
import styled from 'styled-components';
import Lottie from 'react-lottie';
import { IconButton } from '@material-ui/core';
import AnimatedMenuArrowIcon from 'assets/menu-arrow.json';

const animationOptions = {
	animationData: AnimatedMenuArrowIcon,
	loop: false,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid meet',
	},
};

interface MenuButtonProps {
	mobileDrawerVisibility: boolean;
	mobileDrawerToggleHandler: (visibilty: boolean) => any;
}

const MenuButton: React.FC<MenuButtonProps> = ({ mobileDrawerVisibility, mobileDrawerToggleHandler }) => {
	const toArrowSergments = [5, 14],
		toBurgerSegments = [19, 28];
	return (
		<StyledIconButton edge="start" aria-label="menu" onClick={mobileDrawerToggleHandler(!mobileDrawerVisibility)}>
			<Lottie segments={mobileDrawerVisibility ? toArrowSergments : toBurgerSegments} isStopped={false} options={animationOptions} />
		</StyledIconButton>
	);
};

const StyledIconButton = styled(IconButton)`
	position: absolute;
	left: ${(props) => props.theme.spacing(3)}px;
	max-width: 50px;
	max-height: 50px;
`;

export default MenuButton;
