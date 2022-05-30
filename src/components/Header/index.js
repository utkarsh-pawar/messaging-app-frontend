import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import "../../App.css";
import { userActions } from "../../store/userSlice";

const Index = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  if (location.pathname === "/login" || location.pathname === "/signup")
    return "";

  const logoutHandler = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(userActions.logout());
  };
  return (
    <Box
      w="100%"
      border="1px"
      borderColor={"gray.400"}
      borderRadius="0.25rem"
      px={{base:2,md:4}}
    >
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent="space-between"
        color={"white"}
        fontSize={"lg"}
      >
        <Flex>
          <Flex gap={{ base: 1, md: 5 }}>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              to="/contacts"
            >
              <Button colorScheme="facebook" size={{ base: "sm", md: "md" }}>
                Contacts
              </Button>
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              to="/messages"
            >
              <Button colorScheme="facebook" size={{ base: "sm", md: "md" }}>
                Messages
              </Button>
            </NavLink>
          </Flex>
        </Flex>
        <Button
          onClick={logoutHandler}
          mr={0}
          size={{ base: "sm", md: "md" }}
          colorScheme={"facebook"}
          variant="outline"
        >
          Logout
        </Button>
      </Flex>
    </Box>
  );
};

export default Index;
