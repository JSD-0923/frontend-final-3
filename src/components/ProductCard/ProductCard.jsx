import React from "react";
import { Box, Button, Rating, Typography, CardContent, CardMedia, Card, Stack, Chip , IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { styled } from '@mui/system';
import { useNavigate } from "react-router-dom";
import { ProductPrice } from "../ProductPrice/ProductPrice";
import { useWishlist } from '../../hooks/useWishlist';
const StyledCardMedia = styled(CardMedia)(({ 
  height: 300,
  borderRadius: "8px",
  position: "relative",
  "&:hover": {
    "& .overlay": {
      display: "flex",
    },
  },
}));

const Overlay = styled("div")(({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0, 0, 0, 0.5)",
  display: "none",
  justifyContent: "center",
  alignItems: "center",
  zIndex:2,
}));

const ButtonStyled = styled(Button)(({ 
  color: "#fff",
  backgroundColor: "black",
  padding: "10px 20px",
  borderRadius: "4px",
}));
const CustomChip = styled(Chip)(({
  backgroundColor: "#FF8C4B",
  borderRadius: "4px",
  color: "white", 
  position: "absolute",
  top: 8,
  right: 8,
  zIndex: 1,
}));

export const ProductCard = ({ name, id, short_description, price, image_url, lessInfo, rate, discount, ratingCount, chipLabel }) => {
  const { isInWishlist, AddToWishlist, isAddWishlistProductLoading, isWishlistLoading } = useWishlist(id);
  const isAuthenticated = localStorage.getItem('token') || sessionStorage.getItem('token');
  const navigate = useNavigate();
  const handleProduct = () => {
    navigate(`/product/${id}`);
  }
  return (
    <Card sx={{ width: '100%', boxShadow: "none" }}>
      <StyledCardMedia image={image_url} title={name}>
        {chipLabel && (
          <CustomChip
            label={chipLabel}
          />
        )}
        <Overlay className="overlay">
          <ButtonStyled variant="contained" onClick={handleProduct}>
            See Product
          </ButtonStyled>
        </Overlay>
      </StyledCardMedia>
      <CardContent sx={{ px: 0 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", }}>
          <Typography gutterBottom variant="none" component="div" sx={{ fontSize: "16px", fontWeight: "500", }}>
            {name}
          </Typography>
          {!isAuthenticated || isWishlistLoading ? <></>: isInWishlist ? (<IconButton aria-label="add" size="large">
            <FavoriteIcon fontSize="inherit" />
          </IconButton>) : (<IconButton aria-label="add" size="large" disabled={isAddWishlistProductLoading} onClick={AddToWishlist}>
            <FavoriteBorderIcon fontSize="inherit" />
          </IconButton>)}
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "14px", mb: "5px" }}>
          {short_description}
        </Typography>
        {lessInfo ? null : <Stack direction="row" spacing={2}>
          <Rating name="text-feedback" value={Number(rate)} readOnly precision={0.5} />
          <Typography variant="caption" color="primary" pt={0.5}>{ratingCount} Ratings</Typography>
        </Stack>}
        {lessInfo ? <ProductPrice price={price} size={"body1"} /> : <ProductPrice price={price} size={'body1'} discount={discount} />}
      </CardContent>
    </Card>
  );
};