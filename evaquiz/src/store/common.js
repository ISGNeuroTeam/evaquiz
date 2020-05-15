const getNameAndFormat = fileUrl => {
  let _startIndex = fileUrl.indexOf("/", 1);
  let _fileReverse = fileUrl
    .slice(_startIndex + 1)
    .split("")
    .reverse()
    .join("");

  _startIndex = _fileReverse.indexOf(".", 1);

  let file = {};

  file.format = _fileReverse
    .slice(0, _startIndex)
    .split("")
    .reverse()
    .join("");

  file.name = _fileReverse
    .slice(_startIndex + 1)
    .split("")
    .reverse()
    .join("");

  return file;
};

const download = (file, response) => {
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.setAttribute("download", file.name + "." + file.format);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export default {
  getNameAndFormat,
  download
};
