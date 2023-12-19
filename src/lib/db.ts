import axios from "axios";

export const getDB = () =>
  axios
    .get<DBPanwas>(process.env.NEXT_PUBLIC_DB_LINK || "", {
      responseType: "json",
    })
    .then((res) => res.data) as Promise<DBPanwas>;
