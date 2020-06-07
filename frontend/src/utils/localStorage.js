export const setStoredItem = (name, value) => localStorage.setItem(name, JSON.stringify(value));

export const getStoredItem = name => {
	try {
		return JSON.parse(localStorage.getItem(name));
	} catch (error) {
		console.error(error);
		return null;
	}
};
