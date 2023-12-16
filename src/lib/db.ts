export const getDB = () =>
  fetch(process.env.NEXT_PUBLIC_DB_LINK || "").then((res) =>
    res.json()
  ) as Promise<DBPanwas>;
