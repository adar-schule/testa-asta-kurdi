Testa Asta Kurdi Live @ https://testa-asta-kurdi-cda9ea8e953a.herokuapp.com/

---
## Testa Asta Kurdî - Kurdish Language Assessment Application

### Key Features:
1. **Frontend (FE)**:
   - **User Assessment Flow**:
     - Users can:
       - Skip providing personal details or fill in name, surname, email, and phone number at the start of the assessment.
       - Take an assessment that includes two types of questions:
         1. **Multi-select**: Users choose one correct answer from a list of options.
         2. **Fill-in-the-blank**: Users type their answer in the blank space.
       - Navigate between questions using "Next" and "Back" buttons.
       - Submit the assessment, which will calculate their score and assign a proficiency level (A1, A2, B1, etc.).
     - Score calculation based on:
       - Correct answers for **multi-select** questions.
       - Matching answers for **fill-in-the-blank** questions.
   - **Admin Flow**:
     - Admin can:
       - **Add** new questions to the database.
         - Specify question type (multi-select or fill-in-the-blank).
         - Provide the correct answer(s).
       - **Edit** existing questions (modify text, answers, or correct answers).
       - **Delete** questions from the database.
       - **View submitted assessments**, which will display:
         - User's answers.
         - User's optional details (name, email, etc.).
         - Final score and proficiency level.

2. **Backend (BE)**:
   - **Question Management**:
     - Handles storing and retrieving questions from MongoDB.
     - API for:
       - **Adding** new questions.
       - **Editing** existing questions.
       - **Deleting** questions.
       - **Fetching** questions for users taking the assessment.
   - **Assessment Submission**:
     - Stores user assessments and their answers.
     - Calculates the score based on correct answers.
     - Maps the score to a proficiency level based on predefined ranges.
       - For example:
         - **A1.1**: 0–10 points.
         - **A1.2**: 11–20 points.
         - **A2.1**: 21–30 points, etc.
     - Provides APIs for fetching assessments for admin view.

### To-Do List:
1. **Frontend (User Assessment Flow)**:
   - [x] Question page structure with dummy data.
   - [x] UI and components for rendering multi-select and fill-in-the-blank question types.
   - [x] Basic language switching functionality (multi-language support: English, German, Kurmanci).
   - [ ] Integrate BE to fetch questions from MongoDB.
   - [ ] Submit answers to BE for score calculation and result tracking.
   - [ ] Admin screens for Question management: Add/Update/Delete
   - [ ] Admin screens for Assessment Result Tracking: List all taken assesments with filterable table (later +pagination)

2. **Backend (Question & Assessment Management)**:
   - [ ] Question schema structure, including types and correct answers.
   - [ ] API for fetching questions from MongoDB.
   - [ ] API for submitting user assessments.
   - [ ] Implement score calculation logic.
   - [ ] API to return final score and proficiency level to the frontend.
   - [ ] Admin dashboard to manage questions (add, edit, delete) and view taken assessments with user data and scores.