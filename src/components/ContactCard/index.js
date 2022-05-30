import { Center, Heading } from "@chakra-ui/react";
import React from "react";

import { useNavigate } from "react-router-dom";

const Index = ({ id, firstName, lastName }) => {
  const navigate = useNavigate();
  const contactHandler = () => {
    navigate(`/contact/${id}`);
  };

  return (
    <>
      <Center
        onClick={contactHandler}
        cursor={"pointer"}
        w={"100%"}
        h={16}
        rounded="md"
        boxShadow={"md"}
        bg="blue.200"
      >
        <Heading fontSize={"2xl"}>{`${firstName} ${lastName}`}</Heading>
      </Center>
    </>
  );
};

export default Index;
