const parseResponseError = error => {
	let errorMessage;
	try {
		const parsedResponse = JSON.parse(error.request.response);
		errorMessage = parsedResponse.message[0].messages[0].message;
	} catch (error) {
		errorMessage = 'Something went wrong';
	}
	return errorMessage;
};

export default parseResponseError;
