import { JSX } from "react";

declare global {
  interface Desa {
    code: string;
    name: string;
    petugas: string;
    alamat_petugas: string;
  }

  interface Tahapan {
    name: string;
    st: string;
  }

  interface DBPanwas {
    tahapan: Tahapan[];
    template_uraian: string;
    template_analisa_lancar: string;
    template_analisa_pelanggaran: string;
  }

  interface PanwasData {
    desa: Desa[];
    db: DBPanwas;
  }

  interface PanwasDataContext {
    data: PanwasData;
    dbready: boolean;
    getDB(): Promise<DBPanwas>;
  }

  type OptionAvailable = "desa";
  type OptionType = JSX.Element | undefined;
  type Mapper<O extends OptionAvailable> = (o: PanwasData[O][0]) => OptionType;

  interface FormAValue {
    desa: string;
    urut: string;
    tahapan: string;
    surat_tugas: string;
    bentuk: string;
    tujuan: string;
    sasaran: string;
    tanggal: string;
    jam_awal: string;
    jam_akhir: string;
    tempat: string;
    uraian: string;
    peristiwa_pelanggaran: string;
    tempat_pelanggaran: string;
    waktu_pelanggaran: string;
    nama_pelaku_pelanggaran: string;
    alamat_pelaku_pelanggaran: string;
    nama_saksi_pelanggaran: string;
    alamat_saksi_pelanggaran: string;
    alat_bukti_pelanggaran: string;
    barang_bukti_pelanggaran: string;
    uraian_pelanggaran: string;
    keterangan_pelanggaran: string;
    analisa: string;
    tanggal_buat: string;
    dokumentasi?: File[] | null;
    ttd?: File | null;
  }

  interface FormAExtension {
    desa?: Desa;
    tahapan?: Tahapan;
  }

  interface ImageInput<B extends ArrayBuffer | File = ArrayBuffer> {
    buf: B;
    size: [number, number];
  }

  interface ImageModuleOption {
    centered: boolean;
    fileType: "docx" | "pptx";
    getImage: (tagValue: ImageInput, tagName: string) => ArrayBuffer;
    getSize: (
      img: ArrayBuffer,
      tagValue: ImageInput,
      tagName: string
    ) => [number, number];
  }
  class ImageModule {
    constructor(opts: ImageModuleOption);
  }

  type DocType = "pdf" | "docx";
  interface DocParam {
    nomor: string;
    tahapan: string;
    petugas: string;
    desa: string;
    st: string;
    alamat_petugas: string;
    bentuk: string;
    tujuan: string;
    sasaran: string;
    hari: string;
    tanggal: string;
    jam_awal: string;
    jam_akhir: string;
    tempat: string;
    uraian: string;
    peristiwa_pelanggaran: string;
    tempat_pelanggaran: string;
    waktu_pelanggaran: string;
    nama_pelaku_pelanggaran: string;
    alamat_pelaku_pelanggaran: string;
    nama_saksi_pelanggaran: string;
    alamat_saksi_pelanggaran: string;
    alat_bukti_pelanggaran: string;
    barang_bukti_pelanggaran: string;
    uraian_pelanggaran: string;
    keterangan_pelanggaran: string;
    analisa: string;
    tanggal_buat: string;
  }

  interface GenerateParam<
    Doc extends ArrayBuffer | File = ArrayBuffer,
    Size = string,
    Sizes = Size extends string ? Size : Size[]
  > extends DocParam {
    type: DocType;
    ttd?: Doc | null;
    ttd_size?: Size;
    dokumentasi?: Doc[] | null;
    dokumentasi_size?: Sizes;
  }

  interface RenderParam extends DocParam {
    ttd?: ImageInput;
    dokumentasi: ImageInput[];
  }
}
