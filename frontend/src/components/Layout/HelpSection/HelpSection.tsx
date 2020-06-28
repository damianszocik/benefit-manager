import React from 'react';
import { Typography } from '@material-ui/core';
import { PanToolOutlined as HandIcon } from '@material-ui/icons';
import styled from 'styled-components';

const HelpSection: React.FC<{}> = () => (
	<HelpSectionStyles>
		<HandIcon color="inherit" fontSize="large" />
		<div>
			<Typography noWrap variant="subtitle1">
				Need a helping hand?
			</Typography>
			<Typography variant="subtitle2">
				Mail us at: <strong>hrdepartment@pks.pl</strong> or call <strong>+48 123 321 432</strong>
			</Typography>
		</div>
	</HelpSectionStyles>
);

export const HelpSectionStyles = styled.div`
	display: flex;
	align-items: center;
	color: ${(props) => props.theme.palette.grey[500]};
	svg {
		margin-right: ${(props) => props.theme.spacing(1)}px;
	}
	strong {
		font-weight: 400;
	}
`;

export default HelpSection;
