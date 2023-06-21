export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');

  const formattedDateTime = `${day}-${month}-${year}, ${hour}:${minute}`;

  return formattedDateTime;
};
