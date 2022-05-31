import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK
  return (<Modal
          isOpen={isOpen}
          onClose={onClose}
        >
        <ModalOverlay />
        <ModalContent>
          <ModalBody
            bg="pGray.800"
            maxWidth={["900px"]}
            maxHeight={["600px"]}
            p={["0"]}
          >
            <Image 
              src={imgUrl}
              w="inherit"
            />
          </ModalBody>
          <ModalFooter
            bg="pGray.800"
            w={["inherit"]}
            h={["32px"]}
            justifyContent="left"
            fontSize={["14px"]}
          >
            <Link 
              href={imgUrl}
              passHref
              target="_blank"
              outline="none"
            >
              <a>Abrir original</a>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>)
}
