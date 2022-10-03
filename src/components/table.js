import axios from "axios";
import { useEffect, useState } from "react";
import Store from "../storage/store";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import Trow from "./Trow";

function Table() {
  const roundOff = (a) => {
    return Number(a).toFixed(2);
  };

  const addStoreData = Store((state) => state.add);

  let getStoreData = Store((state) => state.store[0]);

  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [presentData, setPresentData] = useState([]);
  const [load, setLoad] = useState(true);
  const [sortType, setSortType] = useState("ascending");
  const [sortItem, setSortItem] = useStateWithCallbackLazy("rank");

  useEffect(() => {
    axios
      .get("https://api.coincap.io/v2/assets")
      .then((res) => {
        console.log(res);
        setData(() => res.data.data);
        setCount((a) => a + 1);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get("https://api.coincap.io/v2/assets")
      .then((res) => {
        console.log(res);

        addStoreData(data);

        sort(sortItem, res.data.data);

        setCount((a) => a + 1);
      })
      .catch((error) => console.log(error));
  }, [count]);

  const onClick = () => {
    setLoad(false);
  };

  useEffect(() => {
    let presentData = load ? data.slice(0, 50) : data;
    setPresentData(presentData);
  }, [load, data]);

  const Sort = async (d, newData, sorting) => {
    if (typeof d !== "undefined") return setData(newData);
    else if (typeof d === "undefined") {
      await addStoreData(newData);

      setData(newData);

      return setSortType(sorting);
    }
  };
  const ascending = async (key, d) => {
    let newData = [];
    typeof d === "undefined" ? (newData = data) : (newData = d);
    newData.sort((a, b) => (a[key] > b[key] ? -1 : b[key] > a[key] ? 1 : 0));
    Sort(d, newData, "descending");
  };
  const descending = async (key, d) => {
    let newData = [];
    typeof d === "undefined" ? (newData = data) : (newData = d);

    newData.sort((a, b) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0));
    Sort(d, newData, "ascending");
  };

  const numAscending = async (key, d) => {
    let newData = [];
    typeof d === "undefined" ? (newData = data) : (newData = d);

    newData.sort(function (a, b) {
      return a[key] - b[key];
    });
    Sort(d, newData, "descending");
  };
  const numDescending = async (key, d) => {
    let newData = [];
    typeof d === "undefined" ? (newData = data) : (newData = d);

    newData.sort(function (a, b) {
      return b[key] - a[key];
    });
    Sort(d, newData, "ascending");
  };
  const sort = (key, d) => {
    if (sortItem === key) {
      if (sortType === "ascending") {
        if (key !== "name") return numAscending(key, d);
        else return ascending(key, d);
      } else {
        if (key !== "name") return numDescending(key, d);
        else return descending(key, d);
      }
    }
  };
  const sortButton = (a) => {
    if (sortItem === a) {
      return (
        <div onClick={() => sort(a)}>
          {sortType === "ascending" ? (
            <span className="material-icons m-0 p-0  thead">arrow_drop_up</span>
          ) : (
            <span class="material-icons m-0 p-0 thead">arrow_drop_down</span>
          )}
        </div>
      );
    }
  };
  return (
    <div className="container mt-5">
      {presentData?.length > 0 && (
        <>
          <table className="table  mx-auto justify-content-center shadow rounded ">
            <thead className="thead">
              <tr className="">
                <th
                  className="px-4 "
                  scope="col"
                  onClick={() => setSortItem("rank", () => sort("rank"))}
                >
                  <small>
                    {" "}
                    <strong className="d-flex py-2  ">
                      {" "}
                      Rank {sortButton("rank")}
                    </strong>{" "}
                  </small>
                </th>

                <th
                  className="text-left px-4 "
                  scope="col"
                  onClick={() => setSortItem("name", () => sort("name"))}
                >
                  <small className="d-flex py-2">
                    {" "}
                    Name
                    {sortButton("name")}
                  </small>
                </th>
                <th
                  className="text-right px-4"
                  scope="col"
                  onClick={() =>
                    setSortItem("priceUsd", () => sort("priceUsd"))
                  }
                >
                  <small className="d-flex py-2">
                    Price
                    {sortButton("priceUsd")}
                  </small>
                </th>
                <th
                  className="text-right px-4"
                  scope="col"
                  onClick={() =>
                    setSortItem("marketCapUsd", () => sort("marketCapUsd"))
                  }
                >
                  <small className="d-flex py-2">
                    Market Cap
                    {sortButton("marketCapUsd")}
                  </small>
                </th>
                <th
                  className="text-right px-4"
                  scope="col"
                  onClick={() =>
                    setSortItem("vwap24Hr", () => sort("vwap24Hr"))
                  }
                >
                  <small className="d-flex py-2">
                    VWAP(24Hr)
                    {sortButton("vwap24Hr")}
                  </small>
                </th>
                <th
                  className="text-right px-4"
                  scope="col"
                  onClick={() => setSortItem("supply", () => sort("supply"))}
                >
                  <small className="d-flex py-2">
                    Supply
                    {sortButton("supply")}
                  </small>
                </th>
                <th
                  className="text-right px-4"
                  scope="col"
                  onClick={() =>
                    setSortItem("volumeUsd24Hr", () => sort("volumeUsd24Hr"))
                  }
                >
                  <small className="d-flex py-2 ">
                    Volume(24Hr)
                    {sortButton("volumeUsd24Hr")}
                  </small>
                </th>
                <th
                  className="text-right px-4"
                  scope="col"
                  onClick={() =>
                    setSortItem("changePercent24Hr", () =>
                      sort("changePercent24Hr")
                    )
                  }
                >
                  <small className="d-flex text-right py-2">
                    {" "}
                    Change(24Hr)
                    {sortButton("changePercent24Hr")}
                  </small>
                </th>
              </tr>
            </thead>
            <tbody>
              {presentData.map((a, i) => {
                let css = "";
                if (getStoreData?.length > 0) {
                  if (
                    roundOff(getStoreData[i].priceUsd) > roundOff(a.priceUsd)
                  ) {
                    css = "bg-red";
                  } else if (
                    roundOff(getStoreData[i].priceUsd) < roundOff(a.priceUsd)
                  ) {
                    css = "bg-green";
                  }
                }
                return <Trow data={a} css={css} />;
              })}
            </tbody>
          </table>
        </>
      )}
      {load === true && data.length > 0 && (
        <button
          className="btn  rounded-pill shadow green px-4 my-3 mb-4"
          onClick={onClick}
        >
          View More
        </button>
      )}
    </div>
  );
}

export default Table;
