import React from 'react';
import MaskedInput from 'react-text-mask';
import styled from 'styled-components';
import { Input, InputLabel, FormControl } from '@material-ui/core';

const StyledInput = styled(Input)`
	input {
		letter-spacing: 1em;
	}
`;

const generateMap = () => {
	const map: Array<string | RegExp> = ['•', '•', '•', '•', '•', '•', '•', '•', '•', '•', '•'];
	let numberCounter = 0;
	while (numberCounter < 3) {
		const proposalIndex = Math.floor(Math.random() * 12);
		if (map[proposalIndex] === '•') {
			map[proposalIndex] = /\d/;
			numberCounter++;
		}
	}
	return map;
};

const TextMaskCustom: React.ElementType<{ inputRef: (instance: MaskedInput | HTMLElement | null) => void }> = (props) => {
	const [inputMap] = React.useState(generateMap());
	const { inputRef, ...other } = props;

	return (
		<MaskedInput
			{...other}
			ref={(ref) => {
				inputRef(ref ? ref.inputElement : null);
			}}
			mask={inputMap}
			showMask
			keepCharPositions
		/>
	);
};

const PeselInput: React.FC<{}> = () => {
	return (
		<FormControl fullWidth>
			<InputLabel htmlFor="pesel">PESEL</InputLabel>
			<StyledInput name="pesel" inputComponent={TextMaskCustom as any} />
		</FormControl>
	);
};

export default PeselInput;
