package com.erp.maisPraTi.fixture;

import com.erp.maisPraTi.enums.UnitOfMeasure;
import com.erp.maisPraTi.model.SaleItem;

import java.math.BigDecimal;

public class SaleItemFixture {

    public static SaleItem createSaleItem() {
        SaleItem saleItem = new SaleItem();
        saleItem.setId(1L);
        saleItem.setQuantitySold(new BigDecimal("10.00"));
        saleItem.setSalePrice(new BigDecimal("50.00"));
        saleItem.setUnitOfMeasure(UnitOfMeasure.UNIT);
        saleItem.setQuantityDelivered(new BigDecimal("5.00"));
        return saleItem;
    }


}

