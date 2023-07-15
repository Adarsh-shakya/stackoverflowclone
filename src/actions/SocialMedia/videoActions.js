import * as api from '../../api/index'

export const uploadVideo = (formData) => async (dispatch) => {
  try {
    dispatch({ type: 'VIDEO_UPLOAD_REQUEST' });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const { data } = await api.postVideo(formData, config)

    

    dispatch({ type: 'VIDEO_UPLOAD_SUCCESS' });

    // Handle the response as per your requirements
    console.log(data);
  } catch (error) {
    dispatch({ type: 'VIDEO_UPLOAD_FAILURE', payload: error.message });
    // Handle any errors that occurred during the upload process
    console.error(error);
  }
};
