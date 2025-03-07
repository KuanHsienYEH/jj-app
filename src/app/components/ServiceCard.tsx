import { Box, Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { StaticImageData } from "next/image";

// ✅ Define TypeScript interface
interface Service {
  title: string;
  thumbnail: string | StaticImageData;
  subTitle: string;
  content: string;
}

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const isPad = useMediaQuery("(max-width:768px)");

  return (
    <Box
      sx={{
        width: isPad ? "230px" : "520px",
        maxWidth: "520px",
        justifySelf: isPad ? "center" : "start",
        padding: isPad ? "0" : "2rem 1rem",
      }}
    >
      <Card sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
          <Stack direction="column" justifyContent="center" alignItems="center">
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              服務
            </Typography>
            <Typography variant={isPad ? "h5" : "h3"} component="div">
              0{index + 1}
            </Typography>
            <Typography sx={{ fontSize: 12, marginBottom: "20px" }} color="text.secondary">
              {service.title}
            </Typography>
          </Stack>
          <CardMedia
            component="img"
            src={typeof service.thumbnail === "string" ? service.thumbnail : service.thumbnail.src}
            alt="service image"
            sx={{
              maxWidth: isPad ? "100px" : "150px",
              alignSelf: "center",
              marginBottom: isPad ? "1rem" : "2rem",
            }}
          />
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            <b>{service.subTitle}</b>
          </Typography>
          <Box
            sx={{
              maxWidth: "400px",
              alignSelf: "center",
              marginTop: isPad ? "6rem" : "2rem",
            }}
          >
            <Typography sx={{ fontSize: 14 }}>{service.content}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ServiceCard;
