

export const getFirstDayFromMonth = ():string => {
  const today = new Date();

  return new Date(new Date().setDate(today.getDate() - 30))
    .toISOString()
    .split("T")[0];
};


export const getdaysFromCertainDate = (date:string):number => {
  const today = new Date();
  const SelectedDate = new Date(date);
  const diffTime = Math.abs(+today - +SelectedDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
