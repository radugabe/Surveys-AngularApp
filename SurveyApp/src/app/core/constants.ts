export const API_URL = 'http://localhost:3000';
//export const API_URL = 'http://192.168.100.21:3000';

export const API_ENDPOINTS = {
  USERS: `${API_URL}/users`,
  SURVEYS: `${API_URL}/surveys`,
  RESULTS: `${API_URL}/results`,
  RESPONSES: `${API_URL}/responses`
};

export const API_PATTERNS = {
  SURVEY_RESPONSES: `${API_ENDPOINTS.SURVEYS}/{{surveyId}}/responses`,
  RESPONSE_DETAIL: `${API_ENDPOINTS.RESPONSES}/{{responseId}}`,
  USER_DETAIL: `${API_ENDPOINTS.USERS}/{{userId}}`,
  LOGIN_QUERY: `${API_ENDPOINTS.USERS}?username={{username}}&password={{password}}`,
  CHECK_USERNAME: `${API_ENDPOINTS.USERS}?username={{username}}`,
  SURVEY_DETAIL: `${API_ENDPOINTS.SURVEYS}/{{surveyId}}`
}

export const LOCAL_STORAGE_KEYS = {
  CURRENT_USER: 'currentUser'
};

export const CONFIG_VALUES  = {
  SURVEY_AUTOCLOSE_TIME_SECONDS: 86400
};

export const MESSAGES = {
  REQUIRED_FIELDS: 'Please fill in all fields!',
  REQUIRED_FIELDS_DOT: 'Please fill in all fields.',
  TITLE_REQUIRED: 'Please enter a survey title.',
  LOGIN_SUCCESS: 'Logged in!',
  LOGIN_FAIL: 'Wrong username or password!',
  SURVEY_SAVED: 'Survey saved successfully!',
  SURVEY_DELETED: 'Survey deleted!',
  SURVEY_CLOSED: 'Survey closed!',
  SURVEY_REOPENED: 'Survey reopened!',
  SURVEY_DELETE_ERROR: 'Error deleting survey:',
  INVALID_USERNAME: 'Invalid username.',
  INVALID_PASSWORD: 'Password does not meet the requirements.',
  PASSWORD_MATCH: 'Passwords do not match.',
  TAKEN_USERNAME: 'This username is already taken.',
  ACCOUNT_CREATED_SUCCESSFULLY: 'Account created successfully',
  REQUIRED_QUESTIONS: 'All questions must be filled in.',
  REQUIRED_ANSWER_OPTIONS: 'Each question must have at least 2 answer options.',
  CONFIRM_DELETE: 'Are you sure you want to delete this survey?',
  DELETE_ERROR: 'An error occurred while deleting!',
  RESPONSE_SUBMITTED: 'Response submitted successfully!',
  RESPONDENT_CONFIRM_SURVEY_CANCEL: 'Are you sure you want to cancel this survey?\nYour answers will not be saved.',
  ALREADY_COMPLETED_SURVEY: 'You have already completed this survey.',
  SURVEY_LOAD_ERROR: 'Unable to load survey results. Please try again later.',
  SESSION_EXPIRED: 'Your session has expired. Please log in again.',
  ANSWERS_SUBMIT_ERROR: 'Unable to submit your answers. Please try again.',
  INFORMATION_RETRIEVE_ERROR: 'Unable to retrieve your information. Please log in again.',
  LOGOUT_CONFIRMATION: 'Are you sure you want to log out?'
};

export const CHART_COLORS = {
  defaultBorderColor: '#a21a1a',
  defaultFillColor: '#930000',
  backgroundColors: [
    '#a21a1a',
    '#356d38',
    '#98650d',
    '#342f7d',
    '#b71c1c90',
    '#6e6e6e'
  ],
  axisColor: '#CCCCCC',
  gridColor: 'rgba(255, 255, 255, 0.1)'
};


export const CHART_CONFIG = {
  defaultTension: 0.3,
  fontSize: 12,
  labelPadding: 15
};

export const TEXTS = {
  resultsChartTemplate: {

  },

  resultsTable: {
    optionHeader: 'Option',
    responsesHeader: 'Responses'
  },

  dialogSnackbar: {
    yes: 'Yes',
    no: 'No'
  },

  header: {
    welcomePrefix: 'Welcome, ',
    profile: 'Profile',
    logout: 'Logout'
  },

  notFound: {
    title: '404',
    message: "The page you're looking for doesn't exist.",
    goToHomepage: 'Go to Homepage'
  },

  questionForm: {
    sectionTitlePrefix: 'Question ',
    questionLabel: 'Question text',
    questionPlaceholder: 'Enter your question...',
    optionLabelPrefix: 'Option ',
    addOption: '+ Add Option',
    removeQuestion: 'Remove Question'
  },

  login: {
    title: 'Welcome to R.D. Surveys!',
    usernameLabel: 'Username',
    passwordLabel: 'Password',
    loginButton: 'Login',
    noAccountText: "Don't have an account?",
    registerLink: 'Register here'
  },

  register: {
    title: 'Register',
    usernameLabel: 'Username',
    passwordLabel: 'Password',
    confirmPasswordLabel: 'Confirm Password',
    registerButton: 'Register',
    haveAccountText: 'Already have an account?',
    loginLink: 'Login',
    validations: {
      username: {
        invalid: '4-20 characters, letters and numbers only, no spaces',
        valid: 'Username rule passed'
      },
      password: {
        length: 'At least 8 characters, no spaces',
        uppercase: 'At least one uppercase letter',
        number: 'At least one number',
        specialChar: 'At least one special character',
        allPassed: 'All password rules passed'
      },
      confirmPassword: {
        match: 'Passwords match',
        mismatch: 'Passwords do not match'
      }
    }
  },

  results: {
    titlePrefix: 'Survey Results: ',
    selectLabel: 'Visualization Type',
    chartSuffix: ' Chart',
    back: 'Back'
  },

  createSurvey: {
    title: 'Create a new Survey',
    surveyTitleLabel: 'Survey title',
    addQuestion: 'Add Question',
    cancel: 'Cancel',
    save: 'Save Survey'
  },

  survey: {
    submit: 'Submit',
    cancel: 'Cancel'
  },

  surveys: {
    respondent: {
      availableTitle: 'Available surveys to complete',
      closedTitle: 'Closed surveys (results available)',
      noAvailable: 'No surveys available for completion.',
      noClosed: 'No closed surveys.'
    },
    coordinator: {
      openTitle: 'Open surveys',
      closedTitle: 'Closed surveys',
      noOpen: 'No open surveys.',
      noClosed: 'No closed surveys.',
      addNewSurvey: 'Add new survey'
    }
  },

  surveysCard: {
    complete: 'Complete',
    completed: 'Completed',
    results: 'Results',
    close: 'Close',
    delete: 'Delete',
    reopen: 'Reopen'
  }
};
