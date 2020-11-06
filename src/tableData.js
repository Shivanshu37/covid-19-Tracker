import React, { useState } from "react";
import axios from "axios";
import "./styles.css";
import Loader from "react-loader-spinner";
import StateTable from "./stateData.js";
function Table() {
  const [Confirmed, setConfirmed] = useState([]);
  const [Recovered, setRecovered] = useState([]);
  const [Deaths, setDeaths] = useState([]);
  const [Active, setActive] = useState([]);
  const [NewCases, setNew] = useState([]);
  const [NewDeaths, setNewDeaths] = useState([]);
  const [Tested, setTested] = useState([]);
  const [LastUpdate, setLastUpdate] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  axios({
    method: "GET",
    url: "https://covid-193.p.rapidapi.com/statistics",
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "covid-193.p.rapidapi.com",
      "x-rapidapi-key": "741a96821cmsh25cf77c6d7bf1afp12ad1ejsn1a19639b177e",
      useQueryString: true,
    },
    params: {
      country: "India",
    },
  })
    .then((response) => {
      const { active, recovered, total } = response.data.response[0].cases;
      setNew(response.data.response[0].cases.new);
      setConfirmed(total);
      setActive(active);
      setRecovered(recovered);
      setDeaths(response.data.response[0].deaths.total);
      setNewDeaths(response.data.response[0].deaths.new);
      setTested(response.data.response[0].tests.total);
      const FormatedDate = new Date(
        response.data.response[0].time
      ).toUTCString();
      const SlicedDate = FormatedDate.split(" ").slice(0, 5).join(" ");
      setLastUpdate(SlicedDate);
      setIsLoading(false);
    })
    .catch((error) => {
      console.log(error);
    });
  if (isLoading === true) {
    return (
      <Loader type="BallTriangle" color="cadetblue" height={80} width={80} />
    );
  } else {
    return (
      <div>
        <div className="TimePosition">
          <p
            style={{
              color: "rgba(40,167,69,.6)",
              fontWeight: 600,
              fontFamily: "monospace",
            }}
          >
            Last updated :
            <p
              style={{
                color: "#28a745",
                fontWeight: 600,
                fontFamily: "monospace",
              }}
            >
              {LastUpdate}
            </p>
          </p>
        </div>
        <table className="table">
          <tr>
            <th style={{ color: "#ff073a" }}>Confirmed</th>
            <th style={{ color: "#007bff" }}>Active</th>
            <th style={{ color: "green" }}>Recovered</th>
            <th style={{ color: "#6c757d" }}>Deceased</th>
            <th style={{ color: "#6c757d" }}>Tested</th>
          </tr>
          <tr>
            <td
              style={{
                color: "rgba(255,7,58,.6)",
                fontFamily: "archia",
                fontWeight: "bold",
              }}
            >
              {NewCases}
            </td>
            <td></td>
            <td></td>
            <td style={{ color: "rgba(108,117,125,.6)" }}>{NewDeaths}</td>
          </tr>
          <tr>
            <td
              style={{ color: "#ff073a", fontSize: "24px", fontWeight: "bold" }}
            >
              {Confirmed}
            </td>
            <td
              style={{ color: "#007bff", fontSize: "24px", fontWeight: "bold" }}
            >
              {Active}
            </td>
            <td
              style={{ color: "green", fontSize: "24px", fontWeight: "bold" }}
            >
              {Recovered}
            </td>
            <td
              style={{ color: "#6c757d", fontSize: "24px", fontWeight: "bold" }}
            >
              {Deaths}
            </td>
            <td
              style={{ color: "#6c757d", fontSize: "24px", fontWeight: "bold" }}
            >
              {Tested}
            </td>
          </tr>
        </table>
        <StateTable className="stateTablePosition" />
      </div>
    );
  }
}

export default Table;
