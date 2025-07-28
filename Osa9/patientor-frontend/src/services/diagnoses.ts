import axios from "axios";
//import { Entry} from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get(
    `${apiBaseUrl}/diagnoses`
  );

  return data;
};


export default {
  getAll, 
};
