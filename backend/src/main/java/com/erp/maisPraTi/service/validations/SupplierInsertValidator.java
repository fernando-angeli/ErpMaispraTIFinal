package com.erp.maisPraTi.service.validations;

import com.erp.maisPraTi.controller.exceptions.FieldMessage;
import com.erp.maisPraTi.dto.SupplierDto;
import com.erp.maisPraTi.model.Supplier;
import com.erp.maisPraTi.repository.SupplierRepository;
import com.erp.maisPraTi.util.CNPJValidator;
import com.erp.maisPraTi.util.CPFValidator;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

import static com.erp.maisPraTi.enums.TypePfOrPj.PF;
import static com.erp.maisPraTi.enums.TypePfOrPj.PJ;

public class SupplierInsertValidator implements ConstraintValidator<SupplierInsertValid, SupplierDto> {

    @Autowired
    private SupplierRepository supplierRepository;

    @Override
    public void initialize(SupplierInsertValid constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(SupplierDto supplierDto, ConstraintValidatorContext constraintValidatorContext) {
        List<FieldMessage> error = new ArrayList<>();
        Supplier supplier = supplierRepository.findByCpfCnpj(supplierDto.getCpfCnpj());
        if (supplier != null) {
            if (supplier.getTypePfOrPj().equals(PF))
                error.add(new FieldMessage("CPF", "CPF já cadastrado."));
            else
                error.add(new FieldMessage("CNPJ", "CNPJ já cadastrado"));
        } else {
            if (supplierDto.getTypePfOrPj().equals(PF) && !CPFValidator.validarCPF(supplierDto.getCpfCnpj())) {
                error.add(new FieldMessage("CPF", "Inválido CPF."));
            }
            if (supplierDto.getTypePfOrPj().equals(PJ) && !CNPJValidator.validarCNPJ(supplierDto.getCpfCnpj())) {
                error.add(new FieldMessage("CNPJ", "Inválido CNPJ."));
            }
        }

        for (FieldMessage e : error) {
            constraintValidatorContext.disableDefaultConstraintViolation();
            constraintValidatorContext.buildConstraintViolationWithTemplate(e.getMessage())
                    .addPropertyNode(e.getFieldName())
                    .addConstraintViolation();
        }

        return error.isEmpty();
    }
}
