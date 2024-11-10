package com.erp.maisPraTi.controller;

import com.erp.maisPraTi.dto.sales.SaleInsertItemDto;
import com.erp.maisPraTi.dto.sales.SaleItemResponseDto;
import com.erp.maisPraTi.service.SaleItemService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping(value = "api/vendas")
public class SaleItemController {

    @Autowired
    private SaleItemService saleItemService;

    @Operation(summary = "Inserir item em uma venda.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Item inserido com sucesso"),
            @ApiResponse(responseCode = "400", description = "Dados inválidos")
    })
    @PostMapping("/{saleId}/itens")
    public ResponseEntity<SaleItemResponseDto> insert (@PathVariable Long saleId, @Valid @RequestBody SaleInsertItemDto saleInsertItemDto){
        SaleItemResponseDto newSaleItemDto = saleItemService.insert(saleId, saleInsertItemDto);
        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{saleId}")
                .buildAndExpand(newSaleItemDto.getId())
                .toUri();
        return ResponseEntity.created(uri).body(newSaleItemDto);
    }

    @Operation(summary = "Obtém um item de venda por ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Venda encontrada"),
            @ApiResponse(responseCode = "404", description = "Venda não encontrada")
    })
    @GetMapping("/{saleId}/itens/{itemId}")
    public ResponseEntity<Optional<SaleItemResponseDto>> findById(@PathVariable Long saleId, @PathVariable Long itemId){
        Optional<SaleItemResponseDto> saleItemDto = saleItemService.findById(saleId, itemId);
        return ResponseEntity.ok().body(saleItemDto);
    }

    @Operation(summary = "Obtém uma lista páginada de vendas")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Venda encontrada"),
            @ApiResponse(responseCode = "404", description = "Venda não encontrada")
    })
    @GetMapping("/{saleId}/itens")
    public ResponseEntity<Page<SaleItemResponseDto>> findAll(@PathVariable Long saleId, Pageable pageable){
        Page<SaleItemResponseDto> sales = saleItemService.findAll(saleId, pageable);
        return ResponseEntity.ok().body(sales);
    }

    @Operation(summary = "Obtém uma lista páginada de vendas")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Venda encontrada"),
            @ApiResponse(responseCode = "404", description = "Venda não encontrada")
    })
    @GetMapping("/{saleId}/itens/produtos/{productId}")
    public ResponseEntity<Page<SaleItemResponseDto>> findAllByProduct(@PathVariable Long saleId, @PathVariable Long productId, Pageable pageable){
        Page<SaleItemResponseDto> sales = saleItemService.findAllByProductId(saleId, productId, pageable);
        return ResponseEntity.ok().body(sales);
    }

//    @Operation(summary = "Atualiza uma venda informando o ID e os dados por parâmetro")
//    @ApiResponses(value = {
//            @ApiResponse(responseCode = "200", description = "Venda encontrada"),
//            @ApiResponse(responseCode = "404", description = "Venda não encontrada")
//    })
//    @PutMapping("/{saleId}/itens/{itemId}")
//    public ResponseEntity<SaleItemDto> update(@PathVariable Long saleId, @PathVariable Long itemId, @Valid @RequestBody SaleUpdateDto saleUpdateDto){
//        SaleItemDto saleUpdatedDto = saleItemService.update(saleId, itemId, saleUpdateDto);
//        return ResponseEntity.ok().body(saleUpdatedDto);
//    }

//    @Operation(summary = "Deleta uma venda informando o ID")
//    @ApiResponses(value = {
//            @ApiResponse(responseCode = "204", description = "Venda deletada"),
//            @ApiResponse(responseCode = "404", description = "Venda não encontrada"),
//            @ApiResponse(responseCode = "409", description = "Para manter integridade do BD não permite a exclusão")
//    })
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> delete(@PathVariable Long id){
//        saleItemService.delete(id);
//        return ResponseEntity.noContent().build();
//    }
}
