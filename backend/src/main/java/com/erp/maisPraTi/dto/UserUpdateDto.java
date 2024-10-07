package com.erp.maisPraTi.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateDto {

    @NotBlank(message = "Campo obrigatório.")
    private String firstName;

    @NotBlank(message = "Campo obrigatório.")
    private String lastName;

    @Email(message="E-mail é obrigatório.")
    private String email;

    Set<RoleDto> roles = new HashSet<>();

}
