import React, { useState } from "react";
import cx from "classnames";
import Header from "../../components/Header";
import "../../assets/scss/app.scss";
import css from "./home.module.scss";

const Home = () => {
  const [rut, setRut] = useState("");
  const [codePlan, setCodePlan] = useState("");

  const onSubmit = () => {
    console.log("onSubmit");
  };

  return (
    <>
      <Header />
      <section className={cx(css.cns_content)}>
        <div
          className={cx(
            css.cns_form,
            "container-row row--between row_align--center"
          )}
        >
          <input
            value={rut}
            className={cx(css.cns_form__input, "col_3")}
            type="text"
            placeholder="13.234.023-k"
            onChange={(event) => {
              setRut(event.target.value);
            }}
          />
          <input
            value={codePlan}
            className={cx(css.cns_form__input, "col_3")}
            type="text"
            placeholder="CTP-SS"
            onChange={(event) => {
              setCodePlan(event.target.value);
            }}
          />
          <button
            onClick={onSubmit}
            className={cx(css.cns_form__button, "col_3")}
            type="submit"
          >
            buscar
          </button>
        </div>
      </section>
    </>
  );
};

export default Home;
