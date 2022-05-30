import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getContact } from "../../api/contactsApiCalls";
import { useQuery } from "react-query";
import { ArrowBackIcon, EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { sendMsg, sendOtp } from "../../api/messagesApiCall";

const Index = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const [message, setMessage] = useState("");
  const {
    isOpen: otpModalIsOpen,
    onOpen: otpModalOnOpen,
    onClose: otpModalOnClose,
  } = useDisclosure();
  const {
    isOpen: msgModalIsOpen,
    onOpen: msgModalOnOpen,
    onClose: msgModalOnClose,
  } = useDisclosure();
  const { data, status, refetch } = useQuery("get_contact", () =>
    getContact(params.id)
  );

  const otpSendHandler = async () => {
    await sendOtp(data.contact_no, dispatch, toast);
    otpModalOnClose();
  };
  const msgSendHandler = async () => {
    await sendMsg(data.contact_no, message, dispatch, toast);
    msgModalOnClose();
  };

  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <Container maxW="container.xl">
      <Modal isCentered isOpen={otpModalIsOpen} onClose={otpModalOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Send OTP:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>This will send otp to </Text>
            <Tag>{data?.contact_no}</Tag>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" mr={3} onClick={otpModalOnClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={otpSendHandler}>
              Send OTP
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isCentered isOpen={msgModalIsOpen} onClose={msgModalOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Send message to : <Tag>{data?.contact_no}</Tag>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea onChange={(e) => setMessage(e.target.value)} />
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" mr={3} onClick={msgModalOnClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={msgSendHandler}>
              Send message
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Center h="90vh">
        <Box w="sm" rounded={"md"} boxShadow="md" bg="gray.50" h="lg">
          <Flex direction={"column"} w={"sm"}>
            <Flex
              position={"relative"}
              direction={"column"}
              bg={"gray.100"}
              h={48}
              w="100%"
              align={"center"}
              justify={"center"}
            >
              <Center
                cursor={"pointer"}
                bg="white"
                h={10}
                w={10}
                rounded={"full"}
                fontSize={"xl"}
                position={"absolute"}
                top={5}
                right={8}
                onClick={() => navigate(-1)}
              >
                <ArrowBackIcon />
              </Center>

              <Avatar src="https://bit.ly/broken-link" />
              <Text
                fontSize={"2xl"}
              >{`${data?.first_name} ${data?.last_name}`}</Text>
              <Text>
                created at - {new Date(data?.createdAt).toDateString()}
              </Text>
            </Flex>
            <Flex h={80} justifyContent={"space-around"} direction={"column"}>
              <Box>
                <Tag
                  size={"lg"}
                  ml={5}
                  mt={5}
                  variant={"solid"}
                  colorScheme="blue"
                >
                  <TagLeftIcon boxSize={"20px"} as={PhoneIcon}></TagLeftIcon>
                  <TagLabel>{data?.contact_no}</TagLabel>
                </Tag>
                <Tag
                  size={"lg"}
                  ml={5}
                  mt={5}
                  variant={"solid"}
                  colorScheme="blue"
                >
                  <TagLeftIcon boxSize={"20px"} as={EmailIcon}></TagLeftIcon>
                  <TagLabel>{data?.email}</TagLabel>
                </Tag>
              </Box>
              <Flex direction={"column"} gap={2} mx={5}>
                <Button
                  colorScheme={"facebook"}
                  variant="outline"
                  onClick={msgModalOnOpen}
                >
                  Send Message
                </Button>
                <Button colorScheme={"facebook"} onClick={otpModalOnOpen}>
                  Send OTP
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Center>
    </Container>
  );
};

export default Index;
