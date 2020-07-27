import axios from "axios";
const baseUrl = "http://localhost:3001/api/";
const baseUrlDays = "http://nolaborables.com.ar/api/v2/feriados/2016";
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

export const request = async (method = "get", url, data = null) => {
  try {
    const response = await axios({
      url: `${baseUrl}${url}`,
      method,
      headers,
      data: JSON.stringify(data),
    });

    return { success: true, data: response.data };
  } catch (err) {
    var msg = "Ocurrio un error, intente de nuevo mas tarde";

    return { success: false, error: err, msg };
  }
};

export const loadDays = async () => {
  try {
    const response = await axios({
      url: baseUrlDays,
      method: "get",
      headers,
    });

    return { success: true, data: response.data };
  } catch (err) {
    var msg = "Ocurrio un error, intente de nuevo mas tarde";

    return { success: false, error: err, msg };
  }
};

export default { request, loadDays };
