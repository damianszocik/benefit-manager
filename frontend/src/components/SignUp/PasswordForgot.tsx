import React from 'react';
import { Grid, Typography, TextField, Box } from '@material-ui/core';

interface PasswordForgotProps {
	emailChangeHandler: (email: string) => void;
}

const PasswordForgot: React.FC<PasswordForgotProps> = ({ emailChangeHandler }) => {
	return (
		<Grid container>
			<Grid item xs={12}>
				<Typography variant="body1" component="p" color="textSecondary">
					Please, provide email address you've used to register your account. We'll send you a message with a link to reset you
					password.
				</Typography>
			</Grid>
			<Grid item xs={12} component={Box} py={2}>
				<TextField type="email" id="email" label="Email" onChange={(event) => emailChangeHandler(event.target.value)} fullWidth />
			</Grid>
		</Grid>
	);
};

export default PasswordForgot;
