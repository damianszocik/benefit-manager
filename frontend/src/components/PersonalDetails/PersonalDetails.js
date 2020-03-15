import React from 'react';
import styled from 'styled-components';
import { Typography, Button, Box, Grid, TextField } from '@material-ui/core';
import { ArrowForward as ArrowForwardIcon, ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import { spacing } from '@material-ui/system';

const SystemStyledTypography = styled(Typography)`
	${spacing}
`;

const InputsContainer = styled(Grid)`
	margin-top: 0;
	margin-bottom: 0;
`;

const PersonalDetials = () => {
	return (
		<>
			<SystemStyledTypography variant="h5" component="h2" my={2}>
				Step 2
			</SystemStyledTypography>
			<SystemStyledTypography variant="h4" component="h1" color="textPrimary" my={2}>
				Personal Details
			</SystemStyledTypography>
			<SystemStyledTypography variant="body1" component="p" color="textSecondary" my={2}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus in velit feugiat, laoreet metus in, elementum massa. In hac
				habitasse platea dictumst. Integer in velit sit amet est ornare elementum. Maecenas quis risus pellentesque, tempor erat
				tincidunt, accumsan massa. Aenean scelerisque enim nec ex mattis viverra. Nunc rutrum convallis consequat. Sed varius justo a
				facilisis bibendum.
			</SystemStyledTypography>
			<InputsContainer container spacing={4} component={Box} py={2} my={0}>
				<Grid item xs={12} sm={6}>
					<TextField fullWidth name="name" label="Name" />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField fullWidth name="surname" label="Surname" />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField fullWidth id="repeat-password" type="password" label="Repeat password" />
				</Grid>
			</InputsContainer>
			<Box display="flex" justifyContent="flex-start" flexWrap="nowrap" my={2}>
				<Box mr={4}>
					<Button variant="outlined" color="primary" startIcon={<ArrowBackIcon />}>
						Back
					</Button>
				</Box>
				<Button disabled variant="contained" color="primary" endIcon={<ArrowForwardIcon />}>
					Next
				</Button>
			</Box>
		</>
	);
};

export default PersonalDetials;
