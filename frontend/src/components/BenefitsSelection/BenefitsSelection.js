import React, { useState, useEffect, useContext } from 'react';
import { SystemContext } from 'contexts/System';
import parseResponseError from 'utils/parseResponseError';
import axios from 'axios';
import { BENEFITS } from 'constants/apiEndpoints';

const BenefitsSelection = () => {
	const {
		toggleLoading,
		globalToast: { toggleToast }
	} = useContext(SystemContext);
	const [availableBenefits, setAvailableBenefits] = useState([]);
	const getBenefits = async () => {
		toggleLoading(true);
		try {
			const { data: fetchedBenefits } = await axios.get(BENEFITS);
			setAvailableBenefits([...fetchedBenefits]);
		} catch (error) {
			toggleToast(true, parseResponseError(error), 'error');
		}
		toggleLoading(false);
	};
	useEffect(() => {
		getBenefits();
	}, []);
	return (
		<div>
			{availableBenefits.map(benefit => (
				<div key={benefit.id}>{benefit.name}</div>
			))}
		</div>
	);
};

export default BenefitsSelection;
