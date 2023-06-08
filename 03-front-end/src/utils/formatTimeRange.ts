export const formatTimeRange = (startTime: string, endTime: string): string => {
  const start = new Date(startTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  const end = new Date(endTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  return `${start} - ${end}`;
};
