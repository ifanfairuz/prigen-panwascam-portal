"use client";

import { getDB } from "@/lib/db";
import { DATA_DESA } from "@/lib/desa";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  JSX,
  useEffect,
  useState,
} from "react";

const db = () =>
  ({
    tahapan: [],
    template_uraian: "",
    template_analisa_lancar: "",
    template_analisa_pelanggaran: "",
  } as DBPanwas);

const panwasData: () => PanwasDataContext = () => ({
  data: {
    desa: DATA_DESA,
    db: db(),
  },
  dbready: false,
  getDB() {
    if (this.dbready) return Promise.resolve(this.data.db);
    return getDB()
      .then((db) => (this.data.db = db))
      .finally(() => (this.dbready = true));
  },
});
const PanwasDataContext = createContext(panwasData());

export const PanwasDataProvider = ({ children }: PropsWithChildren) => (
  <PanwasDataContext.Provider value={panwasData()}>
    {children}
  </PanwasDataContext.Provider>
);

export const usePanwasData = (loadDB = false) => {
  const ctx = useContext(PanwasDataContext);
  const [loadingDB, setLoadingDB] = useState(true);
  useEffect(() => {
    if (loadDB) {
      ctx
        .getDB()
        .finally(() => setLoadingDB(false))
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  if (loadDB) {
    return { data: ctx.data, loadingDB };
  }

  return { data: ctx.data, loadingDB: false };
};

export function useStaticOption<O extends OptionAvailable = OptionAvailable>(
  option: O,
  ctxOrMap: PanwasData
): JSX.Element[];
export function useStaticOption<O extends OptionAvailable = OptionAvailable>(
  option: O,
  ctxOrMap: Mapper<O>,
  ctx: PanwasData
): JSX.Element[];
export function useStaticOption<O extends OptionAvailable = OptionAvailable>(
  option: O,
  ctxOrMap?: PanwasData | Mapper<O>,
  ctx?: PanwasData
) {
  let data = (typeof ctxOrMap === "function" ? ctx : ctxOrMap)![option];
  let m = useCallback<Mapper<O>>(
    (...args: Parameters<Mapper<O>>) =>
      typeof ctxOrMap === "function" ? ctxOrMap(...args) : undefined,
    [ctxOrMap]
  );

  return useMemo(
    () =>
      data.map((d) =>
        typeof ctxOrMap === "function" ? (
          m(d)
        ) : (
          <option key={d.code} value={d.code}>
            {d.name}
          </option>
        )
      ),
    [data, ctxOrMap]
  );
}
