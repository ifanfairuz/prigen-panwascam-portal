"use client";

import { usePanwasData, useStaticOption } from "@/context/DataContext";
import { useFormA } from "@/lib/formA";
import {
  ChangeEventHandler,
  Fragment,
  PropsWithChildren,
  useEffect,
} from "react";

const Container = ({ children }: PropsWithChildren) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:p-4 lg:p-8">
      <div className="max-w-5xl w-full bg-white p-8 rounded-xl shadow-xl">
        <h1 className="text-2xl text-center font-bold">Form A LHP Generator</h1>
        <p className="text-lg text-center mb-8">
          Panwaslu Kelurahan/Desa se Kecamatan Prigen
        </p>
        {children}
      </div>
    </main>
  );
};

const LoadingSkeleton = () => {
  return (
    <Container>
      <div className="flex flex-col gap-4 animate-pulse">
        <div className="form-box">
          <div className="col-span-2">
            <div className="h-8 w-2/3 bg-slate-200 rounded-full"></div>
          </div>
          <div className="col-span-3">
            <div className="h-8 w-2/3 bg-slate-200 rounded-full"></div>
          </div>
        </div>
        <div className="form-box">
          <div className="col-span-2">
            <div className="h-8 w-2/3 bg-slate-200 rounded-full"></div>
          </div>
          <div className="col-span-3">
            <div className="h-8 w-2/3 bg-slate-200 rounded-full"></div>
          </div>
        </div>
        <div className="form-box">
          <div className="col-span-2">
            <div className="h-8 w-2/3 bg-slate-200 rounded-full"></div>
          </div>
          <div className="col-span-3">
            <div className="h-8 w-1/3 bg-slate-200 rounded-full"></div>
          </div>
        </div>
        <div className="form-box">
          <div className="col-span-12">
            <div className="h-8 w-full bg-slate-200 rounded-full"></div>
          </div>
        </div>
        <div className="form-box">
          <div className="col-span-2">
            <div className="h-8 w-2/3 bg-slate-200 rounded-full"></div>
          </div>
          <div className="col-span-8">
            <div className="h-8 bg-slate-200 rounded-full"></div>
          </div>
        </div>
        <div className="form-box">
          <div className="col-span-2">
            <div className="h-8 w-2/3 bg-slate-200 rounded-full"></div>
          </div>
          <div className="col-span-8">
            <div className="h-8 bg-slate-200 rounded-full"></div>
          </div>
        </div>
        <div className="form-box">
          <div className="col-span-2">
            <div className="h-8 w-2/3 bg-slate-200 rounded-full"></div>
          </div>
          <div className="col-span-8">
            <div className="h-8 bg-slate-200 rounded-full"></div>
          </div>
        </div>
        <div className="form-box">
          <div className="col-span-2">
            <div className="h-8 w-2/3 bg-slate-200 rounded-full"></div>
          </div>
          <div className="col-span-8">
            <div className="h-8 bg-slate-200 rounded-full"></div>
          </div>
        </div>
        <div className="form-box">
          <div className="col-span-2">
            <div className="h-8 w-2/3 bg-slate-200 rounded-full"></div>
          </div>
          <div className="col-span-3">
            <div className="h-8 bg-slate-200 rounded-full"></div>
          </div>
        </div>
        <div className="form-box">
          <div className="col-span-2">
            <div className="h-8 w-2/3 bg-slate-200 rounded-full"></div>
          </div>
          <div className="col-span-3">
            <div className="h-8 bg-slate-200 rounded-full"></div>
          </div>
        </div>
        <div className="form-box">
          <div className="col-span-2">
            <div className="h-8 w-2/3 bg-slate-200 rounded-full"></div>
          </div>
          <div className="col-span-3">
            <div className="h-8 bg-slate-200 rounded-full"></div>
          </div>
        </div>
        <div className="form-box">
          <div className="col-span-2">
            <div className="h-8 w-2/3 bg-slate-200 rounded-full"></div>
          </div>
          <div className="col-span-8">
            <div className="h-8 bg-slate-200 rounded-full"></div>
          </div>
        </div>
        <div className="form-box">
          <div className="col-span-12">
            <div className="h-8 w-full bg-slate-200 rounded-full"></div>
          </div>
        </div>
        <div className="form-box">
          <div className="col-span-2">
            <div className="h-8 w-2/3 bg-slate-200 rounded-full"></div>
          </div>
          <div className="col-span-8">
            <div className="h-8 bg-slate-200 rounded-full"></div>
          </div>
        </div>
        <div className="form-box">
          <div className="col-span-2">
            <div className="h-8 w-2/3 bg-slate-200 rounded-full"></div>
          </div>
          <div className="col-span-8">
            <div className="h-8 bg-slate-200 rounded-full"></div>
          </div>
        </div>
        <div className="form-box">
          <div className="col-span-2">
            <div className="h-8 w-2/3 bg-slate-200 rounded-full"></div>
          </div>
          <div className="col-span-8">
            <div className="h-8 bg-slate-200 rounded-full"></div>
          </div>
        </div>
        <div className="form-box">
          <div className="col-span-2">
            <div className="h-8 w-2/3 bg-slate-200 rounded-full"></div>
          </div>
          <div className="col-span-8">
            <div className="h-8 bg-slate-200 rounded-full"></div>
          </div>
        </div>
        <div className="form-box">
          <div className="col-span-2">
            <div className="h-8 w-2/3 bg-slate-200 rounded-full"></div>
          </div>
          <div className="col-span-3">
            <div className="h-8 bg-slate-200 rounded-full"></div>
          </div>
        </div>
        <div className="form-box">
          <div className="col-span-2">
            <div className="h-8 w-2/3 bg-slate-200 rounded-full"></div>
          </div>
          <div className="col-span-3">
            <div className="h-8 bg-slate-200 rounded-full"></div>
          </div>
        </div>
        <div className="form-box">
          <div className="col-span-2">
            <div className="h-8 w-2/3 bg-slate-200 rounded-full"></div>
          </div>
          <div className="col-span-3">
            <div className="h-8 bg-slate-200 rounded-full"></div>
          </div>
        </div>
        <div className="form-box">
          <div className="col-span-2">
            <div className="h-8 w-2/3 bg-slate-200 rounded-full"></div>
          </div>
          <div className="col-span-8">
            <div className="h-8 bg-slate-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default function FormAGeneratorPage() {
  const { data, loadingDB } = usePanwasData(true);
  const desa_options = useStaticOption(
    "desa",
    (d) => (
      <option key={d.code} value={d.code}>
        {d.code.split(".").pop()} - {d.name}
      </option>
    ),
    data
  );

  const formA = useFormA();
  const onTahapanChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const tahapan = data.db.tahapan.find((t) => t.name == e.target.value);
    formA.setOption("tahapan", e.target.value, tahapan);
    formA.setString("surat_tugas", tahapan?.st || "");
  };
  const onTanggalChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    formA.setValues({
      tanggal: e.target.value,
      tanggal_buat: formA.value.tanggal_buat || e.target.value,
    });
  };
  const onDugaanPelanggaranChange: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (e.target.checked) {
      formA.setWithPelanggaran(e.target.value == "Y");
    }
  };

  useEffect(() => {
    if (!loadingDB) {
      formA.setOptions({ desa: data.desa[0] });
    }
  }, [loadingDB]);

  if (loadingDB) {
    return <LoadingSkeleton />;
  }

  return (
    <Container>
      <div className="flex flex-col gap-3">
        <div className="form-box">
          <label htmlFor="desa" className="font-medium col-span-2">
            Desa
          </label>
          <select
            name="desa"
            id="desa"
            value={formA.value.desa}
            onChange={(e) =>
              formA.setOption(
                "desa",
                e.target.value,
                data.desa.find((d) => d.code == e.target.value)
              )
            }
            className="col-span-3"
          >
            {desa_options}
          </select>
        </div>
        <div className="form-box">
          <label htmlFor="petugas" className="font-medium col-span-2">
            Petugas
          </label>
          <p className="font-medium my-1 col-span-8">
            {formA.extension.desa?.petugas}
          </p>
        </div>
        <div className="form-box">
          <label htmlFor="urut" className="font-medium col-span-2">
            Nomor Urut
          </label>
          <input
            type="number"
            name="urut"
            id="urut"
            min={1}
            value={formA.value.urut}
            onChange={(e) => formA.setString("urut", e.target.value)}
            placeholder="1"
          />
        </div>
        <h3 className="text-lg font-bold mt-4 border-b">PENGAWASAN</h3>
        <div className="form-box">
          <label htmlFor="tahapan" className="font-medium col-span-2">
            Tahapan
          </label>
          <select
            name="tahapan"
            id="tahapan"
            value={formA.value.tahapan}
            onChange={onTahapanChange}
            className="col-span-8"
          >
            <option value="" disabled>
              Pilih Tahapan
            </option>
            {data.db.tahapan.map((t) => (
              <option key={t.name} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-box">
          <label htmlFor="surat_tugas" className="font-medium col-span-2">
            Nomor Surat Tugas
          </label>
          <input
            type="text"
            name="surat_tugas"
            id="surat_tugas"
            value={formA.value.surat_tugas}
            onChange={(e) => formA.setString("surat_tugas", e.target.value)}
            placeholder="000/PM.00.02/K-JI.20.10/12/2023"
            className="col-span-8"
          />
        </div>
        <div className="form-box">
          <label htmlFor="bentuk" className="font-medium col-span-2">
            Bentuk Pengawasan
          </label>
          <input
            type="text"
            name="bentuk"
            id="bentuk"
            value={formA.value.bentuk}
            onChange={(e) => formA.setString("bentuk", e.target.value)}
            placeholder="Pengawasan terhadap"
            className="col-span-8"
          />
        </div>
        <div className="form-box">
          <label htmlFor="tujuan" className="font-medium col-span-2">
            Tujuan Pengawasan
          </label>
          <input
            type="text"
            name="tujuan"
            id="tujuan"
            value={formA.value.tujuan}
            onChange={(e) => formA.setString("tujuan", e.target.value)}
            placeholder="Memastikan"
            className="col-span-8"
          />
        </div>
        <div className="form-box">
          <label htmlFor="sasaran" className="font-medium col-span-2">
            Sasaran Pengawasan
          </label>
          <input
            type="text"
            name="sasaran"
            id="sasaran"
            value={formA.value.sasaran}
            onChange={(e) => formA.setString("sasaran", e.target.value)}
            className="col-span-8"
            placeholder="PPS Kelurahan / Caleg DPRD Kab Pasuruan / ...."
          />
        </div>
        <div className="form-box">
          <label htmlFor="tanggal" className="font-medium col-span-2">
            Tanggal Pengawasan
          </label>
          <input
            type="date"
            name="tanggal"
            id="tanggal"
            value={formA.value.tanggal}
            onChange={onTanggalChange}
            className="col-span-2"
          />
        </div>
        <div className="form-box">
          <label htmlFor="jam_awal" className="font-medium col-span-2">
            Jam Mulai
          </label>
          <input
            type="time"
            name="jam_awal"
            id="jam_awal"
            value={formA.value.jam_awal}
            onChange={(e) => formA.setString("jam_awal", e.target.value)}
            className="col-span-2"
          />
        </div>
        <div className="form-box">
          <label htmlFor="jam_akhir" className="font-medium col-span-2">
            Jam Selesai
          </label>
          <input
            type="time"
            name="jam_akhir"
            id="jam_akhir"
            value={formA.value.jam_akhir}
            onChange={(e) => formA.setString("jam_akhir", e.target.value)}
            className="col-span-2"
          />
        </div>
        <div className="form-box">
          <label htmlFor="tempat" className="font-medium col-span-2">
            Tempat Pengawasan
          </label>
          <input
            type="text"
            name="tempat"
            id="tempat"
            value={formA.value.tempat}
            onChange={(e) => formA.setString("tempat", e.target.value)}
            className="col-span-8"
          />
        </div>
        <h3 className="text-lg font-bold mt-4 border-b">HASIL PENGAWASAN</h3>
        <div className="form-box">
          <div className="col-span-2 flex md:flex-col gap-2 items-center md:items-start justify-between md:justify-start mb-2">
            <label htmlFor="uraian" className="font-medium">
              Uraian Hasil Pengawasan
            </label>
            <button
              onClick={formA.genUraian}
              className="bg-green-400 hover:bg-green-500 text-green-800 px-4 py-2 rounded-full text-sm"
            >
              Generate
            </button>
          </div>
          <textarea
            name="uraian"
            id="uraian"
            value={formA.value.uraian}
            onChange={(e) => formA.setString("uraian", e.target.value)}
            className="col-span-8"
            rows={10}
          ></textarea>
        </div>
        <h3 className="text-lg font-bold mt-4 border-b">
          INFORMASI DUGAAN PELANGGARAN
        </h3>
        <div className="form-box mb-4">
          <label htmlFor="withPelanggaran" className="font-medium col-span-2">
            Dugaan Pelanggaran
          </label>
          <label htmlFor="withPelanggaranY" className="col-span-2">
            <input
              type="radio"
              name="withPelanggaran"
              id="withPelanggaranY"
              className="mr-2"
              value="Y"
              onChange={onDugaanPelanggaranChange}
              checked={formA.withPelanggaran}
            />
            Ada
          </label>
          <label htmlFor="withPelanggaranN" className="col-span-2">
            <input
              type="radio"
              name="withPelanggaran"
              id="withPelanggaranN"
              className="mr-2"
              value="N"
              onChange={onDugaanPelanggaranChange}
              checked={!formA.withPelanggaran}
            />
            Tidak Ada
          </label>
        </div>
        {formA.withPelanggaran && (
          <Fragment>
            <div className="form-box">
              <label
                htmlFor="peristiwa_pelanggaran"
                className="font-medium col-span-2"
              >
                Peristiwa Pelanggaran
              </label>
              <input
                type="text"
                name="peristiwa_pelanggaran"
                id="peristiwa_pelanggaran"
                value={formA.value.peristiwa_pelanggaran}
                onChange={(e) =>
                  formA.setString("peristiwa_pelanggaran", e.target.value)
                }
                className="col-span-8"
              />
            </div>
            <div className="form-box">
              <label
                htmlFor="tempat_pelanggaran"
                className="font-medium col-span-2"
              >
                Tempat Kejadian
              </label>
              <input
                type="text"
                name="tempat_pelanggaran"
                id="tempat_pelanggaran"
                value={formA.value.tempat_pelanggaran}
                onChange={(e) =>
                  formA.setString("tempat_pelanggaran", e.target.value)
                }
                className="col-span-8"
              />
            </div>
            <div className="form-box">
              <label
                htmlFor="waktu_pelanggaran"
                className="font-medium col-span-2"
              >
                Waktu Kejadian
              </label>
              <input
                type="text"
                name="waktu_pelanggaran"
                id="waktu_pelanggaran"
                value={formA.value.waktu_pelanggaran}
                onChange={(e) =>
                  formA.setString("waktu_pelanggaran", e.target.value)
                }
                className="col-span-8"
              />
            </div>
            <div className="form-box">
              <label
                htmlFor="nama_pelaku_pelanggaran"
                className="font-medium col-span-2"
              >
                Pelaku Pelanggaran
              </label>
              <input
                type="text"
                name="nama_pelaku_pelanggaran"
                id="nama_pelaku_pelanggaran"
                value={formA.value.nama_pelaku_pelanggaran}
                onChange={(e) =>
                  formA.setString("nama_pelaku_pelanggaran", e.target.value)
                }
                className="col-span-8"
              />
            </div>
            <div className="form-box">
              <label
                htmlFor="alamat_pelaku_pelanggaran"
                className="font-medium col-span-2"
              >
                Alamat Pelanggaran
              </label>
              <input
                type="text"
                name="alamat_pelaku_pelanggaran"
                id="alamat_pelaku_pelanggaran"
                value={formA.value.alamat_pelaku_pelanggaran}
                onChange={(e) =>
                  formA.setString("alamat_pelaku_pelanggaran", e.target.value)
                }
                className="col-span-8"
              />
            </div>
            <div className="form-box">
              <label
                htmlFor="nama_saksi_pelanggaran"
                className="font-medium col-span-2"
              >
                Nama Saksi
              </label>
              <input
                type="text"
                name="nama_saksi_pelanggaran"
                id="nama_saksi_pelanggaran"
                value={formA.value.nama_saksi_pelanggaran}
                onChange={(e) =>
                  formA.setString("nama_saksi_pelanggaran", e.target.value)
                }
                className="col-span-8"
              />
            </div>
            <div className="form-box">
              <label
                htmlFor="alamat_saksi_pelanggaran"
                className="font-medium col-span-2"
              >
                Alamat Saksi
              </label>
              <input
                type="text"
                name="alamat_saksi_pelanggaran"
                id="alamat_saksi_pelanggaran"
                value={formA.value.alamat_saksi_pelanggaran}
                onChange={(e) =>
                  formA.setString("alamat_saksi_pelanggaran", e.target.value)
                }
                className="col-span-8"
              />
            </div>
            <div className="form-box">
              <label
                htmlFor="alat-bukti_pelanggaran"
                className="font-medium col-span-2"
              >
                Alat Bukti
              </label>
              <input
                type="text"
                name="alat_bukti_pelanggaran"
                id="alat_bukti_pelanggaran"
                value={formA.value.alat_bukti_pelanggaran}
                onChange={(e) =>
                  formA.setString("alat_bukti_pelanggaran", e.target.value)
                }
                className="col-span-8"
              />
            </div>
            <div className="form-box">
              <label
                htmlFor="barang-bukti_pelanggaran"
                className="font-medium col-span-2"
              >
                Barang Bukti
              </label>
              <input
                type="text"
                name="barang_bukti_pelanggaran"
                id="barang_bukti_pelanggaran"
                value={formA.value.barang_bukti_pelanggaran}
                onChange={(e) =>
                  formA.setString("barang_bukti_pelanggaran", e.target.value)
                }
                className="col-span-8"
              />
            </div>
            <div className="form-box">
              <label
                htmlFor="uraian_pelanggaran"
                className="font-medium col-span-2"
              >
                Uraian Singkat Dugaan Pelanggaran
              </label>
              <textarea
                name="uraian_pelanggaran"
                id="uraian_pelanggaran"
                value={formA.value.uraian_pelanggaran}
                onChange={(e) =>
                  formA.setString("uraian_pelanggaran", e.target.value)
                }
                className="col-span-8"
                rows={3}
              ></textarea>
            </div>
            <div className="form-box">
              <label
                htmlFor="keterangan_pelanggaran"
                className="font-medium col-span-2"
              >
                Fakta dan Keterangan Pelanggaran
              </label>
              <textarea
                name="keterangan_pelanggaran"
                id="keterangan_pelanggaran"
                value={formA.value.keterangan_pelanggaran}
                onChange={(e) =>
                  formA.setString("keterangan_pelanggaran", e.target.value)
                }
                className="col-span-8"
                rows={3}
              ></textarea>
            </div>
          </Fragment>
        )}
        <h3 className="text-lg font-bold mt-4 border-b">ANALISA PENGAWASAN</h3>
        <div className="form-box">
          <div className="col-span-2 flex md:flex-col gap-2 items-center md:items-start justify-between md:justify-start mb-2">
            <label htmlFor="analisa" className="font-medium">
              Analisa Pengawasan
            </label>
            <button
              onClick={formA.genAnalisa}
              className="bg-green-400 hover:bg-green-500 text-green-800 px-4 py-2 rounded-full text-sm"
            >
              Generate
            </button>
          </div>
          <textarea
            name="analisa"
            id="analisa"
            value={formA.value.analisa}
            onChange={(e) => formA.setString("analisa", e.target.value)}
            className="col-span-8"
            rows={8}
          ></textarea>
        </div>
        <h3 className="text-lg font-bold mt-4 border-b">LAINYA</h3>
        <div className="form-box">
          <label htmlFor="tanggal_buat" className="font-medium col-span-2">
            Tanggal Pembuatan Dokumen
          </label>
          <input
            type="date"
            name="tanggal_buat"
            id="tanggal_buat"
            value={formA.value.tanggal_buat}
            onChange={(e) => formA.setString("tanggal_buat", e.target.value)}
            className="col-span-2"
          />
        </div>
        <div className="form-box">
          <label htmlFor="dokumentasi" className="font-medium col-span-2">
            Foto Dokumentasi
          </label>
          <input
            type="file"
            name="dokumentasi"
            id="dokumentasi"
            className="col-span-8"
            multiple
            accept="image/jpeg,image/png"
            onChange={(e) => formA.setDokumentasi(e.target.files)}
          />
        </div>
        <div className="form-box">
          <label htmlFor="ttd" className="font-medium col-span-2">
            Foto TTD
          </label>
          <input
            type="file"
            name="ttd"
            id="ttd"
            className="col-span-8"
            multiple
            accept="image/jpeg,image/png"
            onChange={(e) => formA.setTTD(e.target.files)}
          />
        </div>
        <h3 className="text-lg font-bold mt-4 border-b"></h3>
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={formA.genFormA}
            className="bg-blue-400 hover:bg-blue-500 text-blue-800 px-4 py-2 rounded-full"
          >
            GENERATE
          </button>
        </div>
      </div>
    </Container>
  );
}
