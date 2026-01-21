"use client";

import { useState } from "react";
import styles from "./AddRecetteForm.module.css"; // Réutilise le même CSS
import { recipeModel } from "@/model/recipeModel";

interface EditRecetteModalProps {
  recipe: recipeModel;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditRecetteModal({
  recipe,
  isOpen,
  onClose,
  onSuccess,
}: EditRecetteModalProps) {
  const [formData, setFormData] = useState({
    name: recipe.name,
    photo: recipe.photo,
    country: recipe.country,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/recette/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, id: recipe.id }),
      });
      console.log(response);

      if (!response.ok) {
        throw new Error("Erreur lors de la modification");
      }

      alert("Recette modifiée avec succès !");
      onSuccess();
    } catch (error) {
      alert("Erreur : " + (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.formContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Modifier la recette</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nom de la recette</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="photo">URL de la photo</label>
            <input
              type="text"
              id="photo"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="country">Pays d'origine</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="ingredients">Ingrédients</label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              rows={4}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              rows={6}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.buttonGroup}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
              disabled={isSubmitting}
            >
              Annuler
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "En cours..." : "Modifier"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
