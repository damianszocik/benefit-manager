import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { SystemContext } from 'contexts/System';
import Topbar from './Topbar/Topbar';
import ProgressStepper from './ProgressStepper/ProgressStepper';
import MobileDrawer from './MobileDrawer/MobileDrawer';
import Loader from 'components/shared/Loader/Loader';

const Main = styled.main`
	padding: ${({ theme }) => theme.spacing(11, 3, 3, 3)};
`;

const Article = styled.article`
	display: flex;
	align-items: center;
	position: relative;
`;

const Section = styled.section`
	flex-grow: 1;
	flex-basis: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: ${({ mobile }) => (mobile ? 'flex-start' : 'center')};
	max-height: 100%;
`;

const DesktopStepperWrapper = styled.aside`
	display: flex;
	align-items: center;
	margin-right: ${({ theme }) => theme.spacing(3)}px;
`;

const Layout = ({ mobile, children }) => {
	const { currentStep, loading } = useContext(SystemContext);
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
				<Section mobile={mobile}>{children}</Section>
				<Loader show={loading} />
			</Article>
		</Main>
	);
};

export default Layout;
