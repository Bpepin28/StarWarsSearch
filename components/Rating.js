import { StarIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/react';

const Rating = ({ rating }) => {
    return (
        <Flex align="center">
            {[...Array(parseInt(parseFloat(rating).toFixed()))].map((_, i) => ( // On affiche une étoile pour 1 de "rating" ne connaissant pas la note maximal je n'ai pas mis d'étoile grise
                <StarIcon
                    key={i}
                    color={'yellow.400'}
                />
            ))}
            <Text ml={2} fontSize="sm">{rating}</Text>
        </Flex>
    );
};

export default Rating;