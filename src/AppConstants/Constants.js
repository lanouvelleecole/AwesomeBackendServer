/* PLOP_INJECT_IMPORT */
//import React from "react";

const chatModels = ["gpt-4", "gpt-4-32k", "gpt-3.5-turbo"];
const completionModels = ["text-davinci-003"];

/**
 * Ici, on stocke les constantes utiles dans notre template de question
 */
const Constants = {
  completionModels: completionModels,

  chatModels: chatModels,

  allModels: completionModels.concat(chatModels),

  modelsMaxTokens: {
    "gpt-4": 8192,
    "gpt-4-32k": 16394,
    "gpt-3.5-turbo": 4096,
    "text-davinci-003": 4096,
  },
  exts: [".js", ".ts", ".jsx", ".tsx"],
  ignoreList: ["node_modules", ".git", ".svn", ".hg", ".idea"],
  only_first: "only-first",
  maxChoices: 50,
  pathAbsolu: "Path absolu",
  pathRelatif: "Path relatif",
  returnLine: "Avec ligne return",
  noReturnLine: "Sans ligne return",
  yes: "Oui",
  no: "Non",
  regeneration_command: `npx maslow regen-ai-func`,

  cloudinary_cloud_name: "<cloudinary_cloud_name>",
  cloudinary_upload_preset: "<cloudinary_upload_preset>",
  cloudinary_api_key: "<cloudinary_api_key>",
  cloudinary_api_secret: "<cloudinary_api_secret>",
  OPENAI_API_KEY: "<OPENAI_API_KEY>",
};

export { Constants };
