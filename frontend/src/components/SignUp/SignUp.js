import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { SystemContext } from 'contexts/System';
import { animated, config, useTransition } from 'react-spring';
import { Typography, Button, Box, Grid, TextField, Link } from '@material-ui/core';
import { ArrowForward as ArrowForwardIcon } from '@material-ui/icons';
import { spacing } from '@material-ui/system';
import Toast, { useToast } from 'components/shared/Toast/Toast';
import Modal, { useModal } from 'components/shared/Modal/Modal';
import FormTypeToggle from './FormTypeToggle';
import PasswordForgot from './PasswordForgot';
import parseResponseError from 'utils/parseResponseError';
import { REGISTER_USER, LOGIN, FORGOT_PASSWORD } from 'constants/apiEndpoints';

const SystemStyledTypography = styled(Typography)`
	${spacing}
`;

const InputsContainer = styled(Grid)`
	margin-top: 0;
	margin-bottom: 0;
`;
const AnimatedGrid = animated(Grid);

const SignUp = props => {
	const { toggleLoading, setUser, setCurrentStep } = useContext(SystemContext);
	const { toastProperties, toggleToast } = useToast();
	const { modalState, toggleModal } = useModal();
	const [forgottenEmail, setForgottenEmail] = useState('xxxd');
	const formTypes = { LOGIN: 'Login', SIGN_UP: 'Sign up' };
	const [formType, setFormType] = useState(formTypes.LOGIN);
	const transitions = useTransition(formType === formTypes.SIGN_UP, null, {
		from: { opacity: 0, marginTop: '-79px', maxHeight: '0px', paddingTop: '0px', paddingBottom: '0px' },
		enter: { opacity: 1, marginTop: '0px', maxHeight: '80px', paddingTop: '16px', paddingBottom: '16px' },
		leave: { opacity: 0, marginTop: '-79px', maxHeight: '0px', paddingTop: '0px', paddingBottom: '0px' },
		config: config.wobbly
	});
	const toggleForgotPasswordModal = () => {
		toggleModal({
			visibility: true,
			content: <PasswordForgot emailChangeHandler={setForgottenEmail} />,
			title: 'Forgot password'
		});
	};
	const submitHandler = async event => {
		event.preventDefault();
		const { email, password, repeatPassword } = event.target.elements;
		if (formType === formTypes.SIGN_UP && password.value !== repeatPassword.value) {
			toggleToast(true, "Your password and repeated password don't match", 'warning');
			return;
		}
		let requestPayload, requestUrl;
		if (formType === formTypes.LOGIN) {
			requestPayload = {
				identifier: email.value,
				password: password.value
			};
			requestUrl = LOGIN;
		} else if (formType === formTypes.SIGN_UP) {
			requestPayload = {
				username: email.value,
				email: email.value,
				password: password.value
			};
			requestUrl = REGISTER_USER;
		}
		try {
			toggleLoading(true);
			const response = await axios.post(requestUrl, requestPayload);
			const { jwt, user: responseUser } = response.data;
			if (!jwt) {
				throw new Error();
			}
			if (formType === formTypes.SIGN_UP) {
				toggleToast(
					true,
					'The confirmation email have been sent. Please, click on a link you will find in a a message to finish the registration.',
					'success'
				);
			} else {
				if (responseUser.blocked) {
					throw new Error();
				}
				if (!responseUser.confirmed) {
					toggleToast(
						true,
						'Your account is not confirmed. Check your inbox for the message with an activation link.',
						'warning'
					);
				} else {
					setCurrentStep(1);
					setUser(prevUserData => ({ ...prevUserData, ...responseUser, jwt }));
				}
			}
		} catch (error) {
			toggleToast(true, parseResponseError(error), 'error');
		}
		toggleLoading(false);
	};

	const forgotPasswordHandler = async () => {
		try {
			const {
				data: { ok: emailSent }
			} = await axios.post(FORGOT_PASSWORD, {
				email: forgottenEmail
			});
			if (emailSent) {
				toggleModal({ visibility: false });
				toggleToast(true, 'The message with futher instructions have been sent to your inbox.', 'success');
			}
		} catch (error) {
			toggleToast(true, parseResponseError(error), 'error');
		}
	};
	return (
		<>
			<SystemStyledTypography variant="h5" component="h2" my={2}>
				Step 1
			</SystemStyledTypography>
			<FormTypeToggle toggleHandler={setFormType} activeType={formType} types={formTypes} />
			<SystemStyledTypography variant="body1" component="p" color="textSecondary" my={2}>
				You need to provide some on your personal details in order to confirm your personality by our HR department. We just need your
				birthdate and the last 3 digits from your PESEL number. If you forgot your password click{' '}
				<Link href="#" onClick={() => toggleForgotPasswordModal(true)}>
					here
				</Link>
				.
			</SystemStyledTypography>
			<Box component={'form'} width="100%" onSubmit={submitHandler}>
				<InputsContainer container spacing={4} component={Box} py={2} my={0}>
					<Grid item xs={12} sm={6}>
						<TextField fullWidth name="email" type="email" label="Email" />
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField fullWidth name="password" type="password" label="Password" />
					</Grid>
					{transitions.map(
						({ item, key, props }) =>
							item && (
								<AnimatedGrid key={key} style={props} item xs={12} sm={6}>
									<TextField fullWidth name="repeatPassword" type="password" label="Repeat password" />
								</AnimatedGrid>
							)
					)}
				</InputsContainer>
				<Box display="flex" justifyContent="flex-start" flexWrap="nowrap" my={2}>
					<Button type="submit" variant="contained" color="primary" endIcon={<ArrowForwardIcon />}>
						{formType}
					</Button>
				</Box>
			</Box>
			<Modal
				visibility={modalState.visibility}
				title={modalState.title}
				content={modalState.content}
				buttonLeft={modalState.buttonLeft}
				buttonRight={{ text: 'Reset password', action: forgotPasswordHandler }}
			/>
			<Toast
				visibility={toastProperties.visibility}
				message={toastProperties.message}
				type={toastProperties.type}
				closeHandler={() => toggleToast(false)}
			/>
		</>
	);
};

export default SignUp;
