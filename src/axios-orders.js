import Axios from "axios";

const instance=Axios.create({
    baseURL:"<URL TO REALTIME FIREBASE SERVER>",
});

export default instance;