import React, { useState } from 'react';
import { Snackbar, Slide, SlideProps } from '@material-ui/core';
import Alert, { Color } from '@material-ui/lab/Alert';

export interface ToastObject {
	visibility?: boolean;
	message: string;
	type: Color;
}

export interface ToastFn<returnedType> {
	(visibility: boolean, message: string, type: Color): returnedType;
}

export interface UseToastReturnType {
	toastProperties: ToastObject;
	toggleToast: ToastFn<void>;
}

interface Toast extends ToastObject {
	closeHandler: (event: React.SyntheticEvent<Element, Event>) => void;
}

export const useToast: ToastFn<UseToastReturnType> = (visibility, message, type = 'success') => {
	const [toastProperties, setToastProperties] = useState<ToastObject>({
		visibility: false,
		message,
		type,
	});
	const toggleToast: ToastFn<void> = (visibility, message, type) => {
		setToastProperties({
			visibility,
			message: message || toastProperties.message,
			type: type || toastProperties.type,
		});
	};
	return { toastProperties, toggleToast };
};

const SlideTransition: React.FC<SlideProps> = (props) => <Slide {...props} direction="up" />;

const Toast: React.FC<Toast> = ({ visibility = false, message, type, closeHandler }) => {
	return (
		<Snackbar onClose={closeHandler} autoHideDuration={25000} open={visibility} TransitionComponent={SlideTransition}>
			<Alert onClose={closeHandler} variant="filled" severity={type}>
				{message}
			</Alert>
		</Snackbar>
	);
};

export default Toast;
