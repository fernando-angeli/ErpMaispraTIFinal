package com.erp.maisPraTi.service.validations;

import com.erp.maisPraTi.dto.partyDto.PartyDto;
import com.erp.maisPraTi.service.exceptions.InvalidDocumentException;
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
            throw new InvalidDocumentException("CPF inválido.");

        if (partyDto.getTypePfOrPj().equals(PJ)) {
            if (!CNPJValidator.validarCNPJ(partyDto.getCpfCnpj()))
                throw new InvalidDocumentException("CNPJ inválido.");
            if (partyDto.getStateRegistration() == null)
                throw new InvalidDocumentException("Obrigatório informar uma Inscrição Estadual ou Isento para tipo PJ.");
        }
        return true;
    }
}
