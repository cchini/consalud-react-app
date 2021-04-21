import React, { useState, useEffect } from "react";
import cx from "classnames";
import Header from "../../components/Header";
import ListPlans from "./ListPlans";
import "../../assets/scss/app.scss";
import css from "./home.module.scss";

const API_URI = process.env.REACT_APP_API_NODE;

const Home = () => {
  const [rut, setRut] = useState("");
  const [salary, setSalary] = useState("");
  const [plans, setPlans] = useState(null);

  // Fetch get all plans
  const getAllPlans = async () => {
    const response = await fetch(`${API_URI}/plan`);
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      setPlans(message);
      throw new Error(message);
    }
    const plansResponse = await response.json();
    setPlans(plansResponse.data);
  };

  const onSubmit = () => {
    console.log("onSubmit");
  };

  useEffect(() => {
    if (!plans) getAllPlans();
  });

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
            value={salary}
            className={cx(css.cns_form__input, "col_3")}
            type="text"
            placeholder="1000000"
            onChange={(event) => {
              setSalary(event.target.value);
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
      <ListPlans list={plans} />
    </>
  );
};

export default Home;
