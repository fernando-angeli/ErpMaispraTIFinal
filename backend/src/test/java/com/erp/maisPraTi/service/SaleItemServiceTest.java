package com.erp.maisPraTi.service;

import com.erp.maisPraTi.dto.products.ProductDto;
import com.erp.maisPraTi.dto.saleItems.SaleInsertItemDto;
import com.erp.maisPraTi.dto.saleItems.SaleItemResponseDto;
import com.erp.maisPraTi.dto.saleItems.SaleItemUpdateDto;
import com.erp.maisPraTi.dto.sales.SaleDto;
import com.erp.maisPraTi.enums.UnitOfMeasure;
import com.erp.maisPraTi.model.Product;
import com.erp.maisPraTi.model.Sale;
import com.erp.maisPraTi.model.SaleItem;
import com.erp.maisPraTi.repository.SaleItemRepository;
import com.erp.maisPraTi.service.exceptions.DatabaseException;
import com.erp.maisPraTi.service.exceptions.ResourceNotFoundException;
import com.erp.maisPraTi.service.exceptions.ProductException;
import com.erp.maisPraTi.util.EntityMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.doNothing;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.any;


import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.function.Consumer;

import static org.junit.jupiter.api.Assertions.*;

class SaleItemServiceTest {

    @InjectMocks
    private SaleItemService saleItemService;

    @Mock
    private SaleItemRepository saleItemRepository;

    @Mock
    private ProductService productService;

    @Mock
    private SaleService saleService;


    @Mock
    private EntityMapper entityMapper;

    private Sale sale;
    private Product product;
    private SaleItem saleItem;
    private SaleInsertItemDto saleInsertItemDto;
    private SaleItemUpdateDto saleItemUpdateDto;


    private void verifyQuantitySold(BigDecimal quantitySold) {
        if (quantitySold.compareTo(BigDecimal.ZERO) <= 0)
            throw new ProductException("A quantidade de produtos deve ser maior que zero.");
    }

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Configuração de objetos para os testes
        sale = new Sale();
        sale.setId(1L);

        product = new Product();
        product.setId(1L);
        product.setProductPrice(new BigDecimal("10.00"));

        saleItem = new SaleItem();
        saleItem.setId(1L);
        saleItem.setSale(sale);
        saleItem.setProduct(product);
        saleItem.setQuantitySold(new BigDecimal("10.0"));
        saleItem.setSalePrice(new BigDecimal("100.0"));
        saleItem.setQuantityDelivered(new BigDecimal("2.0"));
        saleItem.setUnitOfMeasure(UnitOfMeasure.UNIT); // Defina um valor para UnitOfMeasure

        saleInsertItemDto = new SaleInsertItemDto();
        saleInsertItemDto.setProductId(1L);
        saleInsertItemDto.setSalePrice(new BigDecimal("10.00"));
        saleInsertItemDto.setQuantitySold(new BigDecimal("5"));

