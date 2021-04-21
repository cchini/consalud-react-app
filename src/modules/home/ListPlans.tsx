import React from "react";
import cx from "classnames";
import css from "./listPlans.module.scss";

const ListPlans = (props) => {
  const { list } = props;
  if (!list) return null;

  return (
    <section className={cx(css.list_content)}>
      {list.map((item: any) => (
        <div
          className={cx(
            css.itemPlan,
            "container-row row--between row_align--center"
          )}
        >
          <div>{item?.code}</div>
          <div>{item?.name}</div>
          <div>{item?.price}</div>
        </div>
      ))}
    </section>
  );
};

export default ListPlans;
