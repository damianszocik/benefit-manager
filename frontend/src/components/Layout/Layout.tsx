import React, { useContext } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { SystemContext } from 'contexts/System';
import Topbar from './Topbar/Topbar';
import ProgressStepper from './ProgressStepper/ProgressStepper';
import MobileDrawer from './MobileDrawer/MobileDrawer';
import StepBackground from './StepBackground/StepBackground';
import Loader from 'components/shared/Loader/Loader';

interface LayoutProps {
	mobile: boolean;
}

const Main = styled.main`
	padding: ${({ theme }) => theme.spacing(11, 3, 3, 3)};
	display: flex;
	justify-content: center;
`;

const Article = styled.article<{ lockScrolling: boolean }>`
	display: flex;
	align-items: center;
	width: 100%;
	max-width: ${({ theme }) => theme.breakpoints.values.xl}px;
	position: relative;
	overflow: ${({ lockScrolling }) => (lockScrolling ? 'hidden' : 'initial')};
`;

const Section = styled(motion.section)<LayoutProps>`
	flex-grow: 1;
	flex-basis: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: ${({ mobile }) => (mobile ? 'flex-start' : 'center')};
	max-height: 100%;
	max-width: 1280px;
	margin-right: ${({ mobile }) => (mobile ? 0 : '-60px')};
`;

const DesktopStepperWrapper = styled.aside`
	display: flex;
	align-items: center;
	margin-right: ${({ theme }) => theme.spacing(3)}px;
`;

const Layout: React.FC<LayoutProps> = ({ mobile, children }) => {
	const { currentStep, loading, lockLayoutScrolling } = useContext(SystemContext);
	return (
		<Main>
			<Topbar />
			{mobile && <MobileDrawer />}
			<Article lockScrolling={lockLayoutScrolling}>
				{!mobile && (
					<DesktopStepperWrapper>
						<ProgressStepper step={currentStep} />
					</DesktopStepperWrapper>
				)}
				<AnimatePresence exitBeforeEnter>
					<Section key={currentStep} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} mobile={mobile}>
						{children}
					</Section>
				</AnimatePresence>
				{!mobile && <StepBackground step={currentStep} />}
				<Loader show={loading} />
			</Article>
		</Main>
	);
};

export default Layout;
