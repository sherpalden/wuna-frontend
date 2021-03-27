import React, { useReducer } from 'react';
import actionCreator from 'utils/actionCreator';
import * as documentClient from 'services/documentClient';
import { useSnackbar } from 'notistack';

const DocumentContext = React.createContext();

const ADD_DOCUMENT = 'add_document';
const ADD_DOCUMENT_SUCCESS = 'add_document_success';
const ADD_DOCUMENT_ERROR = 'add_document_error';

const addDocument = actionCreator(ADD_DOCUMENT);
const addDocumentSuccess = actionCreator(ADD_DOCUMENT_SUCCESS);
const addDocumentError = actionCreator(ADD_DOCUMENT_ERROR);

const GET_DOCUMENTS = 'get_documents';
const GET_DOCUMENTS_SUCCESS = 'get_documents_success';
const GET_DOCUMENTS_ERROR = 'get_documents_error';

const getDocuments = actionCreator(GET_DOCUMENTS);
const getDocumentsSuccess = actionCreator(GET_DOCUMENTS_SUCCESS);
const getDocumentsError = actionCreator(GET_DOCUMENTS_ERROR);

const initialState = {
  documentList: [],
  document: null,
  loading: false,
};

function documentReducer(state, action) {
  switch (action.type) {
    case ADD_DOCUMENT:
      return {
        ...state,
        loading: true,
        addDocument: {
          error: null,
        },
      };
    case ADD_DOCUMENT_SUCCESS:
      return {
        ...state,
        document: action.payload.document,
        loading: false,
        addDocument: {
          error: null,
        },
      };
    case ADD_DOCUMENT_ERROR:
      return {
        ...state,
        document: null,
        loading: false,
        addDocument: {
          error: action.payload,
        },
      };

    case GET_DOCUMENTS: {
      return {
        ...state,
        documentList: [],
        loading: true,
      };
    }
    case GET_DOCUMENTS_SUCCESS: {
      return {
        ...state,
        documentList: action.payload,
        loading: false,
      };
    }
    case GET_DOCUMENTS_ERROR: {
      return {
        ...state,
        documentList: [],
        error: action.payload,
      };
    }
    default:
      throw new Error();
  }
}

function DocumentProvider({ children }) {
  const [state, dispatch] = useReducer(documentReducer, initialState);
  const { enqueueSnackbar } = useSnackbar();

  async function add(params) {
    try {
      dispatch(addDocument());
      const response = await documentClient.add(params);
      if (response.status >= 400) {
        enqueueSnackbar(
          response?.data?.message || 'error while adding document',
          { variant: 'error' }
        );
        dispatch(
          addDocumentError(
            response?.data?.message || 'error while adding document '
          )
        );
      } else {
        const { document } = response.data;
        enqueueSnackbar('Document Successfully Added', { variant: 'success' });
        dispatch(addDocumentSuccess({ document }));
      }
    } catch (e) {
      enqueueSnackbar('Server Error', { variant: 'error' });
    }
  }

  async function getAll() {
    try {
      dispatch(getDocuments());
      const response = await documentClient.getAll();
      if (response.status >= 400) {
        dispatch(getDocumentsError('Error fetching documents'));
      } else {
        dispatch(getDocumentsSuccess(response.data.data));
      }
    } catch (e) {
      dispatch(getDocumentsError('Error fetching documents'));
    }
  }

  return (
    <DocumentContext.Provider
      value={{
        state,
        addDocument: (params) => add(params),
        getDocuments: getAll,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
}

function useDocument() {
  const context = React.useContext(DocumentContext);
  if (context === undefined) {
    throw new Error('useDocument must be used within a DocumentProvider');
  }
  return context;
}

export { DocumentContext, DocumentProvider, useDocument };
