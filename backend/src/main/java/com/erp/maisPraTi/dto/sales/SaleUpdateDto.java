package com.erp.maisPraTi.dto.sales;

import com.erp.maisPraTi.dto.saleItems.SaleItemUpdateDto;
import com.erp.maisPraTi.enums.SaleStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaleUpdateDto {

    private LocalDateTime saleDate;
    private LocalDate expectedDeliveryDate;
    private List<SaleItemUpdateDto> saleItems;
    @Enumerated(EnumType.STRING)
    private SaleStatus saleStatus;

}
