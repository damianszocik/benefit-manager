import React from 'react';
import { Benefit } from './BenefitsSelection';
import { Accordion, FormControlLabel, Checkbox, AccordionSummary, AccordionDetails, Typography, Box } from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import styled from 'styled-components';

type BenefitAccordianProps = {
	benefit: Benefit;
	selected: boolean;
	onCheck: (id: number) => void;
};

type BenefitLabelProps = {
	name: Benefit['name'];
	points: Benefit['points'];
};
const BenefitLabel = ({ name, points }: BenefitLabelProps) => (
	<Box display="flex" alignItems="baseline" justifyContent="space-between">
		<Box mr={2}>
			<Typography variant="body1">{name}</Typography>
		</Box>
		<Typography color="textSecondary" variant="caption">
			{points} points
		</Typography>
	</Box>
);

const StyledAccordion = styled(Accordion)`
	background-color: ${({ theme }) => theme.palette.background.paper}9;
`;

export const BenefitAccordion = ({ benefit, selected, onCheck }: BenefitAccordianProps) => {
	return (
		<StyledAccordion>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-label="Expand"
				aria-controls="additional-actions1-content"
				id="additional-actions1-header">
				<FormControlLabel
					aria-label="Acknowledge"
					onClick={(event) => {
						event.stopPropagation();
						onCheck(benefit.id);
					}}
					onFocus={(event) => event.stopPropagation()}
					control={<Checkbox checked={selected} />}
					label={<BenefitLabel name={benefit.name} points={benefit.points} />}
				/>
			</AccordionSummary>
			<AccordionDetails>
				<Typography color="textSecondary">{benefit.description}</Typography>
			</AccordionDetails>
		</StyledAccordion>
	);
};

export default BenefitAccordion;
