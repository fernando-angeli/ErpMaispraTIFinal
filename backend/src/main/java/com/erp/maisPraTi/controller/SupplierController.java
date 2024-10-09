package com.erp.maisPraTi.controller;

import com.erp.maisPraTi.dto.SupplierDto;
import com.erp.maisPraTi.dto.SupplierUpdateDto;
import com.erp.maisPraTi.service.SupplierService;
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
@RequestMapping(value = "/fornecedores")
public class SupplierController {

    @Autowired
    private SupplierService supplierService;

    @PostMapping
    public ResponseEntity<SupplierDto> insert (@Valid @RequestBody SupplierDto supplierDto) {
        SupplierDto newSupplierDto = supplierService.insert(supplierDto);
        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(newSupplierDto.getId())
                .toUri();
        return ResponseEntity.created(uri).body(newSupplierDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<SupplierDto>> findById(@PathVariable Long id) {
        Optional<SupplierDto> supplierDto = supplierService.findById(id);
        return ResponseEntity.ok().body(supplierDto);
    }

    @GetMapping
    public ResponseEntity<Page<SupplierDto>> findAll(Pageable pageable) {
        Page<SupplierDto> suppliers = supplierService.findAll(pageable);
        return ResponseEntity.ok().body(suppliers);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SupplierDto> update(@PathVariable Long id, @RequestBody SupplierUpdateDto supplierUpdateDto) {
        SupplierDto supplierUpdatedDto = supplierService.update(id, supplierUpdateDto);
        return ResponseEntity.ok().body(supplierUpdatedDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        supplierService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
