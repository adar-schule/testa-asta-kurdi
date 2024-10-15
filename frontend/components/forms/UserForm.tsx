// /frontend/components/forms/UserForm.tsx
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    Select,
    VStack,
    Heading,
    useToast,
  } from "@chakra-ui/react";
  import { useState } from "react";
  
  const UserForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [proficiency, setProficiency] = useState("A1");
    const toast = useToast();
  
    // Dummy submit handler
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
  
      // Simulate backend call with dummy data
      const userData = {
        name,
        email,
        proficiency,
      };
  
      console.log("Submitted User Data:", userData);
  
      // Display success message
      toast({
        title: "Form submitted.",
        description: "We've received your details.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
  
      // Clear form fields
      setName("");
      setEmail("");
      setProficiency("A1");
    };
  
    return (
      <Box w="full" maxW="500px" mx="auto" p={4} borderRadius="md" bg="white" shadow="md">
        <VStack as="form" onSubmit={handleSubmit} spacing={4} align="stretch">
          <Heading size="lg" mb={4} textAlign="center">
            User Information
          </Heading>
  
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
  
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
  
          <FormControl id="proficiency" isRequired>
            <FormLabel>Proficiency Level</FormLabel>
            <Select
              value={proficiency}
              onChange={(e) => setProficiency(e.target.value)}
            >
              <option value="A1">A1</option>
              <option value="A2">A2</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
              <option value="C1">C1</option>
              <option value="C2">C2</option>
            </Select>
          </FormControl>
  
          <Button colorScheme="teal" type="submit" size="lg" w="full">
            Submit
          </Button>
        </VStack>
      </Box>
    );
  };
  
  export default UserForm;