import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";

// import "isomorphic-fetch";
import "./nutsBox.css";
import NutsItem from "./NutsItem";
// import NutsModal from "./NutsModal";
import NutsModal2 from "./NutsModal2";
import * as _ from "lodash";

const Nuts = () => {
  // const tokenDef = "T3PDtk9vMNGvDJ_76EtM0T9bpFZka80l";

  const search = new URLSearchParams(useLocation().search);
  const token = search.get("token");

  // move this into a reducer for server side
  const [nutsData, setNutsData] = useState([]);
  const [totalNuts, setTotalNuts] = useState(0);
  const [currentPos, setCurrentPos] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedNut, setSelectedNut] = useState(null);
  const [scrolling, setScrolling] = useState(false);

  const observer = useRef(null);
  const lastNutRef = useCallback(
    (ni) => {
      if (!observer || observer.length === 0) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !scrolling) {
          setCurrentPos((c) => c + 10);
        }
      });
      if (ni) observer.current.observe(ni);
    },
    [scrolling]
  );

  const getMoreNuts = () => {
    if (!token) return;

    let limit = 10;
    if (totalNuts !== 0) {
      // not first pass
      const nutsLeft = totalNuts - nutsData.length;
      limit = Math.min(10, nutsLeft);
    }
    if (limit === 0) return;

    let headers = { "Content-Type": "application/json" };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    fetch(
      `https://api.commercetools.co/nuts-custom-demo-1/products?offset=${currentPos}&limit=${limit}`,
      { headers }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTotalNuts(data.total);
        setNutsData((prev) => _.concat(prev, data.results));
        setScrolling(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setScrolling(false);
    getMoreNuts();
  }, [currentPos]);

  const hideNutsModal = () => setShowModal(false);
  const showNutsModal = (nut) => {
    setSelectedNut(nut);
    setShowModal(true);
  };

  const getNuts = () => {
    const hasData =
      nutsData &&
      nutsData.length > 0 &&
      !(nutsData.length === 1 && _.isUndefined(nutsData[0])); //  weird return from the API

    return hasData ? (
      nutsData.map((nut, i) => (
        <NutsItem
          key={nut.id}
          nut={nut}
          ShowModal={showNutsModal}
          lastNut={i === nutsData.length - 1}
          lastNutRef={lastNutRef}
        />
      ))
    ) : (
      <div style={{ color: "red" }}>{"token may be invalid"}</div>
    );
  };

  return (
    <>
      <div className="nutsPage">
        {token == null ? (
          <div style={{ color: "red" }}>
            {"Enter a valid token on the URL line: http://URL?token=<token>"}
          </div>
        ) : (
          <div className="nutsBox">{getNuts()}</div>
        )}
      </div>
      <NutsModal2
        nut={selectedNut}
        show={showModal}
        hideNutsModal={hideNutsModal}
      />
    </>
  );
};

export default Nuts;
