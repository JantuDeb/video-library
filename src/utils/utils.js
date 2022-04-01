export const formatedDate = (date) =>
new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(
  new Date(date)
);