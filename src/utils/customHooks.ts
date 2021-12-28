import { useState, useEffect } from "react";
import axios from "axios";

import {Repo} from "./types/githubReposTypes"

interface Axios {
    data:Repo[],
    loading:boolean,
    error:boolean
  }
  
export const useAxios = (url:string):Axios => {
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
           url,
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
  }, [url]);
  return { data, loading, error };
};