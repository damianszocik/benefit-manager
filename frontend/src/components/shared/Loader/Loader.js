import React from 'react';
import styled from 'styled-components';
import Lottie from 'react-lottie';
import LoaderAnimation from 'assets/loader-animation.json';

const LoaderContainer = styled.div`
    display: flex;
    position: absolute;
    height: 100%;
    width: 100%
    top: 0;
    left: 0;
	background: rgba(255, 255, 255, .8);
	z-index: ${props => props.theme.zIndex.modal + 1};
`;

const Loader = ({ show = false }) => {
	const lottieOptions = {
		animationData: LoaderAnimation,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid meet'
		}
	};
	if (show) {
		return (
			<LoaderContainer>
				<Lottie options={lottieOptions} isStopped={false} isClickToPauseDisabled />
			</LoaderContainer>
		);
	} else {
		return null;
	}
};

export default Loader;
