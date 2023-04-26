import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Text, Center, Heading, Box, Button, VStack, SimpleGrid, Spinner, Input, HStack } from '@chakra-ui/react';
import StarshipCard from '../components/StarshipCard';

const IndexPage = () => {
  const [currentItems, setCurrentItems] = useState([]);// Ajout de la liste des vaisseaux
  const [currentPage, setCurrentPage] = useState(1);// Ajout du numéro de page actuel
  const [loading, setLoading] = useState(false); // Ajout de l'étal du loading
  const [searchTerm, setSearchTerm] = useState(""); // Ajouter de la variable du champs de recherche
  const [maxPages, setMaxPages] = useState(0);// Ajout du nombre maximum de page

  useEffect(() => {
    fetchStarships();
  }, [currentPage]); // On réapelle fetchStarships() si currentPage est modifié

  const fetchStarships = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://swapi.dev/api/starships/?search=${searchTerm}&page=${currentPage}`);
      const { results, count } = response.data;
      setCurrentItems(results);
      setMaxPages(Math.ceil(count / 10));
    } catch (error) {
      console.error("Failed to fetch starships:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Mettre à jour le terme de recherche en fonction de la saisie de l'utilisateur
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (currentPage != 1) {
        setCurrentPage(1); // Repasser sur la page 1 quand une recherche est faites lorsque la touche "Entrée" est pressée ce qui relance fetchStarships 
      } else {
        fetchStarships(); // Si déjà sur la page 1 on relance la requête
      }
    }
  };

  const handleResearch = (event) => { // Executé au clic du bouton "Rechercher"
    fetchStarships();
  };

  const handlePageChange = async (newPage) => { // Executé lors d'un clic du suivant ou précédent
    if (newPage === currentPage || (newPage < 1 || newPage > maxPages)) { // On vérifie la page cible
      return;
    }
    setCurrentPage(newPage);
  };

  return (
    <Box bg='gray.800' minHeight='100vh'>
      <Center>
        <Heading as="h1" verticalAlign='center' size="xl" color='#ffe81f'>
          Star Wars Search
        </Heading>
      </Center>
      <Center>
        <VStack spacing={4} p={4}>
          <Box>
            <HStack mb={4}>
              <Input
                placeholder="Rechercher un vaisseau spatial"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                color='white' variant='flushed'
              />
              <Button
                backgroundColor='transparent'
                fontSize='20px'
                _hover={{ backgroundColor: 'transparent' }}
                onClick={handleResearch}
                border='2px'
                borderColor='darkgray'
              >🚀</Button>
            </HStack>
            {loading ? (
              <Center>
                <Spinner size='xl' color='white' />
              </Center>
            ) : (
              currentItems.length != 0 ? (<SimpleGrid columns={[1, 2]} spacing={4}>
                {currentItems.map((starship) => (
                  <StarshipCard key={starship.name} starship={starship} />
                ))}
              </SimpleGrid>) : <Center><Text color='#fff'>Aucun vaisseau trouvé.</Text></Center>
            )}
          </Box>
          <Center>
            <Button
              border='2px'
              borderColor='darkgray'
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1} // Désactiver le bouton si on est déjà sur la première page
            >
              Précédent
            </Button>
            {[...Array(maxPages)].map((_, i) =>
              <Button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                color={currentPage !== i + 1 ? 'white' : 'black'}
                colorScheme={currentPage !== i + 1 ? 'blackAlpha' : 'gray'}
                border='2px'
                borderColor='darkgray'
                m={1}
              >
                {i + 1}
              </Button>
            )}
            <Button
              border='2px'
              borderColor='darkgray'
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === maxPages} // Désactiver le bouton si on est déjà sur la dernière page
            >
              Suivant
            </Button>
          </Center>
        </VStack>
      </Center>
    </Box>
  );
};

export default IndexPage;
