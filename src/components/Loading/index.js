import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Center,
  Spinner,
} from "@chakra-ui/react";

const index = () => {
  return (
    <Modal
      size={"xs"}
      closeOnOverlayClick={false}
      isOpen={true}
      isCentered={true}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Center py={10}>
            <Spinner size="lg" />
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default index;
