import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import PlaceList from '../components/PlaceList';
import { useHttpClient } from '../../shared/hooks/http-hook';

const UserPlaces = () => {
	const [loadedPlaces, setLoadedPlaces] = useState();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const userId = useParams().userId;
	console.log('useParams', useParams());
	useEffect(() => {
		const fetchPlaces = async () => {
			try {
            const responseData = await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
				setLoadedPlaces(responseData.places);
			} catch (err) {
				console.log(err);
			}
		};
		fetchPlaces();
	}, [sendRequest, userId]);
   console.log('loadedPlaces',loadedPlaces);
	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && (
				<div className='center'>
					<LoadingSpinner />
				</div>
			)}
			{!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} />}
		</>
	);
};

export default UserPlaces;
