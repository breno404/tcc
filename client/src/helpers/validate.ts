function exists(text: string) {
  return text != "" && text != undefined && text != null ? true : false;
}

type RequirementsProps = {
  minLenght?: number;
  maxLenght?: number;
  specialChar?: boolean;
  digits?: boolean;
  digitsLength?: number;
};

function has(text: string, requirements: RequirementsProps) {
  const notRequire: { requirement: string; message: string }[] = [];

  if (requirements.minLenght) {
    if (text.length < requirements.minLenght)
      notRequire.push({ requirement: "minLenght", message: "" });
  }
  if (requirements.maxLenght) {
    if (text.length > requirements.maxLenght)
      notRequire.push({ requirement: "maxLenght", message: "" });
  }
  if (requirements.specialChar) {
    const regex = /[\!\@\#\$\%\&\*]/;
    if (text.search(regex) == -1)
      notRequire.push({ requirement: "specialChar", message: "" });
  }
  if (requirements.digits) {
    const regex = /\d+/;
    if (text.search(regex) == -1)
      notRequire.push({ requirement: "digits", message: "" });
  }
  if (requirements.digitsLength) {
    const regex = /\d/;
    const arrayMatch = text.match(regex) || [];
    console.log(arrayMatch);
    if (arrayMatch.length < requirements.digitsLength)
      notRequire.push({ requirement: "digitsLength", message: "" });
  }

  return notRequire;
}

export default { exists, has };
