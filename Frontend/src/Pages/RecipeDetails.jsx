import React, { useEffect, useState } from "react";
import request from "../utility/request";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../app.module.css";

function RecipeDetails({ user }) {
  // recipe name, creator name, descriptions, image, ingredients with the amount, and the complete steps of preparation for that recipe.

  const [recipedata, setRecipedata] = useState({
    name: "",
    creator: "",
    description: "",
    image_url:"images/paratha.jpg",
    ingredients: [],
    steps: [],
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const getData = async () => {
    let response = await request.get(`/recipes/details/${id}`, true);
    if (response.success) {
      response = response.data;

      setRecipedata({
        name: response.name,
        creator: response.creator.name,
        description: response.desc,
        image_url: response.image_url,
        ingredients: [...response.ingredients],
        steps: [...response.process],
      });
    }
  };

  
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    getData();
  }, []);

  return (
  <div className={styles.details_container}>
    <div className={styles.card2}>
      <img src={`/${recipedata.image_url}`} alt="hello world" style={{width:"100%"}}/>
      <h1 className={styles.recipename}>{recipedata.name}</h1>
      <p className={styles.creator}>Created By {recipedata.creator}</p>
      <p className={styles.carddescription}>{recipedata.description}</p>

      <div className={styles.list}>
        <h3>Ingredients</h3>
        <ol>
          {recipedata.ingredients.map((data, index) => (
            <li key={index}>{`${data.items} - ${data.amount} ${data.unit}`}</li>
          ))}
        </ol>
      </div>

      <div className={styles.process}>
        <h3>Cooking Process</h3>
        <ol>
          {recipedata.steps.map((data, index) => (
            <li key={index}>{`${data.step}`}</li>
          ))}
        </ol>
      </div>
    </div>
  
  </div>
  );
}

export default RecipeDetails;
