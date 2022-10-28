import axios from "axios";
import * as React from "react";

import Store from "../storage/store";
import Trow from "./Trow";

class Table extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      presentData: [],
      load: true,
      sortType: "ascending",
      sortItem: "rank",
      prevData: []
    }
  }



  async dataFetcher() {
    try {
      let res = await axios
        .get("https://api.coincap.io/v2/assets");
      console.log(res);
      this.setState({ prevData: this.state.data })
      this.sort(this.state.sortItem, res.data.data);
      let presentData = this.state.load ? res.data.data.slice(0, 50) : res.data.data;
      this.setState({ presentData });
    }
    catch (error) {
      console.log(error)
    }
  }

  componentDidMount() {
    this.dataFetcher();
  }


  onClick() {
    let load = !this.state.load;
    let presentData = load ? this.state.data.slice(0, 50) : this.state.data
    this.setState({ load, presentData });
  };




  async Sort(d, newData, sorting) {
    if (typeof d !== "undefined") return this.setState(newData);
    else if (typeof d === "undefined") {
      await this.addStoreData(newData);
      this.setState({ data: newData, sortType: sorting });
    }
  };
  async ascending(key, d) {
    let newData = [];
    typeof d === "undefined" ? (newData = this.state.data) : (newData = d);
    newData.sort((a, b) => (a[key] > b[key] ? -1 : b[key] > a[key] ? 1 : 0));
    this.Sort(d, newData, "descending");
  };
  async descending(key, d) {
    let newData = [];
    typeof d === "undefined" ? (newData = this.state.data) : (newData = d);

    newData.sort((a, b) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0));
    this.Sort(d, newData, "ascending");
  };

  async numAscending(key, d) {
    let newData = [];
    typeof d === "undefined" ? (newData = this.state.data) : (newData = d);

    newData.sort(function (a, b) {
      return a[key] - b[key];
    });
    this.Sort(d, newData, "descending");
  };
  async numDescending(key, d) {
    let newData = [];
    typeof d === "undefined" ? (newData = this.state.data) : (newData = d);

    newData.sort(function (a, b) {
      return b[key] - a[key];
    });
    this.Sort(d, newData, "ascending");
  };
  sort(key, d) {
    if (this.state.sortItem === key) {
      if (this.state.sortType === "ascending") {
        if (key !== "name") return this.numAscending(key, d);
        else return this.ascending(key, d);
      } else {
        if (key !== "name") return this.numDescending(key, d);
        else return this.descending(key, d);
      }
    }
  };
  sortButton(a) {
    if (this.state.sortItem === a) {
      return (
        <div onClick={() => this.sort(a)}>
          {this.state.sortType === "ascending" ? (
            <span className="material-icons m-0 p-0  thead">arrow_drop_up</span>
          ) : (
            <span class="material-icons m-0 p-0 thead">arrow_drop_down</span>
          )}
        </div>
      );
    }
  };
  render() {
    return (
      <div className="container mt-5" >
        {this.state.presentData?.length > 0 && (
          <>
            <table className="table  mx-auto justify-content-center shadow rounded ">
              <thead className="thead">
                <tr className="">
                  <th
                    className="px-4 "
                    scope="col"
                    onClick={() => this.setState({ sortItem: "rank" }, () => this.sort("rank"))}
                  >
                    <small>
                      {" "}
                      <strong className="d-flex py-2  ">
                        {" "}
                        Rank {this.sortButton("rank")}
                      </strong>{" "}
                    </small>
                  </th>

                  <th
                    className="text-left px-4 "
                    scope="col"
                    onClick={() => this.setState({ sortItem: "name" }, () => this.sort("name"))}
                  >
                    <small className="d-flex py-2">
                      {" "}
                      Name
                      {this.sortButton("name")}
                    </small>
                  </th>
                  <th
                    className="text-right px-4"
                    scope="col"
                    onClick={() =>
                      this.setState({ sortItem: "priceUsd" }, () => this.sort("priceUsd"))
                    }
                  >
                    <small className="d-flex py-2">
                      Price
                      {this.sortButton("priceUsd")}
                    </small>
                  </th>
                  <th
                    className="text-right px-4"
                    scope="col"
                    onClick={() =>
                      this.setState({ sortItem: "marketCapUsd" }, () => this.sort("rank"))
                    }
                  >
                    <small className="d-flex py-2">
                      Market Cap
                      {this.sortButton("marketCapUsd")}
                    </small>
                  </th>
                  <th
                    className="text-right px-4"
                    scope="col"
                    onClick={() =>
                      this.setState({ sortItem: "vwap24Hr" }, () => this.sort("vwap24Hr"))
                    }
                  >
                    <small className="d-flex py-2">
                      VWAP(24Hr)
                      {this.sortButton("vwap24Hr")}
                    </small>
                  </th>
                  <th
                    className="text-right px-4"
                    scope="col"
                    onClick={() => this.setState({ sortItem: "supply" }, () => this.sort("supply"))}
                  >
                    <small className="d-flex py-2">
                      Supply
                      {this.sortButton("supply")}
                    </small>
                  </th>
                  <th
                    className="text-right px-4"
                    scope="col"
                    onClick={() =>
                      this.setState({ sortItem: "volumeUsd24Hr" }, () => this.sort("volumeUsd24Hr"))
                    }
                  >
                    <small className="d-flex py-2 ">
                      Volume(24Hr)
                      {this.sortButton("volumeUsd24Hr")}
                    </small>
                  </th>
                  <th
                    className="text-right px-4"
                    scope="col"
                    onClick={() =>
                      this.setState({ sortItem: "changePercent24Hr" }, () => this.sort("changePercent24Hr"))
                    }
                  >
                    <small className="d-flex text-right py-2">
                      {" "}
                      Change(24Hr)
                      {this.sortButton("changePercent24Hr")}
                    </small>
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.presentData.map((a, i) => {
                  let css = "";
                  if (this.state.prevData?.length > 0) {
                    if (
                      this.roundOff(this.state.prevData[i].priceUsd) > this.roundOff(a.priceUsd)
                    ) {
                      css = "bg-red";
                    } else if (
                      this.roundOff(this.state.prevData[i].priceUsd) < this.roundOff(a.priceUsd)
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
        {
          this.state.load === true && this.state.data.length > 0 && (
            <button
              className="btn  rounded-pill shadow green px-4 my-3 mb-4"
              onClick={this.onClick}
            >
              View More
            </button>
          )
        }
      </div >
    );
  }
}

export default Table;
