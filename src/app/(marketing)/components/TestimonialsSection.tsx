import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import Testimonials from '../../../../public/assets/marketing/testimonials.json';

export const TestimonialsSection = () => {
  return (
    <VStack spacing={8}>
      <Heading>Testimonials</Heading>
      <Flex flexWrap="wrap" gap={4} justifyContent="center">
        {Testimonials.map(
          ({ author, image, testimonial, industry, position }) => (
            <Card
              key={author}
              flexBasis={{
                base: '100%',
                md: 'calc((100% - 0.5rem)/ 2)',
                lg: 'calc((100% - 1rem)/ 3)',
              }}
            >
              <CardHeader>
                <HStack>
                  <Avatar name={author} src={image} />
                  <VStack align="flex-start" gap={0}>
                    <Text>{author}</Text>
                    <Text>{position}</Text>
                  </VStack>
                </HStack>
              </CardHeader>
              <CardBody>{testimonial}</CardBody>
              <CardFooter fontSize="sm" color="chakra-subtle-text">
                {industry}
              </CardFooter>
            </Card>
          )
        )}
      </Flex>
    </VStack>
  );
};
