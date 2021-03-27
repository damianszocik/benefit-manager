type parseResponseErrorProps = (error: any, fallbackErrorMessage?: string) => string;

const DEFAULT_ERROR_MESSAGE = 'Something went wrong';

const parseResponseError: parseResponseErrorProps = (error, fallbackErrorMessage = DEFAULT_ERROR_MESSAGE) => {
	let errorMessage;
	try {
		const parsedResponse = JSON.parse(error.request.response);
		errorMessage = parsedResponse?.message[0]?.messages[0]?.message || fallbackErrorMessage;
	} catch (error) {
		errorMessage = DEFAULT_ERROR_MESSAGE;
	}
	return errorMessage;
};

export default parseResponseError;
