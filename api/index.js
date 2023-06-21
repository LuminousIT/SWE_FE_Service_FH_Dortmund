export const postRequest = async (url, payload) => {
  try {
    const result = fetch(`http://localhost:8081/api${url}`, {
      body: JSON.stringify(payload),
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        return res;
      });

    return result;
  } catch (error) {
    return { status: 0, message: error.message };
  }
};

export const getUserRequest = async (url) => {
  try {
    const result = fetch(`http://localhost:8081/api${url}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        return res;
      });

    return result;
  } catch (error) {
    return { status: 0, message: error.message };
  }
};

export const getVehicleRequest = async (url) => {
  try {
    const result = fetch(`http://localhost:8081/api${url}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        return res;
      });

    return result;
  } catch (error) {
    return { status: 0, message: error.message };
  }
};

export const postVehicleRequest = async (url, payload) => {
  try {
    const result = fetch(`http://localhost:8081/api${url}`, {
      body: JSON.stringify(payload),
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        return res;
      });

    return result;
  } catch (error) {
    return { status: 0, message: error.message };
  }
};

export const getWeatherForecastRequest = async (url, location) => {
  console.log(location);
  if (!location.latitude) return;
  try {
    const result = fetch(
      `http://localhost:8086${url}/${location.latitude}/${location.longitude}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        return res;
      });

    return result;
  } catch (error) {
    return { status: 0, message: error.message };
  }
};
