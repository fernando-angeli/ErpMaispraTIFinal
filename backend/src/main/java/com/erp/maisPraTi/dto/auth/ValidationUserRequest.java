package com.erp.maisPraTi.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ValidationUserRequest {

    private String email;
    private String cpf;
}
