"use client";

import { deleteRecette } from "@/lib/deleteRecipe";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "@/app/recettes/recette.module.css";
import { recipeModel } from "@/model/recipeModel";
import EditRecetteModal from "./EditRecetteForm";

export default function RecetteCard({ recipe }: { recipe: recipeModel }) {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const message = await deleteRecette(recipe.id);
      alert(message);
      router.refresh();
    } catch (error) {
      alert("Erreur : " + (error as Error).message);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const handleEditSuccess = () => {
    setShowEditModal(false);
    router.refresh();
  };

  return (
    <>
      <div className={styles.recipeCard}>
        <img src={recipe.photo} alt={recipe.name} className={styles.image} />
        <h2 className={styles.title}>{recipe.name}</h2>
        <p className={styles.country}>Origine : {recipe.country}</p>
        <p className={styles.ingredients}>Ingrédients : {recipe.ingredients}</p>
        <p className={styles.instructions}>
          Instructions : {recipe.instructions}
        </p>
        <button
          className={styles.editButton}
          onClick={() => setShowEditModal(true)}
        >
          Editer
        </button>
        <button
          className={styles.deleteButton}
          onClick={() => setShowDeleteModal(true)}
        >
          Supprimer
        </button>
      </div>

      {/* Modal d'édition */}
      <EditRecetteModal
        recipe={recipe}
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSuccess={handleEditSuccess}
      />

      {/* Modal de suppression */}
      {showDeleteModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowDeleteModal(false)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3>Confirmer la suppression</h3>
            <p>
              Êtes-vous sûr de vouloir supprimer la recette "{recipe.name}" ?
            </p>
            <div className={styles.modalButtons}>
              <button
                className={styles.cancelButton}
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
              >
                Annuler
              </button>
              <button
                className={styles.confirmButton}
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Suppression..." : "Supprimer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
