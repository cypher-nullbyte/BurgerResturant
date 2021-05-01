import Axios from "axios";
import env from "react-dotenv";


const instance=Axios.create({
    baseURL:env.FIREBASE,
});

export default instance;