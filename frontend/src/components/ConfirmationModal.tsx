import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Text, Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    questions: any[];
    answers: { [key: number]: string };
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onSubmit, questions, answers }) => {
    const { t } = useTranslation();

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{t('assessmentSubmitModal.title')}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {questions.map((question, index) => (
                        <Box key={question.id} mb={4}>
                            <Text fontWeight="bold" color="teal.500">
                                {index + 1}. {question.question}
                            </Text>
                            <Text color="gray.600">
                                {t('assessmentSubmitModal.yourAnswer')}: {' '}
                                {answers[question.id] ? (
                                    <Text as="b" display="inline">&quot;{answers[question.id]}&quot;</Text>
                                ) : (
                                    <Text as="i" color="gray.400" display="inline">
                                        {t('assessmentSubmitModal.noAnswer')}
                                    </Text>
                                )}
                            </Text>
                        </Box>
                    ))}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="gray" onClick={onClose}>
                        {t('assessmentSubmitModal.cancel')}
                    </Button>
                    <Button colorScheme="teal" ml={3} onClick={onSubmit}>
                        {t('assessmentSubmitModal.confirm')}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ConfirmationModal;