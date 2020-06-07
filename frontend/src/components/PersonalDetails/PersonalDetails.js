import React, { useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Typography, Button, Box, Grid, TextField } from '@material-ui/core';
import { ArrowForward as ArrowForwardIcon, ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import { spacing } from '@material-ui/system';
import { SystemContext } from 'contexts/System';
import PeselInput from './PeselInput';
import { UPDATE_USER } from 'constants/apiEndpoints';

const SystemStyledTypography = styled(Typography)`
	${spacing}
`;

const InputsContainer = styled(Grid)`
	margin-top: 0;
	margin-bottom: 0;
`;

const validatePesel = pesel => pesel.split('').filter(char => !isNaN(+char)).length === 3;

const PersonalDetials = () => {
	const { user, setUser, toggleLoading } = useContext(SystemContext);
	const submitHandler = async event => {
		event.preventDefault();
		const {
			name: { value: nameValue },
			surname: { value: surnameValue },
			pesel: { value: peselValue }
		} = event.target.elements;
		if (!validatePesel(peselValue)) {
			// TODO: toogle validation toast
			return;
		}
		if (!nameValue) {
			// TODO: toogle validation toast
			return;
		}
		if (!surnameValue) {
			// TODO: toogle validation toast
			return;
		}
		toggleLoading(true);
		try {
			const { data: userData } = await axios.put(UPDATE_USER(user.id), {
				name: nameValue,
				surname: surnameValue,
				pesel: peselValue
			});
			setUser({ ...userData });
		} catch (error) {
			// TODO: toggle error toast
		}
		toggleLoading(false);
	};
	return (
		<>
			<SystemStyledTypography variant="h5" component="h2" my={2}>
				Step 2
			</SystemStyledTypography>
			<SystemStyledTypography variant="h4" component="h1" color="textPrimary" my={2}>
				Personal Details
			</SystemStyledTypography>
			<SystemStyledTypography variant="body1" component="p" color="textSecondary" my={2}>
				Our HR team needs some of your personal data to proceed benefits selection, your about to make. Besides your full name you just
				need to type 3 random digits from yout PESEL number to make sure about your idetify.
			</SystemStyledTypography>
			<Box component={'form'} width="100%" onSubmit={submitHandler}>
				<InputsContainer container spacing={4} component={Box} py={2} my={0}>
					<Grid item xs={12} sm={6}>
						<TextField fullWidth name="name" label="Name" />
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField fullWidth name="surname" label="Surname" />
					</Grid>
					<Grid item xs={12} sm={6}>
						<PeselInput />
					</Grid>
				</InputsContainer>
				<Box display="flex" justifyContent="flex-start" flexWrap="nowrap" my={2}>
					<Button disabled={false} type="submit" variant="contained" color="primary" endIcon={<ArrowForwardIcon />}>
						Next
					</Button>
				</Box>
			</Box>
		</>
	);
};

export default PersonalDetials;
