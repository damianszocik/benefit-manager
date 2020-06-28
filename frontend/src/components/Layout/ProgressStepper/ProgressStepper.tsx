import React from 'react';
import styled from 'styled-components';
import { Stepper, Step, StepLabel } from '@material-ui/core';
import { EmojiPeople as PeopleIcon, Fingerprint as FingerprintIcon, CardGiftcard as GiftcardIcon, Send as SendIcon } from '@material-ui/icons';

interface ProgressStepperProps {
	step: number;
	small: boolean;
}

interface StyledStepIconProps extends ProgressStepperProps {
	active: boolean;
	completed: boolean;
}

const StyledStepper = styled(Stepper)`
	align-items: center;
	.MuiStepLabel-iconContainer {
		padding: 0;
	}
	.MuiStepConnector-vertical {
		padding: 0;
		margin: 0;
	}
`;

const StepConnector = styled.div<{ small: boolean }>`
	height: ${({ theme, small }) => (small ? theme.spacing(6) : theme.spacing(12))}px;
	width: 3px;
	background: ${({ theme }) => theme.palette.primary.main};
	&[disabled] {
		background: ${({ theme }) => theme.palette.grey[300]};
	}
`;

const StyledStepIcon = styled.div<StyledStepIconProps>`
	border-radius: 50%;
	width: ${({ theme, active, small }) => (active ? theme.spacing(small ? 7 : 8) : theme.spacing(small ? 4 : 5))}px;
	height: ${({ theme, active, small }) => (active ? theme.spacing(small ? 7 : 8) : theme.spacing(small ? 4 : 5))}px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${({ active, completed, theme }) => (active || completed ? theme.palette.primary.main : theme.palette.grey[300])};
	color: white;
	svg {
		font-size: ${({ active, small, theme }) => (active ? theme.spacing(small ? 4 : 5) : theme.spacing(small ? 2 : 3))}px;
	}
`;

const icons: { [key: string]: JSX.Element } = {
	'1': <PeopleIcon />,
	'2': <FingerprintIcon />,
	'3': <GiftcardIcon />,
	'4': <SendIcon />,
};

const ProgressStepper: React.FC<ProgressStepperProps> = ({ step = 0, small }) => {
	return (
		<StyledStepper activeStep={step} orientation="vertical" connector={<StepConnector small={small} />}>
			{Object.keys(icons).map((iconKey) => (
				<Step key={iconKey}>
					<StepLabel
						StepIconComponent={(props) => (
							<StyledStepIcon {...props} small={small}>
								{icons[iconKey]}
							</StyledStepIcon>
						)}
					/>
				</Step>
			))}
		</StyledStepper>
	);
};

export default ProgressStepper;
