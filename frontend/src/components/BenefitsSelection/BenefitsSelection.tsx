import React, { useState, useEffect, useCallback } from 'react';
import parseResponseError from 'utils/parseResponseError';
import { SystemStyledTypography } from 'components/shared/SystemStyledTypography/SystemStyledTypography';
import { Box, Button } from '@material-ui/core';
import { ArrowForward as ArrowForwardIcon } from '@material-ui/icons';
import BenefitAccordion from './BenefitAccordion';
import { useSystemContext, User } from 'contexts/System';
import axios from 'axios';
import { AVAILABLE_BENEFITS, USERS_BENEFITS, UPDATE_USER } from 'constants/apiEndpoints';

export type Benefit = {
	id: number;
	name: string;
	description: string;
	points: number;
};

const BenefitsSelection: React.FC<{}> = () => {
	const {
		toggleLoading,
		globalToast: { toggleToast },
		user,
		setUser,
	} = useSystemContext();
	const [availableBenefits, setAvailableBenefits] = useState<Benefit[]>([]);
	const [usersBenefits, setUsersBenefits] = useState<Benefit[]>([]);
	const getAvailableBenefits = async () => {
		toggleLoading(true);
		try {
			const { data: fetchedBenefits } = await axios.get(AVAILABLE_BENEFITS);
			setAvailableBenefits(fetchedBenefits);
		} catch (error) {
			toggleToast(true, parseResponseError(error), 'error');
		}
		toggleLoading(false);
	};
	const getUsersBenefits = async (userId: number) => {
		toggleLoading(true);
		try {
			const { data: fetchedBenefits } = await axios.get(USERS_BENEFITS(userId));
			setUsersBenefits(fetchedBenefits);
		} catch (error) {
			toggleToast(true, parseResponseError(error), 'error');
		}
		toggleLoading(false);
	};

	const toggleBenefitSelect = (id: number) => {
		const selectedBenefit = availableBenefits.find((benefit) => benefit.id === id);
		const usersAvailablePoints = (user as User).availablePoints;
		if (selectedBenefit) {
			if (isUserBenefit(id)) {
				setUsersBenefits((prevBenefits) => prevBenefits.filter((benefit) => benefit.id !== id));
				setUser({ ...user, availablePoints: usersAvailablePoints + selectedBenefit.points });
			} else {
				if (usersAvailablePoints > selectedBenefit.points) {
					setUsersBenefits((prevBenefits) => [...prevBenefits, selectedBenefit]);
					setUser({ ...user, availablePoints: usersAvailablePoints - selectedBenefit.points });
				}
			}
		}
	};

	const saveSlectedUserBenefits = async () => {
		if ('id' in user) {
			toggleLoading(true);
			try {
				const { data: userData }: { data: User } = await axios.put(UPDATE_USER(user.id), {
					benefits: usersBenefits.map((benefit) => benefit.id),
					//move this logic to the backend side for savety reasons
					availablePoints: user.availablePoints,
				});
				setUser(userData);
			} catch (error) {
				toggleToast(true, parseResponseError(error), 'error');
				return;
			}
			toggleLoading(false);
		}
	};

	const isUserBenefit = useCallback(
		(id: number) => {
			return usersBenefits.some((availableBenefit) => availableBenefit.id === id);
		},
		[usersBenefits, availableBenefits]
	);

	useEffect(() => {
		getAvailableBenefits();
		if ('id' in user) {
			getUsersBenefits(user.id);
		}
	}, []);
	if ('availablePoints' in user) {
		return (
			<>
				<SystemStyledTypography variant="h5" component="h2" my={2}>
					Step 3
				</SystemStyledTypography>
				<SystemStyledTypography variant="h4" component="h1" color="textPrimary" my={2}>
					Choose your benefits
				</SystemStyledTypography>
				<SystemStyledTypography variant="body1" component="p" color="textSecondary" my={2}>
					There’s finest selection of perks available in our company. You have 10 points to spend.
				</SystemStyledTypography>
				<SystemStyledTypography variant="body1" component="p" color="textSecondary" my={2}>
					{user.availablePoints} points still available
				</SystemStyledTypography>
				<Box width="100%" p={1} overflow="auto">
					{availableBenefits.map((benefit) => (
						<BenefitAccordion
							benefit={benefit}
							key={benefit.id}
							onCheck={toggleBenefitSelect}
							selected={isUserBenefit(benefit.id)}
						/>
					))}
				</Box>
				<Box display="flex" justifyContent="flex-start" flexWrap="nowrap" my={2}>
					<Button
						disabled={false}
						onClick={saveSlectedUserBenefits}
						variant="contained"
						color="primary"
						endIcon={<ArrowForwardIcon />}>
						Next
					</Button>
				</Box>
			</>
		);
	} else {
		return null;
	}
};

export default BenefitsSelection;
