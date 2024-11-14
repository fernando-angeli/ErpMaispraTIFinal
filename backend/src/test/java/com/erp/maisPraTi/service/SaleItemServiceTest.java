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

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

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
        // Dados para o teste
        Long saleId = 1L;
        Long productId = 1L;
        BigDecimal quantidadeVendida = new BigDecimal("5.0");
        BigDecimal precoVenda = new BigDecimal("100.0");

        SaleInsertItemDto saleInsertItemDto = new SaleInsertItemDto();
        saleInsertItemDto.setProductId(productId);
        saleInsertItemDto.setQuantitySold(quantidadeVendida);
        saleInsertItemDto.setSalePrice(precoVenda);

        SaleDto saleDto = new SaleDto();
        Sale sale = new Sale();
        sale.setId(saleId); // Inicializando a venda

        Product product = new Product();
        product.setId(productId); // Inicializando o produto
        product.setProductPrice(precoVenda); // Setando preço do produto

        // Inicializando corretamente o saleItemExistente
        SaleItem saleItemExistente = new SaleItem();
        saleItemExistente.setId(1L);
        saleItemExistente.setSalePrice(precoVenda);
        saleItemExistente.setQuantitySold(new BigDecimal("10.0"));
        saleItemExistente.setQuantityDelivered(new BigDecimal("2.0"));
        saleItemExistente.setSale(sale); // Inicializando com a venda
        saleItemExistente.setProduct(product); // Inicializando com o produto
        saleItemExistente.setUnitOfMeasure(UnitOfMeasure.UNIT); // Defina o unitOfMeasure corretamente

        SaleItemResponseDto saleItemResponseDto = new SaleItemResponseDto();

        // Configurando mocks corretamente
        Mockito.when(saleService.findById(saleId)).thenReturn(Optional.of(saleDto));
        Mockito.when(saleItemRepository.findByProductIdAndSaleIdAndSalePrice(productId, saleId, precoVenda))
                .thenReturn(Optional.of(saleItemExistente));
        Mockito.doNothing().when(productService).updateStockBySale(productId, quantidadeVendida);
        Mockito.when(saleItemRepository.save(Mockito.any(SaleItem.class))).thenReturn(saleItemExistente);
        Mockito.when(entityMapper.convertToDto(Mockito.any(SaleItem.class), Mockito.eq(SaleItemResponseDto.class)))
                .thenReturn(saleItemResponseDto);

        // Executando o método a ser testado
        SaleItemResponseDto resultado = saleItemService.insert(saleId, saleInsertItemDto);

        // Verificações
        Mockito.verify(saleItemRepository, Mockito.times(1))
                .findByProductIdAndSaleIdAndSalePrice(productId, saleId, precoVenda);
        Mockito.verify(productService, Mockito.times(1)).updateStockBySale(productId, quantidadeVendida);
        Mockito.verify(saleItemRepository, Mockito.times(1)).save(saleItemExistente);
        Mockito.verify(entityMapper, Mockito.times(1)).convertToDto(saleItemExistente, SaleItemResponseDto.class);

        // Assegurando que o retorno está correto
        assertNotNull(resultado);
        assertEquals(saleItemResponseDto, resultado);

        // Verificação adicional para garantir que o valor de `quantitySold` foi atualizado corretamente
        BigDecimal expectedQuantitySold = new BigDecimal("15.0"); // 10.0 + 5.0
        assertEquals(expectedQuantitySold, saleItemExistente.getQuantitySold());
    }




    @Test
    void deveInserirNovoItemDeVenda() {
        // Dado
        Mockito.when(saleService.findById(Mockito.anyLong())).thenReturn(Optional.of(new SaleDto()));
        Mockito.when(productService.findById(Mockito.anyLong())).thenReturn(Optional.of(new ProductDto()));
        Mockito.when(saleItemRepository.save(Mockito.any(SaleItem.class))).thenReturn(saleItem);

        // Quando
        SaleItemResponseDto response = saleItemService.insert(1L, saleInsertItemDto);

        // Então
        assertNotNull(response);
        assertEquals(saleItem.getId(), response.getId());
        assertEquals(saleItem.getQuantitySold(), response.getQuantitySold());
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
        assertEquals(saleItemUpdateDto.getQuantitySold(), response.getQuantitySold());
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
    void deveExcluirItemDeVenda() {
        // Dado
        Mockito.when(saleItemRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(saleItem));
        Mockito.doNothing().when(saleItemRepository).deleteById(Mockito.anyLong());

        // Quando
        saleItemService.delete(1L);

        // Então
        Mockito.verify(saleItemRepository, Mockito.times(1)).deleteById(Mockito.anyLong());
    }
}

