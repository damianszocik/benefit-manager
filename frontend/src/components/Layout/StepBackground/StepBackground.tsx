import React, { useContext } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { SystemContext } from 'contexts/System';
import { ReactComponent as AuthImage } from 'assets/auth.svg';
import { ReactComponent as DetailsImage } from 'assets/details.svg';
import { ReactComponent as BenefitsImage } from 'assets/benefits.svg';

const StepBackgroundContainer = styled(motion.aside)`
	height: 100%;
	max-height: 100%;
	max-width: 50%;
	display: flex;
	z-index: -1;
	align-items: center;
`;

type StepBackgroundProps = {
	step: number;
};

const StepImage = ({ step, ...otherProps }: StepBackgroundProps & { [key: string]: any }) => {
	switch (step) {
		case 0:
			return <AuthImage {...otherProps} />;
		case 1:
			return <DetailsImage {...otherProps} />;
		case 2:
			return <BenefitsImage {...otherProps} />;
		default:
			return null;
	}
};

const StepBackground = ({ step }: StepBackgroundProps) => {
	const { setLockLayoutScrolling } = useContext(SystemContext);
	return (
		<AnimatePresence exitBeforeEnter>
			<StepBackgroundContainer
				key={step}
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				onAnimationStart={() => {
					setLockLayoutScrolling(true);
				}}
				onAnimationComplete={() => {
					setLockLayoutScrolling(false);
				}}
				exit={{ opacity: 0, scale: 2 }}>
				<StepImage step={step} key={step} style={{ height: '95%' }} />
			</StepBackgroundContainer>
		</AnimatePresence>
	);
};

export default StepBackground;
