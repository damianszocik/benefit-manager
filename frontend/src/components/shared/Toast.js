import React, { useState } from 'react';
import { Snackbar, Slide } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

export const useToast = (message, type = 'success') => {
	const [toastProperties, setToastProperties] = useState({
		visibility: false,
		message,
		type
	});
	const toggleToast = (visibility, message, type) => {
		setToastProperties({
			visibility,
			message: message || toastProperties.message,
			type: type || toastProperties.type
		});
	};
	return { toastProperties, toggleToast };
};

const SlideTransition = props => <Slide {...props} direction="up" />;

const Toast = ({ visibility = false, message, type, closeHandler }) => {
	return (
		<Snackbar onClose={closeHandler} autoHideDuration={25000} open={visibility} TransitionComponent={SlideTransition}>
			<Alert onClose={closeHandler} variant="filled" severity={type}>
				{message}
			</Alert>
		</Snackbar>
	);
};

export default Toast;
