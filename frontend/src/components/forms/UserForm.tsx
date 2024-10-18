import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Heading,
  useToast,
  Stack, // Updated from HStack for responsive stacking
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Updated to useNavigate
import { useUser } from "../../context/UserContext";
import { useTranslation } from 'react-i18next'; // Import useTranslation

const UserForm = () => {
  const { user, setUser } = useUser();
  const [name, setName] = useState(user.name);
  const [surname, setSurname] = useState(user.surname);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const toast = useToast();
  const navigate = useNavigate(); // Updated to useNavigate
  const { t } = useTranslation(); // Use useTranslation hook

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !surname || !email || !phone) {
      toast({
        title: t('formError.title'),
        description: t('formError.description'),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setUser({ name, surname, email, phone });

    toast({
      title: t('formSuccess.title'),
      description: t('formSuccess.description'),
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    navigate("/assessment/questions"); // Use navigate to redirect
  };

  const handleSkip = () => {
    navigate("/assessment/questions"); // Use navigate to skip form
  };

  return (
    <Box w="full" maxW="500px" mx="auto" p={4} borderRadius="md" bg="white" shadow="md">
      <VStack as="form" onSubmit={handleSubmit} spacing={4} align="stretch">
        <Heading size="lg" mb={4} textAlign="center">
          {t('userForm.heading')} {/* Translated heading */}
        </Heading>

        <FormControl id="name">
          <FormLabel>{t('userForm.nameLabel')}</FormLabel> {/* Translated label */}
          <Input
            placeholder={t('userForm.namePlaceholder')} // Translated placeholder
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>

        <FormControl id="surname">
          <FormLabel>{t('userForm.surnameLabel')}</FormLabel> {/* Translated label */}
          <Input
            placeholder={t('userForm.surnamePlaceholder')} // Translated placeholder
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </FormControl>

        <FormControl id="email">
          <FormLabel>{t('userForm.emailLabel')}</FormLabel> {/* Translated label */}
          <Input
            type="email"
            placeholder={t('userForm.emailPlaceholder')} // Translated placeholder
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl id="phone">
          <FormLabel>{t('userForm.phoneLabel')}</FormLabel> {/* Translated label */}
          <Input
            placeholder={t('userForm.phonePlaceholder')} // Translated placeholder
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </FormControl>

        {/* Use Stack component with responsive direction */}
        <Stack
          direction={{ base: 'column', md: 'row' }} // Column on small screens, row on larger screens
          spacing={4}
          w="full"
        >
          <Button colorScheme="teal" type="submit" size="lg" w="full">
            {t('userForm.continueWithData')} {/* Translated button text */}
          </Button>
          <Button colorScheme="gray" size="lg" w="full" onClick={handleSkip}>
            {t('userForm.continueWithoutData')} {/* Translated button text */}
          </Button>
        </Stack>
      </VStack>
    </Box>
  );
};

export default UserForm;