const downloadResponseFile = (response, fileName, type) => {
  const url = window.URL.createObjectURL(
    new Blob([response.data], {
      type,
    })
  );
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
};
export default downloadResponseFile;
