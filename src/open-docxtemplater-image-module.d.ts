declare module "open-docxtemplater-image-module" {
  interface Option {
    centered: boolean;
    fileType: "docx" | "pptx";
    getImage: (tagValue: ImageInput, tagName: string) => ArrayBuffer;
    getSize: (
      img: ArrayBuffer,
      tagValue: ImageInput,
      tagName: string
    ) => [number, number];
  }
  export default class ImageModule {
    constructor(opts: Option);
  }
}
