package com.erp.maisPraTi.dto.users;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

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

    private List<RoleDto> roles;

}
