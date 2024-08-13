import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ApiRequests from "../ApiRequests";
import DisplayProducts from "../components/DisplaySearchProducts";

const SearchBar = () => {
  const query = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchProducts = async () => {
    setLoading(true);
    const dataReq = await fetch(ApiRequests.searchProduct.url + query.search);
    const dataRes = await dataReq.json();
    setLoading(false);
    setData(dataRes.data);
  };
  useEffect(() => {
     fetchProducts();
  }, [query]);
  return (
    <div className="mx-auto container p-4">
      {loading && <p className="text-center animate-pulse">Loading...</p>}
      {data?.length != 0 && (
        <p className="font-medium ">Search Results : {data?.length}</p>
      )}

      {data?.length == 0 && !loading && (
        <p className="text-center animate-pulse">No Results Found ...</p>
      )}
      {
        data?.length!=0&&!loading&&(
          <DisplayProducts loading={loading} data={data}/>
        )
      }
    </div>
  );
};

export default SearchBar;
