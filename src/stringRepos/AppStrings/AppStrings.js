/* PLOP_INJECT_IMPORT */
//import * as Localization from "expo-localization";
import i18n from "i18n-js";

/**
 * AppStrings
 * est une bibliothèque de strings multilingues
 *
 * il faut initialiser cette bibliothèque dans App.js,
 * avec la fonction d'init
 *
 */

// les strings selon pays
i18n.translations = {
  src: {
    /* PLOP_INJECT_SRC_STRING */
    welcome: "Bonjour",
    country: "fr",
    xnPkyJUf: `Je vais t'aider mon chou ! Je vais te donner mon nom:`,
    xJLDlRfb: `Quantité de tokens disponibles pour la réponse de monsieur GPT:`,
    x7CTz5XP: "Traduction d'objet en cours...",
    xWtfTMu: `\nTraduction de texte en cours.... Veuillez patienter svp...\n`,
    x8H4nyVx: `Tentative n°`,
    xlqZy0Sf: `Traduction de texte réussie !`,

    /* PLOP_INJECT_SRC_END */
  },
  /* PLOP_INJECT_INTL_STRINGS */
};

/**
 * la fonction d'init de répertoire de strings
 */
const AppStrings = () => {
  console.log(
    "Cette function d'init de répertoire doit run 1 seule fois. TODO: implémente localization sans expo-loc"
  );

  // Set the locale once
  // at the beginning of your app.
  //i18n.locale = Localization.locale;
  i18n.defaultLocale = "src";

  // When a value is missing from a language,
  // it'll fallback to another language with the key present.
  i18n.fallbacks = true;
};

export { AppStrings };
