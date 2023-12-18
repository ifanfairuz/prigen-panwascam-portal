import { useState } from "react";
import { formatID, parseDateInput } from "./date";
import {
  download,
  fileToImage,
  fillContent,
  isEmpty,
  objectToFormData,
  padLeft,
  title,
} from "./content";
import { terbilang } from "./terbilang";
import { usePanwasData } from "@/context/DataContext";

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

  const getValPelanggaran = (
    key: keyof Omit<FormAValue, "dokumentasi" | "ttd">
  ) => {
    return withPelanggaran ? value[key] || "-" : "-";
  };

  const genFormA = async (type: DocType) => {
    const mustCheck = [
      "desa",
      "urut",
      "tahapan",
      "surat_tugas",
      "bentuk",
      "tujuan",
      "sasaran",
      "tanggal",
      "jam_awal",
      "jam_akhir",
      "tempat",
      "uraian",
      "analisa",
      "tanggal_buat",
    ];
    for (const key of mustCheck) {
      if (isEmpty((value as any)[key])) {
        alert("Mohon untuk melengkapi data " + key);
        (document.querySelector('[name="' + key + '"]') as any)?.focus();
        return;
      }
    }
    if (!value.ttd) {
      alert("Mohon untuk melengkapi foto ttd ");
      (document.querySelector('[name="ttd"]') as any)?.focus();
      return;
    }
    if ((value.dokumentasi?.filter((d) => !!d).length || 0) < 1) {
      alert("Mohon untuk melengkapi foto dokumentasi minimal 1, maksimal 2 ");
      (document.querySelector('[name="dokumentasi"]') as any)?.focus();
      return;
    }
    if (
      value.uraian.trim() ===
      fillContent(data.db.template_uraian, genContentParam()).trim()
    ) {
      alert(
        "Mohon untuk melengkapi uraian pengawasan, jelaskan kegiatan pengawasan yang dilakukan."
      );
      (document.querySelector('[name="uraian"]') as any)?.focus();
      return;
    }

    const tanggal = parseDateInput(value.tanggal);
    const ttd = value.ttd ? await fileToImage(value.ttd) : undefined;
    const dokumentasi = await Promise.all(
      (value.dokumentasi || []).map((d) => fileToImage(d))
    );
    const param: GenerateParam<File> = {
      type,
      nomor: genNomorDoc(value.urut, value.desa, tanggal),
      tahapan: value.tahapan,
      petugas: extension.desa?.petugas || "",
      desa: title(extension.desa?.name || ""),
      st: value.surat_tugas || "-",
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
      peristiwa_pelanggaran: getValPelanggaran("peristiwa_pelanggaran"),
      tempat_pelanggaran: getValPelanggaran("tempat_pelanggaran"),
      waktu_pelanggaran: getValPelanggaran("waktu_pelanggaran"),
      nama_pelaku_pelanggaran: getValPelanggaran("nama_pelaku_pelanggaran"),
      alamat_pelaku_pelanggaran: getValPelanggaran("alamat_pelaku_pelanggaran"),
      nama_saksi_pelanggaran: getValPelanggaran("nama_saksi_pelanggaran"),
      alamat_saksi_pelanggaran: getValPelanggaran("alamat_saksi_pelanggaran"),
      alat_bukti_pelanggaran: getValPelanggaran("alat_bukti_pelanggaran"),
      barang_bukti_pelanggaran: getValPelanggaran("barang_bukti_pelanggaran"),
      uraian_pelanggaran: getValPelanggaran("uraian_pelanggaran"),
      keterangan_pelanggaran: getValPelanggaran("keterangan_pelanggaran"),
      analisa: value.analisa,
      tanggal_buat: formatID(
        parseDateInput(value.tanggal_buat),
        "dd MMMM yyyy"
      ),
      ttd: ttd?.buf,
      ttd_size: ttd?.buf ? JSON.stringify(ttd.size) : undefined,
      dokumentasi: dokumentasi.map((d) => d.buf),
      dokumentasi_size: JSON.stringify(dokumentasi.map((d) => d.size)),
    };

    return await fetch("/generate-form-a", {
      method: "POST",
      body: objectToFormData(param),
    }).then(async (res) => {
      const filename = res.headers
        .get("Content-Disposition")
        ?.split('filename="')
        .pop()
        ?.replace('"', "");
      if (filename) {
        const blob = await res.blob();
        download(blob, filename);
      }
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
