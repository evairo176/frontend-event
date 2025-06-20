export const errorCallback = (error: any) => {
  let message = "Something went wrong";

  // Axios error?
  if (error.response && error.response.data) {
    message = error.response.data.message || message;
  }

  return message;
};

export const successCallback = (response: any) => {
  const message = response?.data?.message ?? "successfully!";

  return message;
};