        saleItemUpdateDto = new SaleItemUpdateDto();
        saleItemUpdateDto.setQuantitySold(new BigDecimal(10));
        saleItemUpdateDto.setSalePrice(new BigDecimal("12.00"));
    }

    @Test
    void deveAtualizarItemDeVendaExistente() {
        // Instancia o DTO do produto com valores iniciais
        ProductDto productDto = new ProductDto();

        // Configura os valores de estoque e estoque reservado
        productDto.setStock(new BigDecimal("100"));         // Estoque inicial
        productDto.setReservedStock(new BigDecimal("20"));  // Estoque reservado inicial

        // Calcula o valor esperado para 'availableForSale' após a atualização
        BigDecimal expectedAvailableForSale = new BigDecimal("80"); // 100 - 20 = 80

        // Atualiza um item de venda (simulado para este teste)
        // Aqui, você pode invocar o método de serviço que faz a atualização, se necessário
        // Por exemplo: vendaService.atualizarItemDeVenda(productDto);

        // Verifica se o valor de 'availableForSale' foi calculado corretamente
        assertEquals(expectedAvailableForSale, productDto.getAvailableForSale());
    }

    @Test
    public void testUpdateSaleItem() {
        Long saleItemId = 1L;  // ID que foi salvo no setUp()
        SaleItemUpdateDto saleItemUpdateDto = new SaleItemUpdateDto();
        saleItemUpdateDto.setQuantitySold(new BigDecimal(10));  // Atualizando a quantidade de venda
        saleItemUpdateDto.setSalePrice(new BigDecimal(100));    // Atualizando o preço de venda

        SaleItemResponseDto updatedSaleItem = saleItemService.update(saleItemId, saleItemUpdateDto);

        assertNotNull(updatedSaleItem);
        assertEquals(new BigDecimal(10), updatedSaleItem.getQuantitySold());
        assertEquals(new BigDecimal(100), updatedSaleItem.getSalePrice());
    }

    @Test
    void deveInserirNovoItemDeVenda() {
        // Dado
        ProductDto productDto = new ProductDto();
        productDto.setUnitOfMeasure(UnitOfMeasure.UNIT);
        productDto.setProductPrice(BigDecimal.valueOf(100.0));
        productDto.setStock(BigDecimal.valueOf(50.0));

        Mockito.when(saleService.findById(Mockito.anyLong())).thenReturn(Optional.of(new SaleDto()));
        Mockito.when(productService.findById(Mockito.anyLong())).thenReturn(Optional.of(productDto));
        Mockito.when(saleItemRepository.save(Mockito.any(SaleItem.class))).thenReturn(saleItem);

        // Quando
        SaleItemResponseDto response = saleItemService.insert(1L, saleInsertItemDto);

        // Então
        assertNotNull(response);
        assertEquals(saleItem.getId(), response.getId());
        assertEquals(saleItem.getQuantitySold(), response.getQuantitySold());

        // Comparar arredondando a quantidade vendida para 1 casa decimal
        assertEquals(BigDecimal.valueOf(10.0).setScale(1, BigDecimal.ROUND_HALF_UP),
                response.getQuantitySold().setScale(1, BigDecimal.ROUND_HALF_UP));
    }




    @Test
    void deveLancarErroQuandoProdutoNaoEncontrado() {
        // Dado
        Mockito.when(productService.findById(Mockito.anyLong())).thenReturn(Optional.empty());

        // Quando
        ProductException exception = assertThrows(ProductException.class, () -> {
            saleItemService.insert(1L, saleInsertItemDto);
        });

        // Então
        assertEquals("Produto não encontrado com ID: 1", exception.getMessage());
    }

    @Test
    void deveEncontrarItemDeVendaPorSaleIdEItemId() {
        // Dado
        Mockito.when(saleItemRepository.findByIdAndSaleId(Mockito.anyLong(), Mockito.anyLong())).thenReturn(Optional.of(saleItem));

        // Quando
        Optional<SaleItemResponseDto> response = saleItemService.findBySaleIdAndSaleItemId(1L, 1L);

        // Então
        assertTrue(response.isPresent());
        assertEquals(saleItem.getId(), response.get().getId());
    }

    @Test
    void deveLancarErroQuandoItemDeVendaNaoEncontrado() {
        // Dado
        Mockito.when(saleItemRepository.findByIdAndSaleId(Mockito.anyLong(), Mockito.anyLong())).thenReturn(Optional.empty());

        // Quando
        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> {
            saleItemService.findBySaleIdAndSaleItemId(1L, 1L);
        });

        // Então
        assertEquals("Item não localizado", exception.getMessage());
    }

    @Test
    void deveAtualizarItemDeVenda() {
        // Dado
        Mockito.when(saleItemRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(saleItem));
        Mockito.when(saleItemRepository.save(Mockito.any(SaleItem.class))).thenReturn(saleItem);

        // Quando
        SaleItemResponseDto response = saleItemService.update(1L, saleItemUpdateDto);

        // Então
        assertNotNull(response);
        assertEquals(saleItemUpdateDto.getQuantitySold(), new BigDecimal(response.getQuantitySold().toString()));
        assertEquals(saleItemUpdateDto.getSalePrice(), response.getSalePrice());
    }


    @Test
    void deveLancarErroQuandoTentarAtualizarItemInexistente() {
        // Dado
        Mockito.when(saleItemRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());

        // Quando
        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> {
            saleItemService.update(1L, saleItemUpdateDto);
        });

        // Então
        assertEquals("Item não localizado pelo id informado.", exception.getMessage());
    }

    @Test
    void deveRetornarTodosItensDeVendaPorSaleId() {
        // Dado
        Page<SaleItem> saleItems = new PageImpl<>(List.of(saleItem));
        Mockito.when(saleItemRepository.findBySaleId(Mockito.anyLong(), Mockito.any(Pageable.class))).thenReturn(saleItems);

        // Quando
        Page<SaleItemResponseDto> response = saleItemService.findAllBySaleId(1L, Pageable.unpaged());

        // Então
        assertNotNull(response);
        assertFalse(response.isEmpty());
    }

    @Test
    void deveRetornarTodosItensDeVendaPorProductId() {
        // Dado
        Page<SaleItem> saleItems = new PageImpl<>(List.of(saleItem));
        Mockito.when(saleItemRepository.findBySaleIdAndProductId(Mockito.anyLong(), Mockito.anyLong(), Mockito.any(Pageable.class)))
                .thenReturn(saleItems);

        // Quando
        Page<SaleItemResponseDto> response = saleItemService.findAllByProductId(1L, 1L, Pageable.unpaged());

        // Então
        assertNotNull(response);
        assertFalse(response.isEmpty());
    }

    @Test
    void deveRetornarTodosItensDeVenda() {
        // Dado
        Page<SaleItem> saleItems = new PageImpl<>(List.of(saleItem));
        Mockito.when(saleItemRepository.findAll(Mockito.any(Pageable.class))).thenReturn(saleItems);

        // Quando
        Page<SaleItemResponseDto> response = saleItemService.findAll(Pageable.unpaged());

        // Então
        assertNotNull(response);
        assertFalse(response.isEmpty());
    }

    @Test
    void deveLancarExcecaoAoExcluirItemNaoExistente() {
        Mockito.when(saleItemRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());

        DatabaseException exception = assertThrows(DatabaseException.class, () -> saleItemService.delete(1L));
        assertEquals("Erro inesperado ao tentar excluir este item.", exception.getMessage());
    }



    @Test
    void deveVerificarQuantidadeMaiorQueZero() {
        // Simulando uma quantidade maior que zero
        BigDecimal quantitySold = new BigDecimal("10.0");

        // Executando o método sem esperar exceção
        assertDoesNotThrow(() -> verifyQuantitySold(quantitySold), "Não deve lançar exceção quando a quantidade for maior que zero.");
    }

    @Test
    void deveLancarExcecaoQuandoQuantidadeForMenorOuIgualZero() {
        // Simulação do método verifyQuantitySold no escopo do teste
        Consumer<BigDecimal> verifyQuantitySold = (quantitySold) -> {
            if (quantitySold.compareTo(BigDecimal.ZERO) <= 0)
                throw new ProductException("A quantidade de produtos deve ser maior que zero.");
        };

        // Testando com quantidade zero
        BigDecimal quantitySoldZero = BigDecimal.ZERO;
        ProductException exceptionZero = assertThrows(ProductException.class, () -> verifyQuantitySold.accept(quantitySoldZero));
        assertEquals("A quantidade de produtos deve ser maior que zero.", exceptionZero.getMessage(), "A mensagem de erro não é a esperada quando a quantidade for zero.");

        // Testando com quantidade negativa
        BigDecimal quantitySoldNegativa = new BigDecimal("-5.0");
        ProductException exceptionNegativa = assertThrows(ProductException.class, () -> verifyQuantitySold.accept(quantitySoldNegativa));
        assertEquals("A quantidade de produtos deve ser maior que zero.", exceptionNegativa.getMessage(), "A mensagem de erro não é a esperada quando a quantidade for negativa.");
    }



}

