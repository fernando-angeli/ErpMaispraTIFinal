package com.erp.maisPraTi.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum UnitOfMeasure {
    UNIT("Unidade"),
    BAR("Barra"),
    KG("Quilo"),
    LINEAR_METER("Metro linear"),
    SQUARE_METER("Metro quadrado");

    private final String description;

    UnitOfMeasure(String description) {
        this.description = description;
    }

    @JsonValue
    public String getDescription() {
        return description;
    }
}