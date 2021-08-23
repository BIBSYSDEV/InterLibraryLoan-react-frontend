import Axios from "axios";
import {setAxiosDefaults} from "../utils/axios-config";
import {API_PATHS} from "../utils/constants";

setAxiosDefaults();

export const getMetadata = (id: string) => {
    return Axios({
        url: encodeURI(API_PATHS.metadataPath),
        method: 'POST',
        data: encodeURI(
            `identifier=${id}`
        ),
    });

};
