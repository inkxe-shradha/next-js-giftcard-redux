export const formatDate = (date, format) => {
  if (date) {
    return moment(date).format(format);
  }
  return "";
};

export const randomColorGenerator = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const randomString = () => {
  const letters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let string = "";
  for (let i = 0; i < 6; i++) {
    string += letters[Math.floor(Math.random() * 26)];
  }
  return string;
};

export const checkedLoginUserAccessStatus = (email) => {
  return email && email.includes("admin") ? true : false;
};

export const getFilterURLStrings = (
  pageNumber = 1,
  limit = 20,
  filterBy = "all",
  sortBy = { type: "id", sortByOrder: "desc" },
  searchText = ""
) => {
  // JSON Server Pagination
  let filterString = "";
  if (filterBy === "All" && sortBy.type === "none") {
    filterString = `?_page=${pageNumber}&_limit=${limit}&_sort=id&_order=desc`;
  } else if (filterBy && sortBy.type === "none") {
    filterString = `?_page=${pageNumber}&_limit=${limit}&_sort=id&_order=desc&cardRetailer=${filterBy}`;
  } else if (sortBy.type !== "none" && filterBy === "All") {
    filterString = `?_page=${pageNumber}&_limit=${limit}&_sort=${sortBy.type}&_order=${sortBy.sortByOrder}`;
  } else if (sortBy.type !== "none" && filterBy !== "All") {
    filterString = `?_page=${pageNumber}&_limit=${limit}&_sort=${sortBy.type}&_order=${sortBy.sortByOrder}&cardRetailer=${filterBy}`;
  }

  if (searchText) {
    filterString += `&q=${searchText}`;
  }
  return filterString;
};
