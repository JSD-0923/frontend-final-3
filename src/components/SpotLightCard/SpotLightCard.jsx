import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Typography, Box, useTheme } from "@mui/material";
import ProductDefault from "../../assets/images/ProductDefault.jpg";
import EastIcon from "@mui/icons-material/East";
import { useNavigate } from "react-router-dom";

export const SpotLightCard = (props) => {
  const [image, setImage] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();

  const loadImage = async (imageName) => {
    try {
      let cardImage = await import(`../../assets/images/${imageName}`);
      setImage(cardImage.default);
    } catch {
      setImage(ProductDefault);
    }
  };

  useEffect(() => {
    loadImage(props.cardData.image);
  }, [props.cardData.image]);
  return (
    <Card
      sx={{
        width: "100%",
        [theme.breakpoints.up("sm")]: {
          width: "50%",
        },
      }}
    >
      <div style={{ position: "relative" }}>
        <CardMedia
          sx={{
            height: 228,
            position: "relative",
            objectFit: "fill",
            [theme.breakpoints.down("sm")]: {
              height: 150,
            },
          }}
          component="img"
          image={image}
        />
        <Typography
          fontWeight={700}
          fontSize={40}
          sx={{
            textAlign: "right",
            position: "absolute",
            bottom: 110,
            right: 30,
            width: 240,
            height: 104,
            color: props.cardData.color,
            [theme.breakpoints.down("sm")]: {
              fontSize: 24,
              width: "auto",
              bottom: 35,
            },
          }}
        >
          {props.cardData.title}
        </Typography>
        <Box
          sx={{
            position: "absolute",
            backgroundColor: props.cardData.backgroundColor,
            borderRadius: "50%",
            width: 51,
            height: 51,
            bottom: 20,
            right: 20,
          }}
        >
          <EastIcon
            onClick={() => navigate(`/listing?&category=skincare`)}
            sx={{
              color: props.cardData.color,
              position: "absolute",
              bottom: 12,
              right: 12,
              fontSize: 28,
            }}
          />
        </Box>
      </div>
    </Card>
  );
};
