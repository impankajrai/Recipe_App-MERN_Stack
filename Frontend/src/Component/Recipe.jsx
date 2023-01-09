import React from "react";
import styles from "../app.module.css";
import { Link } from "react-router-dom";

function Recipe({data}) {
  return (
    <Link to={`/recipe/${data._id}`} className={styles.card}>
      <img
        src={data.image_url}
        alt="Recipe"
        style={{width:"100%"}}
      />
      <h1 className={styles.recipename}>{data.name}</h1>
      <p className={styles.creator}>{data.creator_id.name}</p>
      <p className={styles.carddescription}>{data.desc}</p>
    </Link>
  );
}

export default Recipe;
