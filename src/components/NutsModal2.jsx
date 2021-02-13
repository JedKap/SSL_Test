import React from "react";
import * as _ from "lodash";
import "./NutsModal.css";

const NutsModal2 = ({ nut, hideNutsModal, show }) => {
  const getImage = () => {
    let image =
      nut.masterData.current.masterVariant.images.length > 0
        ? nut.masterData.current.masterVariant.images[0].url
        : null;
    image = image
      ? image
      : "https://1b0bbb9e89b4713adcc7-aea4cee2cb18344b328e3a03eff3ec4f.ssl.cf1.rackcdn.com/ece4edb2868a8225.cro-U2aFaCJE.jpg";

    return (
      <div>
        <img className="modalNutImage" src={image} alt={""} />
      </div>
    );
  };

  const getBadgeImage = () => {
    const orgImage =
      "https://1b0bbb9e89b4713adcc7-aea4cee2cb18344b328e3a03eff3ec4f.ssl.cf1.rackcdn.com/5e85d71501308335-L2AE6hCf-thumb.jpg";
    let organic = nut.masterData.current.masterVariant.attributes.find(
      (x) => _.toLower(x.name) === "organic"
    );
    const img = organic && organic.value === true && (
      <img src={orgImage} alt={""} />
    );

    return img;
  };

  const getPrice = () => {
    // assuming we're only display USD
    const priceObj = nut.masterData.current.masterVariant.prices.find(
      (p) => p.value.currencyCode === "USD" // assuming we want USD
    );
    const price = priceObj
      ? (
          priceObj.value.centAmount /
          Math.pow(10, priceObj.value.fractionDigits)
        ).toFixed(priceObj.value.fractionDigits)
      : "N/A";

    return `$${price}`;
  };

  const getDescription = () => {
    // not reliable data
    try {
      return nut.masterData.current.description.en;
    } catch (error) {
      return "nut.masterData.current.name.en"; // use the name if description is missing
    }
  };

  return (
    nut && (
      <div
        className={
          show ? "nuts-modal display-block" : "nuts-modal display-none"
        }
      >
        <div className="nuts-modal-main" OnBlur={hideNutsModal}>
          <div className="modalContent">
            <div className="modalBadge">{getBadgeImage()}</div>
            <div className="modal-top">
              <div style={{ paddingLeft: "5px" }}>
                {nut.masterData.current.name.en}
              </div>
            </div>
            <div className="modal-body">
              <div className="nuts-left-body">
                <div style={{ flex: "1" }}>{getImage()}</div>
                <div className="modalPrice">{getPrice()}</div>
                <div>
                  <button
                    className="modalButton"
                    type="button"
                    onClick={hideNutsModal}
                  >
                    Close
                  </button>
                </div>
              </div>
              <div className="nuts-description">{getDescription()}</div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default NutsModal2;
