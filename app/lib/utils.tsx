const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
const truncateEthAddress = (address: string, half?: "first" | "second") => {
  if (address) {
    const match = address.match(truncateRegex);
    if (!match) return address;
    if (half === "first") return `${match[1]}...`;
    if (half === "second") return match[2];
    return `${match[1]}…${match[2]}`;
  }
};

const units: { unit: Intl.RelativeTimeFormatUnit; secondsInUnit: number }[] = [
  { unit: "year", secondsInUnit: 31536000 },
  { unit: "month", secondsInUnit: 2628000 },
  { unit: "day", secondsInUnit: 86400 },
  { unit: "hour", secondsInUnit: 3600 },
  { unit: "minute", secondsInUnit: 60 },
  { unit: "second", secondsInUnit: 1 },
];

const getTimeRemaining = (timestamp: number) => {
  const rtf = new Intl.RelativeTimeFormat();
  const secondsRemaining = timestamp - Date.now() / 1000;

  for (const { unit, secondsInUnit } of units) {
    if (Math.abs(secondsRemaining) >= secondsInUnit || unit === "second") {
      return rtf.format(Math.floor(secondsRemaining / secondsInUnit), unit);
    }
  }

  return "";
};

export { truncateEthAddress, getTimeRemaining };
