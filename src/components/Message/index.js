import { EmailIcon, PhoneIcon, TimeIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Icon,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
} from "@chakra-ui/react";
import React from "react";

const Index = ({ otp, message_body, sent_to, sent_date }) => {
  // console.log({ otp, message_body, sent_to, sent_date });
  const date = new Date(sent_date);
  return (
    <Box
      cursor={"pointer"}
      w={{ base: "3xs", md: "xs", lg: "md" }}
      h={{ base: "2xs", md: "2xs", lg: "3xs" }}
      rounded="md"
      boxShadow={"md"}
      bg="blue.50"
      p={5}
    >
      <Box>
        <Tag size={{ base: "sm", md: "md" }} colorScheme={"blue"}>
          <TagLeftIcon as={PhoneIcon}></TagLeftIcon>
          <TagLabel>Sent to - {sent_to}</TagLabel>
        </Tag>
      </Box>
      <Box mt={5}>
        <Box p={2} rounded="md" bg={"green.200"}>
          <Text fontSize={{ base: "sm", md: "md" }}>
            Message- {message_body}
          </Text>
        </Box>
        <Flex direction={{ base: "column" }} justify={"space-between"} mt={5}>
          <Tag size={{ base: "sm", md: "md" }} colorScheme={"orange"}>
            <TagLabel>OTP- {otp}</TagLabel>
          </Tag>
          <Tag mt={5} size={{ base: "sm", md: "md" }} colorScheme={"blue"}>
            <TagLeftIcon as={TimeIcon}></TagLeftIcon>
            <TagLabel>
              {date.toDateString()}-{date.getHours()}:{date.getMinutes()}:
              {date.getSeconds()}
            </TagLabel>
          </Tag>
        </Flex>
      </Box>
    </Box>
  );
};

export default Index;
