interface setItemProps {
	(name: string, value: object): void;
}
interface getItemProps {
	(name: string): object | null;
}

export const setStoredItem: setItemProps = (name, value) => localStorage.setItem(name, JSON.stringify(value));

export const getStoredItem: getItemProps = (name): object | null => {
	try {
		return JSON.parse(localStorage.getItem(name) as string);
	} catch (error) {
		console.error(error);
		return null;
	}
};
