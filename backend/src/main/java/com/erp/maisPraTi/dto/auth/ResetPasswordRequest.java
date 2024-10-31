package com.erp.maisPraTi.dto.auth;

import lombok.Data;

@Data
public class ResetPasswordRequest {

    private Long id;
    private String newPassword;

}
