import React from 'react';
import styled from 'styled-components';
import { Typography, Box } from '@material-ui/core';
import { useSpring, animated, interpolate, config } from 'react-spring';
import { spacing, palette } from '@material-ui/system';

const SystemStyledTypography = styled(Typography)`
    ${spacing}${palette};
    cursor: ${({ notClickable }) => (notClickable ? 'default' : 'pointer')}
`;

const AnimatedTypography = animated(SystemStyledTypography);

const FormTypeToggle = ({ activeType, toggleHandler, types }) => {
	const toggleValues = Object.values(types);
	const { scale1, scale2, opacity1, opacity2, marginLeft, x } = useSpring({
		from: { scale1: 1, scale2: 1, marginLeft: 0, opacity1: 1, opacity2: 1, x: 0 },
		scale1: activeType === toggleValues[0] ? 1 : 0.6,
		scale2: activeType === toggleValues[1] ? 1 : 0.6,
		marginLeft: activeType === toggleValues[0] ? 0 : -41,
		opacity1: activeType === toggleValues[0] ? 1 : 0.5,
		opacity2: activeType === toggleValues[1] ? 1 : 0.5,
		x: activeType === toggleValues[0] ? 0 : 30,
		config: config.wobbly
	});
	return (
		<Box display="flex" alignItems="center">
			<AnimatedTypography
				variant="h4"
				component="h1"
				style={{
					transform: interpolate([scale1, x], (scale1, x) => `scale(${scale1}) translateX(${x}px) `),
					opacity: opacity1,
					marginLeft
				}}
				my={2}
				onClick={() => toggleHandler(toggleValues[0])}>
				{toggleValues[0]}
			</AnimatedTypography>
			<SystemStyledTypography variant="h4" component="h1" color="textPrimary" my={2}>
				&nbsp;/&nbsp;
			</SystemStyledTypography>
			<AnimatedTypography
				variant="h4"
				component="h1"
				style={{ transform: interpolate([scale2, x], (scale2, x) => `scale(${scale2}) translateX(${x - 30}px) `), opacity: opacity2 }}
				my={2}
				onClick={() => toggleHandler(toggleValues[1])}>
				{toggleValues[1]}
			</AnimatedTypography>
		</Box>
	);
};

export default FormTypeToggle;
