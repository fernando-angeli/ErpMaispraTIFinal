import { useEffect, useState } from "react";

function NavigationListEmployees({ contEmployeePages, setListEmployeesPage }) {
  const [listPageSelected, setListPageSelected] = useState(1);

  useEffect(() => {
    const selectedPageElement = document.getElementById(
      "pageEmployeeList" + listPageSelected
    );

    if (selectedPageElement) {
      selectedPageElement.classList.add("active");

      return () => {
        selectedPageElement.classList.remove("active");
      };
    }
  }, [listPageSelected]);

  const handlePageClick = (page) => {
    setListPageSelected(page); 
    setListEmployeesPage(page); 
  };

  const goToNextPage = () => {
    if (listPageSelected < contEmployeePages) {
      handlePageClick(listPageSelected + 1);
    }
  };

  const goToPreviousPage = () => {
    if (listPageSelected > 1) {
      handlePageClick(listPageSelected - 1);
    }
  };

  return (
    <>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          goToPreviousPage();
        }}
      >
        ❮
      </a>

      {Array.from({ length: contEmployeePages }, (_, index) => {
        const pageNum = index + 1;
        return (
          <a
            key={pageNum}
            id={"pageEmployeeList" + pageNum}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageClick(pageNum);
            }}
          >
            {pageNum}
          </a>
        );
      })}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          goToNextPage();
        }}
      >
        ❯
      </a>
    </>
  );
}

export default NavigationListEmployees;
