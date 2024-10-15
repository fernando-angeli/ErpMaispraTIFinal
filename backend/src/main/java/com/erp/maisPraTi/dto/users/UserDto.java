package com.erp.maisPraTi.dto.users;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;

    @NotBlank(message = "Campo obrigatório.")
    private String firstName;

    @NotBlank(message = "Campo obrigatório.")
    private String lastName;

    @Column(unique = true)
    @Email(message="E-mail é obrigatório.")
    private String email;

    private List<RoleDto> roles;

}
