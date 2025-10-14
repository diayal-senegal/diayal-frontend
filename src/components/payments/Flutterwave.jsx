import React, { useState } from "react";
import PropTypes from "prop-types";

/**
 * Flutterwave.jsx
 * - Appelle ton backend: POST /api/payments/flutterwave/initialize
 * - Le backend renvoie { link } (URL de checkout Flutterwave)
 * - Le composant redirige l'utilisateur vers cette page (Orange/Wave/Free Money)
 *
 * Props:
 *  - orderId (string) : identifiant de la commande (OBLIGATOIRE)
 *  - onStart? () => void : callback au clic (optionnel)
 *  - onRedirect?(url: string) => void : callback avant redirection (optionnel)
 *  - onError?(message: string) => void : callback erreurs (optionnel)
 */
const Flutterwave = ({ orderId, onStart, onRedirect, onError }) => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const startPayment = async () => {
    if (!orderId) {
      const msg = "orderId manquant : impossible d'initialiser le paiement.";
      setErr(msg);
      onError?.(msg);
      return;
    }

    setLoading(true);
    setErr("");
    onStart?.();

    try {
      const res = await fetch("/api/payments/flutterwave/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      const data = await res.json();
      if (!res.ok) {
        const msg = data?.message || "Échec d'initialisation du paiement.";
        throw new Error(msg);
      }

      const link = data?.link;
      if (!link) {
        throw new Error("Aucun lien de paiement retourné par le serveur.");
      }

      onRedirect?.(link);
      // Redirection vers la page de paiement Flutterwave (Mobile Money)
      window.location.assign(link);
    } catch (e) {
      const msg = e?.message || "Une erreur est survenue.";
      setErr(msg);
      onError?.(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-4 py-8 bg-white shadow-sm rounded-xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-slate-800">Payer avec Mobile Money</h3>
          <p className="text-sm text-slate-500">
            Orange Money • Wave • Free Money (via Flutterwave)
          </p>
        </div>
        <button
          onClick={startPayment}
          disabled={loading || !orderId}
          className={`px-6 py-2 rounded-md text-white transition 
            ${loading || !orderId ? "bg-gray-400 cursor-not-allowed" : "bg-[#059473] hover:shadow-lg"}`}
        >
          {loading ? "Redirection..." : "Continuer"}
        </button>
      </div>

      {!orderId && (
        <p className="text-amber-600 text-sm mt-3">
          orderId introuvable — retourne au panier pour relancer la commande.
        </p>
      )}

      {err && <p className="text-red-600 text-sm mt-3">{err}</p>}

      <p className="text-xs text-slate-400 mt-4">
        Le montant final est vérifié côté serveur. Votre commande sera confirmée après validation du paiement.
      </p>
    </div>
  );
};

Flutterwave.propTypes = {
  orderId: PropTypes.string,
  onStart: PropTypes.func,
  onRedirect: PropTypes.func,
  onError: PropTypes.func,
};

export default Flutterwave;
