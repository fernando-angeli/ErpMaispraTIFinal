package com.erp.maisPraTi.service.validations;

import com.erp.maisPraTi.dto.ClientDto;
import com.erp.maisPraTi.service.exceptions.DatabaseException;
import com.erp.maisPraTi.util.CNPJValidator;
import com.erp.maisPraTi.util.CPFValidator;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import static com.erp.maisPraTi.enums.TypePfOrPj.PF;
import static com.erp.maisPraTi.enums.TypePfOrPj.PJ;

public class ClientInsertValidator implements ConstraintValidator<ClientInserValid, ClientDto>{

    @Override
    public void initialize(ClientInserValid constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(ClientDto clientDto, ConstraintValidatorContext constraintValidatorContext) {

        if(clientDto.getTypePfOrPj().equals(PF) && !CPFValidator.validarCPF(clientDto.getCpfCnpj()))
            throw new DatabaseException("CPF inválido.");

        if (clientDto.getTypePfOrPj().equals(PJ) && !CNPJValidator.validarCNPJ(clientDto.getCpfCnpj()))
            throw new DatabaseException("CNPJ inválido.");

        return true;
    }
}
