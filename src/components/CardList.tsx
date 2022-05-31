import { AlertDialog, Box, GridItem, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {

  // TODO MODAL USEDISCLOSURE
  
  const {isOpen, onClose, onOpen} = useDisclosure();
  
  
  // TODO SELECTED IMAGE URL STATE
  const [selectedImage, setSelectedImage] = useState("");

  // TODO FUNCTION HANDLE VIEW IMAGE

  function handleViewImage(url: string){
      onOpen();

      setSelectedImage(url);
  }



  return (
    <>
      {/* TODO CARD GRID */}

        <SimpleGrid 
          columns={[3]} 
          spacing={["40px"]}
        >

          {cards.length > 0 &&
              cards.map( c => 
                <GridItem 
                  onClick={() => handleViewImage(c.url)}
                  key={c.id}
                >
                  <Card
                    data= {c}
                    viewImage= {() => c.url}
                  />
                </GridItem>
              )
          }

        </SimpleGrid>

      {/* TODO MODALVIEWIMAGE */}
      {
        <ModalViewImage 
          isOpen ={isOpen}
          onClose={onClose}
          imgUrl ={selectedImage}
        />
      }
    </>
  );
}
