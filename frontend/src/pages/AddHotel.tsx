import { useMutation } from 'react-query';
import ManageHotelForm from '../contexts/forms/manageHotelForms/ManageHotelForm';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext';

const AddHotel = () => {
  const {showToast} = useAppContext()
  const {mutate, isLoading} = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      showToast({message: "Hotel Saved", type: "SUCCESS"})
    },
    onError: () => {
      showToast({message: "error saving hotel!", type: "ERROR"})
    },
  });

  const handleSave = (hotelFormData: FormData)=> {
    mutate(hotelFormData);
  };
  
  return <ManageHotelForm onSave={handleSave} isLoading={isLoading}/>;
}

export default AddHotel