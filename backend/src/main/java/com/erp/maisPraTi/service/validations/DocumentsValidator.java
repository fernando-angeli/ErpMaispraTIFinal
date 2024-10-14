package com.erp.maisPraTi.service.validations;

import com.erp.maisPraTi.dto.partyDto.PartyDto;
import com.erp.maisPraTi.service.exceptions.DatabaseException;
import com.erp.maisPraTi.util.CNPJValidator;
import com.erp.maisPraTi.util.CPFValidator;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import static com.erp.maisPraTi.enums.TypePfOrPj.PF;
import static com.erp.maisPraTi.enums.TypePfOrPj.PJ;

public class DocumentsValidator implements ConstraintValidator<DocumentsValid, PartyDto>{

    @Override
    public void initialize(DocumentsValid constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(PartyDto partyDto, ConstraintValidatorContext constraintValidatorContext) {

        if(partyDto.getTypePfOrPj().equals(PF) && !CPFValidator.validarCPF(partyDto.getCpfCnpj()))
            throw new DatabaseException("CPF inválido.");

        if (partyDto.getTypePfOrPj().equals(PJ) && !CNPJValidator.validarCNPJ(partyDto.getCpfCnpj()))
            throw new DatabaseException("CNPJ inválido.");

        return true;
    }
}
