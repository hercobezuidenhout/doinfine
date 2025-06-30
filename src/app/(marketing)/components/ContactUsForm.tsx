'use client';

import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { sendEmail } from '../actions';
import { useRef } from 'react';

export const ContactUsForm = () => {
  const ref = useRef<HTMLFormElement>(null);
  const toast = useToast();
  return (
    <VStack
      as="form"
      ref={ref}
      action={async (formData) => {
        try {
          await sendEmail(formData);
          ref.current?.reset();
          toast({ title: 'Your message has been sent', status: 'success' });
        } catch {
          toast({
            title: "We couldn't send you message. Please try again",
            status: 'error',
          });
        }
      }}
      align="stretch"
      textAlign="left"
      gap={8}
    >
      <Heading size="md">Contact Us</Heading>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input name="name" placeholder="Enter your name" required />
      </FormControl>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          name="email"
          placeholder="Enter your email"
          required
          type="email"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Message</FormLabel>
        <Textarea
          rows={3}
          name="message"
          placeholder="Enter your message"
          required
        />
      </FormControl>
      <Button type="submit" size="xl">
        Submit
      </Button>
    </VStack>
  );
};
