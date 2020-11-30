const fs = require("fs");
const axios = require("axios");

exports.avatartDownloadPromise = async (uri, filename) => {
  return axios({
    method: "get",
    url: uri,
    responseType: "stream",
  })
    .then((res) => {
      res.data.pipe(fs.createWriteStream(filename));
      return filename.replace("/public", "");
    })
    .catch(() => `http://localhost:${process.env.PORT}/images/defAvatars.svg`);
};
