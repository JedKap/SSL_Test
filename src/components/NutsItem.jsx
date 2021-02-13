import React from "react";
import "./nutsBox.css";

const NutsItem = (props) => {
  const { nut, ShowModal, lastNut, lastNutRef } = props;

  const getImage = () => {
    let image =
      nut.masterData.current.masterVariant.images.length > 0
        ? nut.masterData.current.masterVariant.images[0].url
        : null;
    image = image
      ? image
      : "https://1b0bbb9e89b4713adcc7-aea4cee2cb18344b328e3a03eff3ec4f.ssl.cf1.rackcdn.com/ece4edb2868a8225.cro-U2aFaCJE-thumb.jpg";

    return <img className="nutsImage" src={image} alt={""} />;
  };

  return lastNut ? (
    <div ref={lastNutRef} className="nutsItem" onClick={() => ShowModal(nut)}>
      <span>{getImage()}</span>
      <div className="nutsText">{nut.masterData.current.name.en}</div>
    </div>
  ) : (
    <div
      className={`nutsItem ${lastNut && "lastNut"}`}
      onClick={() => ShowModal(nut)}
    >
      <span>{getImage()}</span>
      <div className="nutsText">{nut.masterData.current.name.en}</div>
    </div>
  );
};

export default NutsItem;
