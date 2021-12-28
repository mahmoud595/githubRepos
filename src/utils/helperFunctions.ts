import { useState, useEffect } from "react";
import axios from "axios";

import {Repo} from "./types/githubReposTypes"
export const getFirstDayFromMonth = ():string => {
  const today = new Date();

  return new Date(new Date().setDate(today.getDate() - 30))
    .toISOString()
    .split("T")[0];
};

interface Axios {
  data:Repo[],
  loading:boolean,
  error:boolean
}
export const useAxios = (url:string|undefined, page:number):Axios => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let unmounted = false;
    let source = axios.CancelToken.source();
    setLoading(true);
    const fetchData = async () => {
      try {
        if (!unmounted) {
          const res = await axios.get(
            `${url}&q=created:%3E${getFirstDayFromMonth()}&page=${page}`,
            {
              cancelToken: source.token,
            }
          );
          setData(res.data.items);
          setLoading(false);
        }
      } catch (err) {
        if (!unmounted) {
          setError(true);
          setLoading(false);
        }
      }
    };
    fetchData();
    return function () {
      unmounted = true;
      source.cancel("Cancelling in cleanup");
    };
  }, [url, page]);
  return { data, loading, error };
};

export const getdaysFromCertainDate = (date:string):number => {
  const today = new Date();
  const SelectedDate = new Date(date);
  const diffTime = Math.abs(+today - +SelectedDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
