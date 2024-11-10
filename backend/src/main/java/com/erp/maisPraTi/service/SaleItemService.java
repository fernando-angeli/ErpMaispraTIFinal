package com.erp.maisPraTi.service;

import com.erp.maisPraTi.dto.products.ProductDto;
import com.erp.maisPraTi.dto.sales.SaleDto;
import com.erp.maisPraTi.dto.sales.SaleInsertItemDto;
import com.erp.maisPraTi.dto.sales.SaleItemResponseDto;
import com.erp.maisPraTi.model.Product;
import com.erp.maisPraTi.model.Sale;
import com.erp.maisPraTi.model.SaleItem;
import com.erp.maisPraTi.repository.SaleItemRepository;
import com.erp.maisPraTi.service.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Optional;

import static com.erp.maisPraTi.util.EntityMapper.convertToDto;
import static com.erp.maisPraTi.util.EntityMapper.convertToEntity;

@Service
public class SaleItemService {

    @Autowired
    private SaleItemRepository saleItemRepository;

    @Autowired
    private ProductService productService;

    @Autowired
    private SaleService saleService;

    @Transactional
    public SaleItemResponseDto insert(Long saleId, SaleInsertItemDto saleInsertItemDto) {
        SaleItem newSaleItem = convertToEntity(saleInsertItemDto, SaleItem.class);

        ProductDto productDto = productService.findById(saleInsertItemDto.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado com ID: " + saleInsertItemDto.getProductId()));
        Product product = convertToEntity(productDto, Product.class);
        product.setProductPrice(saleInsertItemDto.getSalePrice());
        newSaleItem.setProduct(product);

        SaleDto saleDto = saleService.findById(saleId)
                .orElseThrow(() -> new ResourceNotFoundException("Venda não encontrada com ID:" + saleId));
        Sale sale = convertToEntity(saleDto, Sale.class);
        newSaleItem.setSale(sale);

        newSaleItem.setSalePrice(saleInsertItemDto.getSalePrice());
        newSaleItem.setUnitOfMeasure(product.getUnitOfMeasure());
        newSaleItem.setQuantityDelivered(0L);
        newSaleItem = saleItemRepository.save(newSaleItem);
        return convertToDto(newSaleItem, SaleItemResponseDto.class);
    }

    @Transactional(readOnly = true)
    public Optional<SaleItemResponseDto> findById(Long saleId, Long itemId) {
        SaleItem saleItem = saleItemRepository.findByIdAndSaleId(itemId, saleId)
                .orElseThrow(() -> new ResourceNotFoundException("Item não localizado"));
        return Optional.of(convertToDto(saleItem, SaleItemResponseDto.class));
    }

    @Transactional(readOnly = true)
    public Page<SaleItemResponseDto> findAll(Long saleId, Pageable pageable) {
        Page<SaleItem> sales = saleItemRepository.findBySaleId(saleId, pageable);
        return sales.map(c -> convertToDto(c, SaleItemResponseDto.class));
    }
    @Transactional(readOnly = true)
    public Page<SaleItemResponseDto> findAllByProductId(Long saleId, Long productId, Pageable pageable) {
        Page<SaleItem> sales = saleItemRepository.findBySaleIdAndProductId(saleId, productId, pageable);
        return sales.map(c -> convertToDto(c, SaleItemResponseDto.class));
    }

//    @Transactional
//    public SaleDto update(Long saleId, Long saleItemId, SaleUpdateDto saleUpdateDto) {
//        verifyExistsId(saleId, saleItemId);
//        try {
//            SaleItem sale = saleItemRepository.getReferenceById(saleItemId);
//            convertToEntity(saleUpdateDto, sale);
//            sale = saleItemRepository.save(sale);
//            return convertToDto(sale, SaleDto.class);
//        } catch (DataIntegrityViolationException e) {
//            throw new DatabaseException("Não foi possível fazer a alteração neste item.");
//        }
//    }

//    @Transactional
//    public void delete(Long id) {
//        verifyExistsId(id);
//        try {
//            saleItemRepository.deleteById(id);
//        } catch (DataIntegrityViolationException e) {
//            throw new DatabaseException("Não foi possível excluir esta item. Ele pode estar vinculado a outros registros.");
//        } catch (Exception e) {
//            throw new DatabaseException("Erro inesperado ao tentar excluir este item.");
//        }
//    }

    private void verifyExistsId(Long id) {
        if (!saleItemRepository.existsById(id)) {
            throw new ResourceNotFoundException("Id não localizado: " + id);
        }
    }

    public void updateSaleTotalValue(Sale sale, SaleInsertItemDto saleInsertItemDto) {
        BigDecimal addValue = BigDecimal.valueOf(saleInsertItemDto.getQuantitySold())
                .multiply(saleInsertItemDto.getSalePrice());
        BigDecimal newTotal = sale.getTotalSaleValue().add(addValue);
        sale.setTotalSaleValue(newTotal);
    }


}
