import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { spacing, palette } from '@material-ui/system';
import { BoxProps } from '@material-ui/core/Box';
import { TypographyProps } from '@material-ui/core/Typography';

type SystemStyledTypographyProps = TypographyProps &
	BoxProps & {
		clickable?: boolean;
	};

export const SystemStyledTypography = styled(Typography)<SystemStyledTypographyProps>`
    ${spacing}${palette};
    cursor: ${({ clickable = false }) => (clickable ? 'pointer' : 'default')}

    
`;
