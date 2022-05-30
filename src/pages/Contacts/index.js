import React, { useEffect } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
} from "@chakra-ui/react";
import { addContact, getContacts } from "../../api/contactsApiCalls";
import { useQuery } from "react-query";
import Contact from "../../components/ContactCard";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const Index = () => {
  const isLoading = useSelector((state) => state.loading.isLoading);
  const dispatch = useDispatch();
  const { data, status, refetch } = useQuery("list-contacts", getContacts);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const addContactHandler = (data) => {
    addContact(data, dispatch);
    reset({ first_name: "", last_name: "", contact_no: "", email: "" });
  };
  useEffect(() => {
    refetch();
  }, [refetch, isLoading]);
  return (
    <Container maxW="container.xl">
      <Flex direction={{ base: "column-reverse", lg: "row" }}>
        <Box
          overflowY={"scroll"}
          h="85vh"
          flex={0.25}
          rounded="md"
          boxShadow={"md"}
          overflow={"scroll"}
          scrollBehavior={"smooth"}
          my={2}
          mt={{ base: 5, md: 0 }}
        >
          <Center>
            <Flex align={"center"} px={5} w="100%" gap={3} direction={"column"}>
              <Text as={"h2"} fontSize={"3xl"}>
                Contacts
              </Text>
              {status === "success" &&
                data.map((contact) => (
                  <Contact
                    key={contact._id}
                    id={contact._id}
                    firstName={contact.first_name}
                    lastName={contact.last_name}
                  ></Contact>
                ))}
            </Flex>
          </Center>
        </Box>
        <Flex flex={0.7} justify="center" align={"center"}>
          <Box
            boxShadow={"md"}
            rounded="md"
            w={"sm"}
            px={10}
            h="xl"
            mt={{ base: 5, md: 0 }}
          >
            <Heading mb={2} fontSize={"2xl"} textAlign={"center"} mt={5}>
              Add contact
            </Heading>
            <FormControl isInvalid={errors}>
              <Flex gap={5} direction={"column"}>
                <Box h={20}>
                  <FormLabel>First name:</FormLabel>
                  <Input
                    errorBorderColor={errors.first_name ? "red.500" : "none"}
                    type="text"
                    id="first"
                    placeholder="first name"
                    {...register("first_name", {
                      required: {
                        value: true,
                        message: "First name is required.",
                      },
                    })}
                  />
                  {errors?.first_name && (
                    <FormErrorMessage>
                      {errors.first_name.message}
                    </FormErrorMessage>
                  )}
                </Box>
                <Box h={20}>
                  <FormLabel>Last name:</FormLabel>
                  <Input
                    type="text"
                    errorBorderColor={errors.last_name ? "red.500" : "none"}
                    id="last_name"
                    placeholder="last_name"
                    {...register("last_name", {
                      required: {
                        value: true,
                        message: "Last name is required.",
                      },
                    })}
                  />
                  {errors?.last_name && (
                    <FormErrorMessage>
                      {errors.last_name.message}
                    </FormErrorMessage>
                  )}
                </Box>
                <Box h={20}>
                  <FormLabel>Contact Number:</FormLabel>
                  <InputGroup>
                    <InputLeftAddon children="+91" />
                    <Input
                      type="number"
                      errorBorderColor={errors.contact_no ? "red.500" : "none"}
                      id="contact_no"
                      placeholder="Contact number"
                      {...register("contact_no", {
                        required: {
                          value: true,
                          message: "Contact number is required.",
                        },
                        minLength: {
                          value: 10,
                          message: "contact number must be of 10 digits",
                        },
                        maxLength: {
                          value: 10,
                          message: "contact number must be of 10 digits",
                        },
                      })}
                    />
                  </InputGroup>
                  {errors?.contact_no && (
                    <FormErrorMessage>
                      {errors.contact_no.message}
                    </FormErrorMessage>
                  )}
                </Box>
                <Box h={20}>
                  <FormLabel>Email ID:</FormLabel>
                  <Input
                    type="email"
                    errorBorderColor={errors.email ? "red.500" : "none"}
                    id="email"
                    placeholder="Email"
                    {...register("email")}
                  />
                  {errors?.email && (
                    <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                  )}
                </Box>
                <Button
                  onClick={handleSubmit(addContactHandler)}
                  mt={5}
                  colorScheme={"facebook"}
                  type="submit"
                >
                  Add
                </Button>
              </Flex>
            </FormControl>
          </Box>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Index;
