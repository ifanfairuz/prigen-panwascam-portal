export const fillContent = (text: string, data: Record<string, string>) =>
  Object.keys(data).reduce(
    (t, key) => t.replaceAll(`{${key}}`, data[key]),
    text
  );

export const isEmpty = (...s: string[]) => {
  return s.findIndex((s) => !s || s === "") > -1;
};
export const capitalize = (s: string) =>
  s.charAt(0).toUpperCase() + s.substring(1).toLowerCase();
export const title = (s: string) => s.split(" ").map(capitalize).join(" ");

export const padLeft = (
  number: number | string,
  count: number,
  text: string = "0"
) => {
  return text.repeat(count - number.toString().length) + number;
};

export const b64toBlob = (
  b64Data: string,
  contentType = "",
  sliceSize = 512
) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

export const download = (blob: Blob, filename: string) => {
  if (typeof (window.navigator as any).msSaveBlob !== "undefined") {
    // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
    (window.navigator as any).msSaveBlob(blob, filename);
  } else {
    var URL = (<any>window).URL || (<any>window).webkitURL;
    var downloadUrl = URL.createObjectURL(blob);

    if (filename) {
      // use HTML5 a[download] attribute to specify filename
      var a: any = document.createElement("a");
      // safari doesn't support this yet
      if (typeof a.download === "undefined") {
        window.location = downloadUrl;
      } else {
        a.href = downloadUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
      }
    } else {
      window.location = downloadUrl;
    }

    setTimeout(() => {
      URL.revokeObjectURL(downloadUrl);
    }, 100); // cleanup
  }
};

export const fileToImage = (file: File) =>
  new Promise<ImageInput>((res, rej) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      let img = new Image();
      var uri = window.URL.createObjectURL(file);
      img.onload = function () {
        res({
          buf: reader.result as ArrayBuffer,
          size: [img.width, img.height],
        });
        window.URL.revokeObjectURL(uri);
      };
      img.src = uri;
    };
    reader.onerror = (err) => rej(err);
    reader.readAsArrayBuffer(file);
  });
