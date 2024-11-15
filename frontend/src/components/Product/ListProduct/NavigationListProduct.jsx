import { useEffect, useState } from "react";

function NavigationListProduct({ contProductPages, setListProductPage }) {
  const [listPageSelected, setListPageSelected] = useState(1);

  useEffect(() => {
    const selectedPageElement = document.getElementById(
      "pageProductList" + listPageSelected
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
    setListProductPage(page); // Atualiza o estado no componente pai
  };

  const goToNextPage = () => {
    if (listPageSelected < contProductPages) {
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

      {Array.from({ length: contProductPages }, (_, index) => {
        const pageNum = index + 1;
        return (
          <a
            key={pageNum}
            id={"pageProductList" + pageNum}
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

export default NavigationListProduct;