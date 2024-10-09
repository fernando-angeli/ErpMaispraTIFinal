package com.erp.maisPraTi.service;

import com.erp.maisPraTi.dto.SupplierDto;
import com.erp.maisPraTi.dto.SupplierUpdateDto;
import com.erp.maisPraTi.model.Supplier;
import com.erp.maisPraTi.repository.SupplierRepository;
import com.erp.maisPraTi.service.exceptions.DatabaseException;
import com.erp.maisPraTi.service.exceptions.ResourceNotFoundException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

import static com.erp.maisPraTi.util.EntityMapper.convertToDto;
import static com.erp.maisPraTi.util.EntityMapper.convertToEntity;

@Service
public class SupplierService {

    @Autowired
    private SupplierRepository supplierRepository;

    @Transactional
    public SupplierDto insert(SupplierDto dto) {
        Supplier supplier = new Supplier();
        supplier = convertToEntity(dto, Supplier.class);
        supplier.setCreatedAt(LocalDateTime.now());
        supplier.setUpdatedAt(LocalDateTime.now());
        supplier = supplierRepository.save(supplier);
        return convertToDto(supplier, SupplierDto.class);
    }

    @Transactional(readOnly = true)
    public Optional<SupplierDto> findById(Long id) {
        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Id não localizado: " + id));
        return Optional.of(convertToDto(supplier, SupplierDto.class));
    }

    public Page<SupplierDto> findAll(Pageable pageable){
        Page<Supplier> suppliers = supplierRepository.findAll(pageable);
        return suppliers.map(s -> convertToDto(s, SupplierDto.class));
    }

    @Transactional
    public SupplierDto update(Long id, SupplierUpdateDto supplierUpdateDto){
        verifyExistsId(id);
        try {
            Supplier supplier = supplierRepository.getReferenceById(id);
            convertToEntity(supplierUpdateDto, supplier);
            supplier.setUpdatedAt(LocalDateTime.now());
            supplier = supplierRepository.save(supplier);
            return convertToDto(supplier, SupplierDto.class);
        } catch (DataIntegrityViolationException e){
            throw new DatabaseException("Não foi possível fazer a alteração neste fornecedor.");
        } catch (Exception e) {
            throw new DatabaseException("Erro inesperado ao tentar atualizar fornecedor.");
        }
    }

    @Transactional
    public void delete(Long id){
        verifyExistsId(id);
        try{
            supplierRepository.deleteById(id);
        } catch (DataIntegrityViolationException e){
            throw new DatabaseException("Não foi possível excluir este fornecedor. Ele pode estar vinculado a outros registros.");
        } catch (Exception e) {
            throw new DatabaseException("Erro inesperado ao tentar excluir o fornecedor.");
        }
    }

    private void verifyExistsId(Long id){
        if(!supplierRepository.existsById(id)){
            throw new ResourceNotFoundException("Id não localizado: " + id);
        }
    }
}
