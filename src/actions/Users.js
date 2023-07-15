import * as api from '../api'



export const fetchAllUsers = () => async (dispatch) => {
    try {
        const { data } = await api.fetchAllUsers()
        dispatch({ type: 'FETCH_USERS', payload: data})
    } catch (error) {
        console.log(error)
    }
}
export const updateProfile = (id, updateData) => async (dispatch) => {
    try{
        const { data } = await api.updateProfile(id, updateData)
        dispatch({ type: 'UPDATE_CURRENT_USER', payload: data })
        dispatch(fetchAllUsers())
        
    }catch(error){
        console.log(error)
    }
}



export const getCurrentUser = async (userId) => {
    try {
      // Make an API request to fetch the user data by ID
      const response = await api.getCurrentUser(userId);
      return response.data;
    } catch (error) {
      // Handle the error or throw it to the calling code
      throw new Error(error.message);
    }
  };







  
  