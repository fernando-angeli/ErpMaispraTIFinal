package com.erp.maisPraTi.dto;

import com.erp.maisPraTi.enums.ClientStatus;
import com.erp.maisPraTi.enums.Gender;
import com.erp.maisPraTi.enums.TypePfOrPj;
import com.erp.maisPraTi.service.validations.ClientInserValid;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@ClientInserValid
@AllArgsConstructor
@NoArgsConstructor
public class ClientUpdateDto {

    @NotBlank(message = "O campo nome é obrigatório")
    private String fullName;

    @Enumerated(EnumType.STRING)
    private TypePfOrPj typePfOrPj;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private String cpfCnpj;

    private String rgIe;

    private String phoneNumber;

    @Email(message = "E-mail inválido.", regexp = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$")
    @NotBlank(message = "E-mail é obrigatório.")
    private String email;

    private String address;

    private String number;

    private String district;

    private String zipCode;

    private String city;

    private String state;

    private String country;

    private LocalDate birthDate;

    private BigDecimal creditLimit;

    private String notes;

    @Enumerated(EnumType.STRING)
    private ClientStatus status;

    private LocalDateTime updatedAt;

}
