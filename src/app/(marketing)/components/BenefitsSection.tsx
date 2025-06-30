import {
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
} from '@chakra-ui/react';

export const BenefitsSection = () => {
  return (
    <Grid
      templateRows={{
        base: 'repeat(4, 1fr)',
        md: 'repeat(3, 1fr)',
        lg: 'repeat(6, 1fr)',
      }}
      templateColumns={{
        base: '1fr',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(3, 1fr)',
      }}
      gridAutoFlow="column"
      gap={8}
    >
      <GridItem colSpan={{ base: 1, md: 2 }} rowSpan={{ base: 1, lg: 3 }}>
        <Card>
          <CardHeader>
            <Heading as="h2" size="lg">
              🎉 Celebrate achievements with wins
            </Heading>
          </CardHeader>
          <CardBody flexGrow={0}>
            Post a win to celebrate a personal achievement or show recognition of a teammates efforts.
          </CardBody>

        </Card>
      </GridItem>
      <GridItem
        colSpan={{ base: 1, lg: 2 }}
        rowSpan={{ base: 1, md: 2, lg: 3 }}
      >
        <Card>
          <CardHeader>
            <Heading as="h2" size="lg">
              🚨 A fun way to hold teammates accountable
            </Heading>
          </CardHeader>
          <CardBody flexGrow={0}>
            Work together as a team towards the team values by making accountability fun
            using fines.
          </CardBody>
        </Card>
      </GridItem>
      <GridItem rowSpan={{ base: 1, lg: 2 }}>
        <Card>
          <CardHeader>
            <HStack>
              <Heading as="h2" size="2xl">
                100%
              </Heading>
              <Icon
                viewBox="0 0 60 40"
                stroke="primary.600"
                strokeWidth="5"
                strokeLinecap="round"
                fill="transparent"
                h={{ base: 8, md: 10 }}
                w={{ base: 12, md: 16 }}
              >
                <path d="m 2.1092974,37.996584 12.8512086,-17.24258 8.911888,9.10563 11.49505,-17.04884 10.1389,12.46374 9.55768,-23.1838362" />
              </Icon>
            </HStack>
          </CardHeader>
          <CardBody flexGrow={0}>Control post permissions to build a safe environment.</CardBody>
        </Card>
      </GridItem>
      <GridItem rowSpan={{ base: 1, lg: 4 }}>
        <Card>
          <CardHeader>
            <Heading as="h2" size="lg">
              💪 Pay off fines with fun activities
            </Heading>
          </CardHeader>
          <CardBody flexGrow={0}>
            Participate in fun team building activities and friendly competitions to pay off those fines.
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
};
