package com.erp.maisPraTi.dto.sales;

import com.erp.maisPraTi.enums.SaleStatus;
import com.erp.maisPraTi.model.Client;
import com.erp.maisPraTi.model.SaleItem;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaleUpdateDto {

    @Column(nullable = false)
    private LocalDateTime saleDate;

    @Column(nullable = false)
    private LocalDate expectedDeliveryDate;

    private LocalDateTime saleDelivery;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Client client;

    @OneToMany(mappedBy = "sale", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<SaleItem> saleItems;

    private BigDecimal totalSaleValue;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SaleStatus saleStatus;

}
