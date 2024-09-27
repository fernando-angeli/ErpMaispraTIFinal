package com.erp.maisPraTi.service.validations;

import com.erp.maisPraTi.controller.exceptions.FieldMessage;
import com.erp.maisPraTi.dto.ClientDto;
import com.erp.maisPraTi.model.Client;
import com.erp.maisPraTi.repository.ClientRepository;
import com.erp.maisPraTi.utils.CNPJValidator;
import com.erp.maisPraTi.utils.CPFValidator;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

import static com.erp.maisPraTi.enums.TypePfOrPj.PF;
import static com.erp.maisPraTi.enums.TypePfOrPj.PJ;

public class ClientInsertValidator implements ConstraintValidator<ClientInserValid, ClientDto>{

    @Autowired
    private ClientRepository clientRepository;

    @Override
    public void initialize(ClientInserValid constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(ClientDto clientDto, ConstraintValidatorContext constraintValidatorContext) {
        List<FieldMessage> error = new ArrayList<>();
        Client client = clientRepository.findByCpfCnpj(clientDto.getCpfCnpj());
        if(client != null){
            if(client.getTypePfOrPj().equals(PF))
                error.add(new FieldMessage("CPF", "CPF já cadastrado."));
             else
                error.add(new FieldMessage("CNPJ", "CNPJ já cadastrado."));
        } else {
            if(clientDto.getTypePfOrPj().equals(PF) && !CPFValidator.validarCPF(clientDto.getCpfCnpj())){
                error.add(new FieldMessage("CPF", "CPF inválido."));
            }if (clientDto.getTypePfOrPj().equals(PJ) && !CNPJValidator.validarCNPJ(clientDto.getCpfCnpj())){
                error.add(new FieldMessage("CNPJ", "CNPJ inválido."));
            }

        }

        for (FieldMessage e : error) {
            constraintValidatorContext.disableDefaultConstraintViolation();
            constraintValidatorContext.buildConstraintViolationWithTemplate(e.getMessage()).addPropertyNode(e.getFieldName())
                    .addConstraintViolation();
        }

        return error.isEmpty();
    }
}
