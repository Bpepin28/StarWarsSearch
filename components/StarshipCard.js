import React, { useState } from 'react';
import { Text, Box, Heading, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import Rating from './Rating';

const StarshipCard = ({ starship }) => {
  const { name, model, manufacturer, crew, passengers, films, hyperdrive_rating } = starship;
  const [filmTitles, setFilmTitles] = useState([]); // Tableau des titres des films
  const { isOpen, onOpen, onClose } = useDisclosure(); // État de la modal

  const fetchFilmTitles = async () => { // Récupération des titres des films
    try {
      const filmTitles = await Promise.all(
        films.map(async (filmUrl) => {
          const response = await axios.get(filmUrl);
          return response.data.title;
        })
      );
      setFilmTitles(filmTitles);
    } catch (error) {
      console.error('Erreur lors de la récupération des titres des films :', error);
    }
  };

  const handleOpenModal = () => { // Ouverture de la modal et récupération des titres des films. Fait au moment de l'ouverture de la modal pour éviter beaucoup de requête d'un coup au chargement
    onOpen();
    fetchFilmTitles();
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="md" width='md'>
      <Heading as="h3" size="md" color='#ffe81f'>
        {name}
      </Heading>
      <Button size="sm" mt={3} onClick={handleOpenModal}>
        Voir détails
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mt={2}>
              <Text>
                <strong>Modèle: </strong> {model}
              </Text>
              <Text>
                <strong>Fabricant: </strong> {manufacturer}
              </Text>
              <Text>
                <strong>Équipage: </strong> {crew}
              </Text>
              <Text>
                <strong>Passagers: </strong> {passengers}
              </Text>
              {hyperdrive_rating != 'unknown' &&
                <Box>
                  <strong>Note hyperdrive : </strong> <Rating rating={hyperdrive_rating} />
                </Box>
              }
              <Text mt={2}>
                <strong>Films: </strong>
              </Text>
              {filmTitles.map((filmTitle, index) => (
                <Text key={index}>{filmTitle}</Text>
              ))}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Fermer</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default StarshipCard;
