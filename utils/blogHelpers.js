import { format, parse } from "date-fns";
import { es } from "date-fns/locale";
import authors from "../utils/authors.json";
import { useState } from "react";

export function getAuthorData(userName) {
  return userName && authors.hasOwnProperty(userName.toLowerCase())
    ? authors[userName]
    : authors["tt"];
}

export function getAuthorImage(imageName) {
  if (!imageName || imageName.includes("default")) {
    return `url(img/generic.png)`;
  }

  return `url(img/authors/${imageName})`;
}

export function getFormattedPublishDate(date) {
  const validDate = parse(date, "yyyy-mm-dd", new Date());
  const formattedDate = format(validDate, "dd MMM. yyyy", {
    locale: es,
  });

  return formattedDate;
}

export function orderByDate(prev, current) {
  return new Date(current.publishDate) - new Date(prev.publishDate);
}

export function usePagination(data, itemsPerPage) {
  const [currentPage, setCurrentPage] = useState(1);

  const maxPage = Math.ceil(data.length / itemsPerPage);

  const currentData = () => {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(null, end);
  };

  const next = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  };

  return { next, currentData, currentPage, maxPage };
}
