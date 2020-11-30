package com.example.TradeHub.dtos;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

/**
 * <Description>
 *
 * @author Martin Hellström
 * @version 1.0
 * @since 11/30/2020
 */

@AllArgsConstructor
@NoArgsConstructor
public class SocketDTO {

    public String action;
    public Object payload;
}
