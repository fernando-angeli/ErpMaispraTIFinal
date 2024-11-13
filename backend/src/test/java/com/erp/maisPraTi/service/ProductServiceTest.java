package com.erp.maisPraTi.service;

import com.erp.maisPraTi.dto.partyDto.suppliers.SupplierDto;
import com.erp.maisPraTi.dto.partyDto.suppliers.SupplierSimpleDto;
import com.erp.maisPraTi.dto.products.ProductDto;
import com.erp.maisPraTi.dto.products.ProductUpdateDto;
import com.erp.maisPraTi.fixture.ProductFixture;
import com.erp.maisPraTi.model.Product;
import com.erp.maisPraTi.repository.ProductRepository;
import com.erp.maisPraTi.service.exceptions.DatabaseException;
import com.erp.maisPraTi.service.exceptions.InvalidValueException;
import com.erp.maisPraTi.service.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProductServiceTest {

    @InjectMocks
    private ProductService productService;

    @Mock
    private ProductRepository productRepository;

    @Mock
    private SupplierService supplierService;
    private Product product;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void deveInserirProdutoComSucesso() {
        ProductDto productDto = new ProductDto();
        productDto.setName("Produto Exemplo");
        productDto.setProductPrice(new BigDecimal("150.00"));

        Product product = ProductFixture.productFixture();
        when(productRepository.save(any(Product.class))).thenReturn(product);

        ProductDto result = productService.insert(productDto);

        assertNotNull(result);
        assertEquals("Produto Exemplo", result.getName());
    }

    @Test
    void deveLancarExcecaoQuandoPrecoNegativo() {
        ProductDto productDto = new ProductDto();
        productDto.setProductPrice(new BigDecimal("-10.00"));

        assertThrows(InvalidValueException.class, () -> productService.insert(productDto));
    }

    @Test
    void deveRetornarProdutoQuandoBuscarPorId() {
        Product product = ProductFixture.productFixture();
        when(productRepository.findById(anyLong())).thenReturn(Optional.of(product));

        Optional<ProductDto> result = productService.findById(1L);

        assertTrue(result.isPresent());
        assertEquals("Produto Exemplo", result.get().getName());
    }

    @Test
    void deveLancarExcecaoQuandoIdNaoExistenteAoBuscar() {
        when(productRepository.findById(anyLong())).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> productService.findById(1L));
    }

    @Test
    void deveLancarExcecaoQuandoPrecoForNulo() {
        ProductDto productDto = new ProductDto();
        productDto.setProductPrice(null);

        assertThrows(InvalidValueException.class, () -> productService.insert(productDto));
    }

    @Test
    void deveLancarExcecaoGenericaAoDeletarProduto() {
        when(productRepository.existsById(anyLong())).thenReturn(true);
        doThrow(RuntimeException.class).when(productRepository).deleteById(anyLong());

        assertThrows(DatabaseException.class, () -> productService.delete(1L));
    }

    @Test
    void deveAtualizarListaDeFornecedoresQuandoListaFornecida() {
        ProductDto productDto = new ProductDto();
        productDto.setName("Produto Exemplo");
        productDto.setProductPrice(new BigDecimal("150.00"));

        SupplierSimpleDto supplierDto = new SupplierSimpleDto();
        supplierDto.setId(1L);
        supplierDto.setFullName("Fornecedor Exemplo");

        List<SupplierSimpleDto> suppliers = List.of(supplierDto);

        productDto.setSuppliers(suppliers);

        SupplierDto supplierDtoResult = new SupplierDto();
        supplierDtoResult.setId(supplierDto.getId());
        supplierDtoResult.setFullName(supplierDto.getFullName());

        when(supplierService.findById(supplierDto.getId())).thenReturn(Optional.of(supplierDtoResult));
        Product product = ProductFixture.productFixture();
        when(productRepository.save(any(Product.class))).thenReturn(product);

        productService.insert(productDto);

        verify(supplierService, times(1)).findById(supplierDto.getId());
    }

    @Test
    void deveAtualizarProdutoComSucesso() {
        ProductUpdateDto updateDto = new ProductUpdateDto();
        updateDto.setName("Produto Atualizado");
        Collections Collections = null;
        updateDto.setSuppliers(Collections.emptyList());

        Product product = ProductFixture.productFixture();
        when(productRepository.existsById(anyLong())).thenReturn(true);
        when(productRepository.getReferenceById(anyLong())).thenReturn(product);
        when(productRepository.save(any(Product.class))).thenReturn(product);

        ProductDto result = productService.update(1L, updateDto);

        assertNotNull(result);
        assertEquals("Produto Atualizado", result.getName());
    }

    @Test
    void deveLancarExcecaoAoAtualizarProdutoComIdInexistente() {
        when(productRepository.existsById(anyLong())).thenReturn(false);

        ProductUpdateDto updateDto = new ProductUpdateDto();
        assertThrows(ResourceNotFoundException.class, () -> productService.update(1L, updateDto));
    }

    @Test
    void deveLancarExcecaoDatabaseExceptionAoAtualizarProdutoComErroDeIntegridade() {
        when(productRepository.existsById(anyLong())).thenReturn(true);
        when(productRepository.getReferenceById(anyLong())).thenThrow(DataIntegrityViolationException.class);

        ProductUpdateDto updateDto = new ProductUpdateDto();
        updateDto.setName("Produto Atualizado");

        assertThrows(DatabaseException.class, () -> productService.update(1L, updateDto));
    }

    @Test
    void deveDeletarProdutoComSucesso() {
        when(productRepository.existsById(anyLong())).thenReturn(true);
        doNothing().when(productRepository).deleteById(anyLong());

        assertDoesNotThrow(() -> productService.delete(1L));
    }

    @Test
    void deveLancarExcecaoAoDeletarProdutoVinculadoAOutrosRegistros() {
        when(productRepository.existsById(anyLong())).thenReturn(true);
        doThrow(DataIntegrityViolationException.class).when(productRepository).deleteById(anyLong());

        assertThrows(DatabaseException.class, () -> productService.delete(1L));
    }

    @Test
    public void deveAtualizarEstoqueReservadoComSucesso() {
        Long productId = 1L;
        BigDecimal quantitySold = new BigDecimal("10");

        Product product = new Product();
        product.setId(productId);
        product.setReservedStock(new BigDecimal("100"));
        when(productRepository.getReferenceById(productId)).thenReturn(product);
        when(productRepository.existsById(productId)).thenReturn(true);

        productService.updateStockBySale(productId, quantitySold);

        assertEquals(new BigDecimal("110"), product.getReservedStock());
        verify(productRepository, times(1)).save(product);
    }

    @Test
    public void deveLancarDatabaseExceptionAoOcorrerViolacaoDeIntegridade() {
        Long productId = 1L;
        BigDecimal quantitySold = new BigDecimal("10");

        Product product = new Product();
        product.setId(productId);
        product.setReservedStock(new BigDecimal("100"));

        when(productRepository.getReferenceById(productId)).thenReturn(product);
        when(productRepository.existsById(productId)).thenReturn(true);

        doThrow(DataIntegrityViolationException.class).when(productRepository).save(any(Product.class));

        assertThrows(DatabaseException.class, () -> productService.updateStockBySale(productId, quantitySold));
    }

    @Test
    public void deveRetornarPaginaDeProductDto() {
        Pageable pageable = PageRequest.of(0, 10);

        // Usando a fixture para criar produtos e ajustando apenas os atributos necessários
        Product product1 = ProductFixture.productFixture();
        product1.setId(1L);
        product1.setName("Produto 1");
        product1.setProductPrice(BigDecimal.valueOf(100.0));

        Product product2 = ProductFixture.productFixture();
        product2.setId(2L);
        product2.setName("Produto 2");
        product2.setProductPrice(BigDecimal.valueOf(200.0));

        List<Product> products = Arrays.asList(product1, product2);
        Page<Product> productPage = new PageImpl<>(products, pageable, products.size());

        when(productRepository.findAll(pageable)).thenReturn(productPage);

        Page<ProductDto> result = productService.findAll(pageable);

        assertEquals(2, result.getContent().size());
        assertEquals("Produto 1", result.getContent().get(0).getName());
        assertEquals("Produto 2", result.getContent().get(1).getName());
        assertEquals(pageable, result.getPageable());
    }

}




