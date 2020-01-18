import React, { useContext } from 'react';
import styled from 'styled-components';
import { SystemContext } from 'contexts/System';
import Topbar from './Topbar/Topbar';
import ProgressStepper from 'components/shared/ProgressStepper/ProgressStepper';
import MobileDrawer from './MobileDrawer/MobileDrawer';

const Main = styled.main`
	margin-top: ${({ theme }) => theme.spacing(8)}px;
`;

const Article = styled.article`
	display: flex;
`;

const Section = styled.section`
	flex-grow: 1;
	flex-basis: 100%;
	display: flex;
	align-items: center;
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
