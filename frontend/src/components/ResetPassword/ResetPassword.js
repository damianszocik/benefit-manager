import React, { useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';
import { Typography, Button, Box, Grid, TextField } from '@material-ui/core';
import { ArrowForward as ArrowForwardIcon } from '@material-ui/icons';
import { spacing } from '@material-ui/system';
import { SystemContext } from 'contexts/System';
import { RESET_PASSWORD } from 'constants/apiEndpoints';
import parseResponseError from 'utils/parseResponseError';

const SystemStyledTypography = styled(Typography)`
	${spacing}
`;

const InputsContainer = styled(Grid)`
	margin-top: 0;
	margin-bottom: 0;
`;

const ResetPassword = () => {
	const browserHistory = useHistory();
	const {
		setCurrentStep,
		setUser,
		globalToast: { toggleToast }
	} = useContext(SystemContext);
	const query = new URLSearchParams(useLocation().search);
	const submitHandler = async event => {
		event.preventDefault();
		const {
				password: { value: passwordValue },
				repeatPassword: { value: repeatPasswordValue }
			} = event.target.elements,
			code = query.get('code');
		if (passwordValue !== repeatPasswordValue) {
			toggleToast(true, "Your password and repeated password don't match", 'warning');
			return;
		}
		if (!code) {
			throw new Error();
		}
		try {
			const {
				data: { jwt, user }
			} = await axios.post(RESET_PASSWORD, {
				code,
				password: passwordValue,
				passwordConfirmation: repeatPasswordValue
			});
			if (!jwt) {
				throw new Error();
			}
			if (user.blocked) {
				throw new Error();
			}
			if (!user.confirmed) {
				toggleToast(true, 'Your account is not confirmed. Check your inbox for the message with an activation link.', 'warning');
			} else {
				setCurrentStep(1);
				setUser({ ...user, jwt });
				browserHistory.push({
					pathname: '/',
					state: { toast: { message: 'Your password have been changed. You have been logged in.', type: 'success' } }
				});
			}
		} catch (error) {
			toggleToast(true, parseResponseError(error), 'error');
		}
	};
	return (
		<>
			<SystemStyledTypography variant="h4" component="h1" color="textPrimary" my={2}>
				Reset Password
			</SystemStyledTypography>
			<SystemStyledTypography variant="body1" component="p" color="textSecondary" my={2}>
				In order to reset you password, please type you new password below.
			</SystemStyledTypography>
			<Box component={'form'} width="100%" onSubmit={submitHandler}>
				<InputsContainer container spacing={4} component={Box} py={2} my={0}>
					<Grid item xs={12} sm={6}>
						<TextField fullWidth name="password" type="password" label="Password" />
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField fullWidth name="repeatPassword" type="password" label="Repeat password" />
					</Grid>
				</InputsContainer>
				<Box display="flex" justifyContent="flex-start" flexWrap="nowrap" my={2}>
					<Button type="submit" variant="contained" color="primary" endIcon={<ArrowForwardIcon />}>
						Change password
					</Button>
				</Box>
			</Box>
		</>
	);
};

export default ResetPassword;
