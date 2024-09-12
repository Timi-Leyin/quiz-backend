export const getLastMonth = () => {
  const currentMonth = new Date().getMonth();
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const currentYear = new Date().getFullYear();
  const lastMonthYear = lastMonth === 11 ? currentYear - 1 : currentYear;

  return {
    currentMonth,
    lastMonth,
    lastMonthYear,
    currentYear,
  };
};

export const expiryInDays = (
  date: Date | string | number,
  days: number,
  hours?: number,
  minutes?: number
) => {
  // const d = new Date(date);
  // const nextNdays = d.setDate(new Date(d).getDate() + days);
  // const isExpired =
  //   new Date(nextNdays).toDateString() > new Date().toDateString();
  // return isExpired;

  const d = new Date(date);
  d.setDate(d.getDate() + days);
  d.setHours(d.getHours() + (hours || 0));
  d.setMinutes(d.getMinutes() + (minutes || 0));
  const isExpired = d > new Date();
  return isExpired;
};


export const isMoreThanNMinutes = (date: Date | string | number, min:number) => {
  const givenDate = new Date(date);
  const currentDate = new Date();
  
  // Calculate the difference in milliseconds
  const diffInMilliseconds = givenDate.getTime() - currentDate.getTime();
  
  const diffInMinutes = diffInMilliseconds / (1000 * 60);
  
  return diffInMinutes > min;
};