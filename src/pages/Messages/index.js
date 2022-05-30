import {
  Box,
  Center,
  Container,
  Flex,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getMessages } from "../../api/messagesApiCall";
import MessageCard from "../../components/Message";
const Index = () => {
  const { data, status, refetch } = useQuery("list-messages", getMessages);
  console.log(data);
  const isLoading = useSelector((state) => state.loading.isLoading);
  useEffect(() => {
    refetch();
  }, [refetch, isLoading]);
  return (
    <Container maxW={"container.xl"}>
      <Box
        h="auto"
        flex={0.25}
        rounded="md"
        boxShadow={"md"}
        scrollBehavior={"smooth"}
        w={"100%"}
        minH="85vh"
        my={2}
        mt={{ base: 5, md: 0 }}
      >
        <Flex align={"center"} px={5} w="100%" gap={3} direction={"column"}>
          <Text as={"h2"} fontSize={"3xl"}>
            Messages
          </Text>
          <Center w="100%">
            <Wrap
              w="100%"
              spacing={5}
              justify={"center"}
              align="center"
              py={5}
            >
              {status === "success" &&
                data.map((contact) => (
                  <WrapItem>
                    <MessageCard
                      key={contact._id}
                      otp={contact.otp}
                      message_body={contact.message_body}
                      sent_date={contact.sent_date}
                      sent_to={contact.send_to}
                    />
                  </WrapItem>
                ))}
              {/* <Box w="100%" boxShadow={"md"}>
      <Text fontSize={"xl"}>Add Contact:</Text>
    </Box> */}
            </Wrap>
          </Center>
        </Flex>
      </Box>
    </Container>
  );
};

export default Index;
