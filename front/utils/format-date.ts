const getOrdinalSuffix = (day: number): string => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

export const formatPublishedDate = (
  isoDate: string,
  timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
): string => {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;

  const day = Number(new Intl.DateTimeFormat('en-US', { day: 'numeric', timeZone }).format(date));
  const month = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    timeZone,
  }).format(date);
  const time = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
    timeZone,
  }).format(date);
  const offset =
    new Intl.DateTimeFormat('en-US', {
      timeZoneName: 'shortOffset',
      timeZone,
    })
      .formatToParts(date)
      .find(part => part.type === 'timeZoneName')?.value ?? '';

  return `${month} ${day}${getOrdinalSuffix(day)} ${time} (${offset.replace('UTC', 'GMT')})`;
};
