"use client";

import { useState } from "react";
import styles from "./AddRecetteForm.module.css";

export default function AddRecetteForm() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    photo: "",
    country: "",
    ingredients: "",
    instructions: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await fetch("/api/recette", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Recette ajoutée !");
      setFormData({
        name: "",
        photo: "",
        country: "",
        ingredients: "",
        instructions: "",
      });
      setShowForm(false);
    } else {
      alert("Erreur : " + data.error);
    }
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.toggleButton}
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Annuler" : "Ajouter une recette"}
      </button>

      {showForm && (
        <div className={styles.formGroup}>
          <input
            name="name"
            placeholder="Nom"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            name="photo"
            placeholder="URL de l'image"
            value={formData.photo}
            onChange={handleChange}
          />
          <input
            name="country"
            placeholder="Pays"
            value={formData.country}
            onChange={handleChange}
          />
          <input
            name="ingredients"
            placeholder="Ingrédients"
            value={formData.ingredients}
            onChange={handleChange}
          />
          <textarea
            name="instructions"
            placeholder="Instructions"
            value={formData.instructions}
            onChange={handleChange}
          />

          <button className={styles.submitButton} onClick={handleSubmit}>
            Valider
          </button>
        </div>
      )}
    </div>
  );
}
