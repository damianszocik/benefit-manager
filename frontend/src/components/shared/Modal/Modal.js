import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export const useModal = (defaultContent = '') => {
	const [modalVisibility, setModalVisibility] = useState(false);
	const [modalProperties, setModalProperties] = useState({
		title: null,
		content: defaultContent,
		buttonLeft: {
			text: 'Cancel',
			action: () => setModalVisibility(false)
		},
		buttonRight: {
			text: 'Ok',
			action: () => setModalVisibility(false)
		}
	});

	const toggleModal = ({ visibility, content = '', buttonRight, buttonLeft, title }) => {
		setModalProperties(prevModalState => ({
			title,
			content,
			buttonLeft: buttonLeft ? buttonLeft : prevModalState.buttonLeft,
			buttonRight: buttonRight ? buttonRight : prevModalState.buttonRight
		}));
		setModalVisibility(visibility);
	};
	return { modalState: { ...modalProperties, visibility: modalVisibility }, toggleModal };
};

const Modal = ({ visibility = false, content = '', title, buttonLeft, buttonRight, closeHandler }) => (
	<Dialog
		open={visibility}
		TransitionComponent={Transition}
		keepMounted
		onClose={closeHandler}
		aria-labelledby="alert-dialog-slide-title"
		aria-describedby="alert-dialog-slide-description">
		{title && <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>}
		<DialogContent>{content}</DialogContent>
		<DialogActions>
			<Button onClick={buttonLeft.action} color="primary">
				{buttonLeft.text}
			</Button>
			<Button onClick={buttonRight.action} color="primary">
				{buttonRight.text}
			</Button>
		</DialogActions>
	</Dialog>
);

export default Modal;
