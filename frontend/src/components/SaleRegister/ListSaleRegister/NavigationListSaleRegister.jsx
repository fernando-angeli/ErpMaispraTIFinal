import { useEffect, useState } from "react";

function NavigationListClients({ contClientPages, setListClientsPage }) {
  const [listPageSelected, setListPageSelected] = useState(1);

  useEffect(() => {
    const selectedPageElement = document.getElementById(
      "pageClientList" + listPageSelected
    );

    if (selectedPageElement) {
      selectedPageElement.classList.add("active");

      return () => {
        selectedPageElement.classList.remove("active");
      };
    }
  }, [listPageSelected]);

  const handlePageClick = (page) => {
    setListPageSelected(page); // Atualiza o estado local
    setListClientsPage(page); // Atualiza o estado no componente pai
  };

  const goToNextPage = () => {
    if (listPageSelected < contClientPages) {
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

      {Array.from({ length: contClientPages }, (_, index) => {
        const pageNum = index + 1;
        return (
          <a
            key={pageNum}
            id={"pageClientList" + pageNum}
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

export default NavigationListClients;
