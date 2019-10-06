const Helper = {

  returnresponse(response, status, message, data = undefined) {
    const res = {
      message,
      status,
    };
    if (data !== undefined) {
      res.data = data;
    }
    return response.status(status).send(res);
  },
};
export default Helper;
