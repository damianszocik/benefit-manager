import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { ArrowRightAlt as ArrowRightIcon } from '@material-ui/icons';
import red from '@material-ui/core/colors/red';

const SignUp = props => {
	return (
		<>
			<Typography variant="h5" component="h2">
				Step 1
			</Typography>
			<Typography variant="h4" component="h1" color="textPrimary">
				Sign up
			</Typography>
			<Typography variant="body1" component="p" color="textSecondary">
				You need to provide some on your personal details in order to confirm your personality by our HR department. We just need your
				birthdate and the last 3 digits from your PESEL number.
			</Typography>
			<Button variant="contained" color="primary" endIcon={<ArrowRightIcon />}>
				Next
			</Button>
		</>
	);
};

export default SignUp;
