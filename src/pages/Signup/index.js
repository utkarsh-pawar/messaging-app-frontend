import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Show,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, Navigate } from "react-router-dom";

import { signup } from "../../api/auth";
import { loadingActions } from "../../store/loadingSlice";
import { useToast } from "@chakra-ui/react";

const Index = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const signupHandler = (data) => {
    signup(data, dispatch, toast);
  };
  const isUser = useSelector((state) => state.user.isUser);
  if (isUser) {
    return <Navigate to="/contacts" replace></Navigate>;
  }
  return (
    <Box bg="blue.50" h={"100vh"}>
      <Flex h="100%" justify="center" align="center">
        <Box flex={0.5}></Box>
        <Box boxShadow="md" width="md" px={10} py={10} rounded="md" bg="white">
          <Heading textAlign={"center"} fontSize="3xl">
            Signup
          </Heading>
          <FormControl isInvalid={errors}>
            <Flex gap={5} direction={"column"}>
              <Box h={20}>
                <FormLabel>Full name:</FormLabel>
                <Input
                  errorBorderColor={errors.name ? "red.500" : "none"}
                  type="text"
                  id="name"
                  placeholder="name"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name is required.",
                    },
                  })}
                />
                {errors?.name && (
                  <FormErrorMessage>{errors.name.message}</FormErrorMessage>
                )}
              </Box>
              <Box h={20}>
                <FormLabel>Email:</FormLabel>
                <Input
                  errorBorderColor={errors.email ? "red.500" : "none"}
                  type="email"
                  id="email"
                  placeholder="email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email address is required.",
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "invalid email address",
                    },
                  })}
                />
                {errors?.email && (
                  <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                )}
              </Box>
              <Box h={20}>
                <FormLabel>Password:</FormLabel>
                <Input
                  errorBorderColor={errors.email ? "red.500" : "none"}
                  type="password"
                  id="password"
                  placeholder="password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "password is required.",
                    },
                    minLength: {
                      value: 8,
                      message: "Password must be atleast 8 characters long",
                    },
                  })}
                />
                {errors?.password ? (
                  <FormErrorMessage>{errors.password.message}</FormErrorMessage>
                ) : (
                  <div></div>
                )}
              </Box>
              <Button
                mt={5}
                onClick={handleSubmit(signupHandler)}
                colorScheme={"facebook"}
                type="submit"
              >
                Signup
              </Button>
            </Flex>
          </FormControl>
          <Box mt={5}>
            <Text fontSize="md" color={"grey.700"}>
              Already a User?{" "}
              <Link as={RouterLink} color={"blue.500"} to="/login">
                click here{" "}
              </Link>
              to login.
            </Text>{" "}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Index;
