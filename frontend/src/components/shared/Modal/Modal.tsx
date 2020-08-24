import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';

const Transition = React.forwardRef(function Transition(props: TransitionProps & { children?: React.ReactElement<any, any> }, ref: React.Ref<unknown>) {
	return <Slide direction="up" ref={ref} {...props} />;
});

interface Button {
	action: () => void;
	text: string;
}

interface BaseModal {
	title?: string | null;
	content?: string | JSX.Element;
}

interface ModalProps extends BaseModal {
	buttonRight: Button;
	buttonLeft: Button;
}
interface ToggleModalProps extends BaseModal {
	visibility: boolean;
	buttonRight?: Button;
	buttonLeft?: Button;
}
interface ModalComponentProps extends ModalProps {
	closeHandler: () => void;
	visibility: boolean;
}
export const useModal = (defaultContent: string = '') => {
	const [modalVisibility, setModalVisibility] = useState(false);
	const [modalProperties, setModalProperties] = useState<ModalProps>({
		title: null,
		content: defaultContent,
		buttonLeft: {
			text: 'Cancel',
			action: () => setModalVisibility(false),
		},
		buttonRight: {
			text: 'Ok',
			action: () => setModalVisibility(false),
		},
	});

	const toggleModal = ({ visibility, content, buttonRight, buttonLeft, title }: ToggleModalProps) => {
		setModalProperties((prevModalState) => ({
			title,
			content,
			buttonLeft: buttonLeft ? buttonLeft : prevModalState.buttonLeft,
			buttonRight: buttonRight ? buttonRight : prevModalState.buttonRight,
		}));
		setModalVisibility(visibility);
	};
	return { modalState: { ...modalProperties, visibility: modalVisibility }, toggleModal };
};

const Modal: React.FC<ModalComponentProps> = ({ visibility = false, content = '', title, buttonLeft, buttonRight, closeHandler }) => (
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
