import { useLocation } from 'react-router-dom';

export const useQueryParams = () => {
	const { search } = useLocation();

	const replaceFirstCharacter = search.replace('?', '');
	return replaceFirstCharacter;
};
