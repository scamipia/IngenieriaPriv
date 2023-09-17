import API from "./API";
const URL = "http://localhost:8080/users/"


export const getUser = async () => {
  try {

    const responseData = await API.get(`${URL}profile`);
    return responseData
  
    } catch (error) {
        console.error("error en la autenticacion");
        throw error;
    }
};

const ProfileService = {
  getUser
};

export default ProfileService;
