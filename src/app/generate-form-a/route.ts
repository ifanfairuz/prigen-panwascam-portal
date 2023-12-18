import Docxtemplater from "docxtemplater";
import { readFileSync } from "fs";
import PizZip from "pizzip";
import ImageModule from "@/image-module";
import { NextResponse } from "next/server";
import { convert } from "libreoffice-convert";

const parseBody = async (req: Request) => {
  const form = await req.formData();
  let param = Object.fromEntries(form.entries()) as any as GenerateParam<
    File,
    [number, number]
  >;
  param.dokumentasi = form.getAll("dokumentasi") as File[];
  param.ttd_size = param.ttd
    ? JSON.parse(param.ttd_size as any as string)
    : undefined;
  param.dokumentasi_size = param.dokumentasi
    ? JSON.parse(param.dokumentasi_size as any as string)
    : undefined;
  return param;
};

const toImageInput = async (image: File, size: ImageInput["size"]) =>
  ({
    buf: await image.arrayBuffer(),
    size,
  } as ImageInput);

const convertToPDF = (file: Buffer) =>
  new Promise<Buffer>((resolve, reject) => {
    convert(file, ".pdf", undefined, (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      return resolve(data);
    });
  });

export async function POST(req: Request) {
  const { type, dokumentasi, dokumentasi_size, ttd, ttd_size, ...body } =
    await parseBody(req);
  const param: RenderParam = {
    ...body,
    dokumentasi: await Promise.all(
      (dokumentasi || []).map((d, i) => toImageInput(d, dokumentasi_size![i]))
    ),
    ttd: ttd ? await toImageInput(ttd, ttd_size!) : undefined,
  };
  const template = readFileSync("form-a.docx");
  const zip = new PizZip(template);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    modules: [
      new ImageModule({
        centered: false,
        fileType: "docx",
        getImage(value, name) {
          return value.buf;
        },
        getSize(img, value, name) {
          return name == "ttd"
            ? [(value.size[0] / value.size[1]) * 70, 70]
            : [500, (value.size[1] / value.size[0]) * 500];
        },
      } as ImageModuleOption) as any,
    ],
  });

  const mime =
    type == "docx"
      ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      : "application/pdf";
  const ext = type == "docx" ? "docx" : "pdf";
  doc.render(param);
  let file = doc
    .getZip()
    .generate({ type: "nodebuffer", compression: "DEFLATE", mimeType: mime });

  const headers = new Headers();
  headers.set("Content-Type", mime);
  headers.set("Content-Length", Buffer.byteLength(file).toString());
  headers.set(
    "Content-Disposition",
    `attachment; filename="${param.nomor.replaceAll("/", "-")}.${ext}"`
  );

  if (type == "pdf") {
    file = await convertToPDF(file);
    headers.set("Content-Length", Buffer.byteLength(file).toString());
    return new NextResponse(file, { status: 200, statusText: "OK", headers });
  }

  return new NextResponse(file, { status: 200, statusText: "OK", headers });
}
