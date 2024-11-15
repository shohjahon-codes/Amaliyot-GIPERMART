import React from "react";
import { PhoneIcon } from "../assets/icon/phone-icon";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.svg";
import { Search } from "../components/search";
import { UserIcon } from "../assets/icon/user-icon";
import { ShoppingCartIcon } from "../assets/icon/shopping-cart-icon";
import { LikeIcon } from "../assets/icon/like-icon";
import { MenuIcon } from "../assets/icon/menu-icon";
import { XIcon } from "../assets/icon/x-icon";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { LikeRed } from "../assets/icon/like-red";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Button,
  Box,
  Container,
} from "@mui/material";

export const Header = () => {
  let [isOpen, setIsOpen] = React.useState(false);
  const { pathname } = useLocation();
  const like = useSelector((state) => state?.product?.like);
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const counter = useSelector((state) => state.product.product);
  const length = counter.length;
  const { data, isLoading } = useGetCatologQuery();

  return (
    <AppBar position="fixed" sx={{ bgcolor: "white", boxShadow: 1 }}>
      <Toolbar>
        <Container>
          {/* Yuqori qism */}
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            gap={3}
            py={1}
          >
            <Button color="inherit" href="#">
              Доставка и оплата
            </Button>
            <Button color="inherit" href="#">
              Пункты выдачи
            </Button>
            <Button color="inherit" href="#">
              Поддержка
            </Button>
            <Button
              color="inherit"
              href="tel:+998902537753"
              startIcon={<PhoneIcon />}
            >
              +998 90 253 77 53
            </Button>
          </Box>

          {/* Pastki qism */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            py={2}
          >
            {/* Logo va katalog */}
            <Box display="flex" alignItems="center" gap={2}>
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
              <Button
                variant="contained"
                color="warning"
                startIcon={isOpen ? <XIcon /> : <MenuIcon />}
                onClick={() => setIsOpen(!isOpen)}
              >
                Каталог
              </Button>
              {!isLoading && (
                <Catolog isOpen={isOpen} setIsOpen={setIsOpen}>
                  <Box display="flex" flexWrap="wrap" gap={6}>
                    {data?.map((item) => (
                      <CardModal key={item.id} {...item} setIsOpen={setIsOpen} />
                    ))}
                  </Box>
                </Catolog>
              )}
            </Box>

            {/* Search */}
            <Box flexGrow={1}>
              <Search />
            </Box>

            {/* Profildagi tugmalar */}
            <Box display="flex" alignItems="center" gap={2}>
              <Link to="/user">
                <IconButton>
                  <UserIcon />
                </IconButton>
                <Typography variant="body2">Профиль</Typography>
              </Link>
              <Link to="/likes">
                <IconButton>
                  {like?.length ? <LikeRed /> : <LikeIcon />}
                </IconButton>
                <Typography variant="body2">Избранное</Typography>
              </Link>
              <Link to="/user/basket">
                <IconButton>
                  <Badge badgeContent={length} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <Typography variant="body2">Корзина</Typography>
              </Link>
            </Box>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};
