import React, { useContext } from 'react';
import styled from 'styled-components';
import { SystemContext } from 'contexts/System';
import Topbar from './Topbar/Topbar';
import ProgressStepper from './ProgressStepper/ProgressStepper';
import MobileDrawer from './MobileDrawer/MobileDrawer';

const Main = styled.main`
	padding: ${({ theme }) => theme.spacing(11, 3, 3, 3)};
`;

const Article = styled.article`
	display: flex;
`;

const Section = styled.section`
	flex-grow: 1;
	flex-basis: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
`;

const DesktopStepperWrapper = styled.aside`
	display: flex;
	align-items: center;
`;

const Layout = ({ mobile, children }) => {
	const { currentStep } = useContext(SystemContext);
	return (
		<Main>
			<Topbar />
			{mobile && <MobileDrawer />}
			<Article>
				{!mobile && (
					<DesktopStepperWrapper>
						<ProgressStepper step={currentStep} />
					</DesktopStepperWrapper>
				)}
				<Section>{children}</Section>
			</Article>
		</Main>
	);
};

export default Layout;
