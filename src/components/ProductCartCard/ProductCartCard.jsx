import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { QuantityButton } from "../QuantityButton/QuantityButton";
import { Stack } from "@mui/material";

export const ProductCartCard = (props) => {
  const handleQuantityChange = (newQuantity) => {
    props.setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.name_product === props.item.name_product
          ? {
              ...item,
              quantity: newQuantity,
              subtotal: item.price * newQuantity,
            }
          : item
      )
    );
  };

  return (
    <Card variant="none" sx={{ display: "flex", maxWidth: 500 }}>
      <CardMedia
        sx={{ maxWidth: 150 }}
        component="img"
        alt={props.item.name_product}
        height="120"
        image={props.item.image_url}
      />
      <CardContent sx={{ fontSize: "16px", fontWeight: "500" }}>
        <Typography component="div">{props.item.name_product}</Typography>
        <Typography color="text.secondary">
          {props.item.short_description}
        </Typography>
        <Stack
          direction="row"
          sx={{ marginTop: 1, width: "73px", height: "30px" }}
        >
          <QuantityButton
            value={props.item.quantity}
            onChange={handleQuantityChange}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};