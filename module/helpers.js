import { DEVASTRA } from "./config.js";

export function registerHandlebarsHelpers() {




  Handlebars.registerHelper('select', function (selected, options) { 
    const escapedValue = RegExp.escape(Handlebars.escapeExpression(selected));
    const rgx = new RegExp(' value=[\"\']' + escapedValue + '[\"\']');
    const html = options.fn(this);
    return html.replace(rgx, "$& selected");    
  });

	Handlebars.registerHelper('isEnabled', function(configKey) {
		// const value = game.settings.get("devastra", configKey);
    let value;
		if (value === false || value === "none" || value === "") return false;
        return true;

	});



}