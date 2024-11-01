/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function() {

  // Define template paths to load
  const templatePaths = [
    "systems/devastra/templates/actor/parts/character-statistiques.html",
    "systems/devastra/templates/actor/parts/character-items.html",
    "systems/devastra/templates/actor/parts/character-mandalas.html",
    "systems/devastra/templates/actor/parts/character-devastras.html",
    "systems/devastra/templates/actor/parts/character-chakras.html",
    "systems/devastra/templates/actor/parts/character-dharmas.html",
    "systems/devastra/templates/actor/parts/character-magies.html",
    "systems/devastra/templates/actor/parts/character-karmas.html",

    "systems/devastra/templates/actor/parts/npc-statistiques.html",
    "systems/devastra/templates/actor/parts/npc-magiesenseignementsnotes.html"

  ];

  // Load the template parts
  return loadTemplates(templatePaths);
};