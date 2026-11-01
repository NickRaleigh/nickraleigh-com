// Ported from the original Overture frontend utils/helpers.js (generic, non-proprietary).

export function plurify(str, quantity, caps = false, customPluralRule = false) {
  let newStr = "";
  let pluralRule;

  if (customPluralRule) {
    pluralRule = caps ? customPluralRule.toUpperCase() : customPluralRule;
  } else {
    pluralRule = caps ? "S" : "s";
  }

  if (Array.isArray(quantity)) {
    newStr = str + ((quantity.length > 1 || quantity.length == 0) ? pluralRule : "");
    if (newStr.includes("%d")) {
      newStr = newStr.replace("%d", String(quantity.length));
    }
  } else if (typeof quantity == "number") {
    newStr = str + ((quantity > 1 || quantity == 0) ? pluralRule : "");
    if (newStr.includes("%d")) {
      newStr = newStr.replace("%d", String(quantity));
    }
  }
  return newStr;
}

// Builds a BEM modifier class string, e.g. classify("btn", { active: true })
// -> "btn btn--active".
export function classify(name, modifierObj) {
  let arr = [];
  Object.entries(modifierObj).forEach(([key, value]) => {
    if (value) {
      arr.push(key);
    }
  });
  return `${name} ${arr.map(x => `${name}--${x}`).join(" ")}`;
}
