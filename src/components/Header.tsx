import React from "react";
import css from "./header.module.scss";

//
const Header = () => (
  <header className={css.cns_header}>
    <figure className={css.cns_header_image}>
      <img src="https://www.consalud.cl/assets/img/iconos/logo-consalud.png" />
    </figure>
    <div></div>
  </header>
);

export default Header;
