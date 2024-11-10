package com.erp.maisPraTi.service;

import com.erp.maisPraTi.dto.products.ProductDto;
import com.erp.maisPraTi.dto.products.ProductUpdateDto;
import com.erp.maisPraTi.fixture.ProductFixture;
import com.erp.maisPraTi.model.Product;
import com.erp.maisPraTi.repository.ProductRepository;
import com.erp.maisPraTi.service.exceptions.DatabaseException;
import com.erp.maisPraTi.service.exceptions.InvalidValueException;
import com.erp.maisPraTi.service.exceptions.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.dao.DataIntegrityViolationException;

import java.math.BigDecimal;
import java.util.Collections;
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

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void deveInserirProdutoComSucesso() {
        ProductDto productDto = new ProductDto();
        productDto.setName("Produto Exemplo");
        productDto.setPrice(new BigDecimal("150.00"));

        Product product = ProductFixture.productFixture();
        when(productRepository.save(any(Product.class))).thenReturn(product);

        ProductDto result = productService.insert(productDto);

        assertNotNull(result);
        assertEquals("Produto Exemplo", result.getName());
    }

    @Test
    void deveLancarExcecaoQuandoPrecoNegativo() {
        ProductDto productDto = new ProductDto();
        productDto.setPrice(new BigDecimal("-10.00"));

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
    void deveAtualizarProdutoComSucesso() {
        ProductUpdateDto updateDto = new ProductUpdateDto();
        updateDto.setName("Produto Atualizado");
        Collections Collections = null;
        updateDto.setSuppliers(Collections.emptyList()); // Adicione uma lista vazia de suppliers

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
}



