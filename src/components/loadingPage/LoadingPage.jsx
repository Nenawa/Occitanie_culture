import React from "react";

import { InfinitySpin } from "react-loader-spinner";
import Logo from "../../assets/img/windows.png";

import "./loadingPage.css";

function LoadingPage() {
  return (
    <div className="contentWindow">
      <img className="windows" src={Logo} alt="Logo" />
      <InfinitySpin width="200" color="#00ADEE" />
    </div>
  );
}

export default LoadingPage;
