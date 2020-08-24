import React, { useState, useEffect, useContext } from 'react';
import { SystemContext } from 'contexts/System';
import parseResponseError from 'utils/parseResponseError';
import axios from 'axios';
import { BENEFITS } from 'constants/apiEndpoints';

interface Benefit {
	id: string;
	name: string;
}

const BenefitsSelection: React.FC<{}> = () => {
	const {
		toggleLoading,
		globalToast: { toggleToast },
	} = useContext(SystemContext);
	const [availableBenefits, setAvailableBenefits] = useState<Benefit[]>([]);
	const getBenefits = async () => {
		toggleLoading(true);
		try {
			const { data: fetchedBenefits } = await axios.get(BENEFITS);
			setAvailableBenefits(fetchedBenefits);
		} catch (error) {
			toggleToast(true, parseResponseError(error), 'error');
		}
		toggleLoading(false);
	};
	useEffect(() => {
		getBenefits();
	}, []);
	return <div>{availableBenefits.length && availableBenefits.map((benefit) => <div key={benefit.id}>{benefit.name}</div>)}</div>;
};

export default BenefitsSelection;
