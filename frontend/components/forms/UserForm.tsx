// /frontend/components/forms/UserForm.tsx
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Heading,
  useToast,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../../context/UserContext";  // Import the useUser hook

const UserForm = () => {
  const { user, setUser } = useUser();  // Access user data from context
  const [name, setName] = useState(user.name);
  const [surname, setSurname] = useState(user.surname);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const toast = useToast();
  const router = useRouter();

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // If any field is empty, show a validation error
    if (!name || !surname || !email || !phone) {
      toast({
        title: "Form Error",
        description: "Please fill in all fields to continue with data.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Update the context with the user's data
    setUser({
      name,
      surname,
      email,
      phone,
    });

    // Display success message
    toast({
      title: "Form submitted.",
      description: "We've received your details.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    // Proceed to test page
    router.push("/assessment/questions");
  };

  // Skip form validation and go directly to the test
  const handleSkip = () => {
    router.push("/assessment/questions");
  };

  return (
    <Box w="full" maxW="500px" mx="auto" p={4} borderRadius="md" bg="white" shadow="md">
      <VStack as="form" onSubmit={handleSubmit} spacing={4} align="stretch">
        <Heading size="lg" mb={4} textAlign="center">
          User Information
        </Heading>

        <FormControl id="name">
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>

        <FormControl id="surname">
          <FormLabel>Surname</FormLabel>
          <Input
            placeholder="Enter your surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </FormControl>

        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl id="phone">
          <FormLabel>Phone</FormLabel>
          <Input
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </FormControl>

        {/* Buttons */}
        <HStack spacing={4} w="full">
          <Button colorScheme="teal" type="submit" size="lg" w="full">
            Continue with Data
          </Button>
          <Button colorScheme="gray" size="lg" w="full" onClick={handleSkip}>
            Continue without Data
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default UserForm;