import { useState } from "react";
import { formatID, parseDateInput } from "./date";
import {
  b64toBlob,
  download,
  fileToImage,
  fillContent,
  isEmpty,
  padLeft,
  title,
} from "./content";
import { terbilang } from "./terbilang";
import { usePanwasData } from "@/context/DataContext";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import ImageModule from "open-docxtemplater-image-module";

export const useFormA = () => {
  const { data } = usePanwasData(false);
  const [withPelanggaran, setWithPelanggaran] = useState(false);
  const [lastUraian, setLastUraian] = useState("");

  const [value, setValue] = useState<FormAValue>({
    desa: "",
    urut: "",
    tahapan: "",
    surat_tugas: "",
    bentuk: "",
    tujuan: "",
    sasaran: "",
    tanggal: "",
    jam_awal: "",
    jam_akhir: "",
    tempat: "",
    uraian: "",
    peristiwa_pelanggaran: "",
    tempat_pelanggaran: "",
    waktu_pelanggaran: "",
    nama_pelaku_pelanggaran: "",
    alamat_pelaku_pelanggaran: "",
    nama_saksi_pelanggaran: "",
    alamat_saksi_pelanggaran: "",
    alat_bukti_pelanggaran: "",
    barang_bukti_pelanggaran: "",
    uraian_pelanggaran: "",
    keterangan_pelanggaran: "",
    analisa: "",
    tanggal_buat: "",
    dokumentasi: null,
    ttd: null,
  });
  const [extension, setExtension] = useState<FormAExtension>({});

  const setValues = (values: Partial<FormAValue>) => {
    setValue((val) => ({ ...val, ...values }));
  };

  function setOptions<
    O extends Partial<FormAExtension> = Pick<FormAExtension, "desa" | "tahapan">
  >(options: O) {
    const values: { [Property in keyof O]?: string } = {};
    for (const key in options) {
      values[key] = (options[key] as any).code || (options[key] as any).name;
    }
    setValues(values);
    setExtension((val) => ({ ...val, ...options }));
  }

  function setOption<K extends keyof FormAExtension>(
    key: K,
    value: string,
    option: FormAExtension[K]
  ) {
    setValue((val) => ({ ...val, [key]: value }));
    setExtension((val) => ({ ...val, [key]: option }));
  }

  const setString = (key: keyof FormAValue, value: string) => {
    setValue((val) => ({ ...val, [key]: value }));
  };

  const setDokumentasi = (value: FileList | null) => {
    let dokumentasi: File[] = [];
    if (value) {
      for (let i = 0; i < Math.min(value.length, 2); i++) {
        const file = value.item(i);
        if (file) dokumentasi.push(file);
      }
    }
    setValue((val) => ({ ...val, dokumentasi }));
  };

  const setTTD = (value: FileList | null) => {
    if (value && value.length > 0) {
      setValue((val) => ({ ...val, ttd: value[0] }));
      return;
    }
    setValue((val) => ({ ...val, ttd: null }));
  };

  const genContentParam = () => {
    const tanggal = parseDateInput(value.tanggal);
    return {
      ...value,
      dokumentasi: "",
      ttd: "",
      desa: title(extension.desa?.name || ""),
      tahapan: extension.tahapan?.name || "",
      hari: formatID(tanggal, "EEEE"),
      tanggal_terbilang: title(terbilang(tanggal.getDate())),
      nama_bulan: formatID(tanggal, "MMMM"),
      tahun_terbilang: title(terbilang(tanggal.getFullYear())),
    };
  };

  const genUraian = () => {
    if (
      isEmpty(
        value.desa,
        value.tahapan,
        value.bentuk,
        value.tujuan,
        value.sasaran,
        value.tanggal,
        value.tempat
      )
    )
      return;

    const param = genContentParam();
    const uraian = fillContent(data.db.template_uraian, param);

    setValue((value) => {
      if (value.uraian.indexOf(lastUraian) > -1) {
        return { ...value, uraian: value.uraian.replace(lastUraian, uraian) };
      } else if (value.uraian != uraian) {
        return { ...value, uraian: uraian + "\n\n" + value.uraian };
      } else if (value.uraian == "") {
        return { ...value, uraian };
      }

      return value;
    });

    setLastUraian(uraian);
  };

  const genAnalisa = () => {
    if (
      isEmpty(
        value.desa,
        value.tahapan,
        value.bentuk,
        value.tujuan,
        value.sasaran,
        value.tanggal,
        value.tempat
      )
    )
      return;

    const template = withPelanggaran
      ? data.db.template_analisa_pelanggaran
      : data.db.template_analisa_lancar;
    setString("analisa", fillContent(template, genContentParam()));
  };

  const genNomorDoc = (urut: number | string, desa: string, tanggal: Date) => {
    return `${padLeft(urut, 3)}/LHP/PM.01.02/JI.${desa}/${formatID(
      tanggal,
      "dd/MM/yyyy"
    )}`;
  };

  const genFormA = () => {
    fetch("/template/form-a.docx")
      .then((res) => res.arrayBuffer())
      .then(async (buf) => {
        const zip = new PizZip(buf);
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
            }),
          ],
        });
        const tanggal = parseDateInput(value.tanggal);
        const nomor = genNomorDoc(value.urut, value.desa, tanggal);
        const ttd = value.ttd ? await fileToImage(value.ttd) : "";
        const dokumentasi = await Promise.all(
          (value.dokumentasi || []).map((d) => fileToImage(d))
        );

        const data = {
          nomor,
          tahapan: value.tahapan,
          petugas: extension.desa?.petugas || "",
          desa: title(extension.desa?.name || ""),
          st: extension.tahapan?.st || "-",
          alamat_petugas: extension.desa?.alamat_petugas || "",
          bentuk: value.bentuk,
          tujuan: value.tujuan,
          sasaran: value.sasaran,
          hari: formatID(tanggal, "EEEE"),
          tanggal: formatID(tanggal, "dd MMMM yyyy"),
          jam_awal: value.jam_awal,
          jam_akhir: value.jam_akhir,
          tempat: value.tempat,
          uraian: value.uraian,
          peristiwa_pelanggaran: value.peristiwa_pelanggaran || "-",
          tempat_pelanggaran: value.tempat_pelanggaran || "-",
          waktu_pelanggaran: value.waktu_pelanggaran || "-",
          nama_pelaku_pelanggaran: value.nama_pelaku_pelanggaran || "-",
          alamat_pelaku_pelanggaran: value.alamat_pelaku_pelanggaran || "-",
          nama_saksi_pelanggaran: value.nama_saksi_pelanggaran || "-",
          alamat_saksi_pelanggaran: value.alamat_saksi_pelanggaran || "-",
          alat_bukti_pelanggaran: value.alat_bukti_pelanggaran || "-",
          barang_bukti_pelanggaran: value.barang_bukti_pelanggaran || "-",
          uraian_pelanggaran: value.uraian_pelanggaran || "-",
          keterangan_pelanggaran: value.keterangan_pelanggaran || "-",
          analisa: value.analisa,
          tanggal_buat: formatID(
            parseDateInput(value.tanggal_buat),
            "dd MMMM yyyy"
          ),
          ttd,
          dokumentasi,
        };
        doc.render(data);
        const base64 = doc
          .getZip()
          .generate({ type: "base64", compression: "DEFLATE" });
        const blob = b64toBlob(
          base64,
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        );
        download(blob, `${nomor.replaceAll("/", "-")}.docx`);
      });
  };

  return {
    value,
    extension,
    withPelanggaran,
    setString,
    setDokumentasi,
    setTTD,
    setOption,
    setOptions,
    setValues,
    setWithPelanggaran,
    genUraian,
    genAnalisa,
    genFormA,
  };
};
