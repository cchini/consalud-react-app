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
  const [error, setError] = useState(false);

  // Fetch get all plans
  const getAllPlans = async () => {
    try {
      const response = await fetch(`${API_URI}/plan`);
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        setPlans(message);
        throw new Error(message);
      }
      const plansResponse = await response.json();
      setPlans(plansResponse.data);
    } catch (error) {
      console.log("error", error);
      setError(true);
    }
  };

  const onSubmitSearch = async () => {
    try {
      const response = await fetch(`${API_URI}/plan/${salary}`);
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        setPlans(message);
        throw new Error(message);
      }
      const plansResponse = await response.json();
      setPlans(plansResponse.data);
    } catch (error) {
      console.log("error", error);
      setError(true);
    }
  };

  const handleSelect = async (plan: string) => {
    try {
      const data = { rut: rut, plan: plan };
      const variables = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };

      const response = await fetch(`${API_URI}/user`, variables);
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        console.log("error", message);
        throw new Error(message);
      }
      const isPost = await response.json();
      console.log(isPost);
    } catch (error) {
      console.log("error", error);
      setError(true);
    }
  };

  useEffect(() => {
    if (!plans) getAllPlans();
  });

  return (
    <>
      <Header />
      {!error && (
        <>
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
                onClick={onSubmitSearch}
                className={cx(css.cns_form__button, "col_3")}
                type="submit"
              >
                buscar
              </button>
            </div>
          </section>
          <ListPlans list={plans} onSelect={handleSelect} />
        </>
      )}
    </>
  );
};

export default Home;
