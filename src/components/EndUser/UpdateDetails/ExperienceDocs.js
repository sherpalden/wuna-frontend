import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import BackupRoundedIcon from '@material-ui/icons/BackupRounded';
import AttachmentRoundedIcon from '@material-ui/icons/AttachmentRounded';
import {
  Grid,
  Avatar,
  Paper,
  MenuItem,
  FormHelperText,
  Select,
  CircularProgress,
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import TextField, { Input } from 'components/common/inputs/TextInput';
import { useDocument } from 'hooks/useDocument/documentContext';
import useUser from 'hooks/useUser/userContext';
import styled from 'styled-components';
import ContentHeader from 'components/common/ContentHeader';
import { StyledButton } from 'components/common/Button';
import { useHistory } from 'react-router-dom';
import { InputLabel } from '@material-ui/core';

const StyledFileList = styled(Paper)`
  padding: 20px;
`;

const StyledAcceptedFiles = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 10px;
`;

const StyledContainerWrapper = styled.div`
  padding-bottom: 40px;
`;

const StyledFormWrapper = styled.div`
  padding: 20px;
  background-color: white;
`;

const StyledDropzoneWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

export const ExperienceDocs = () => {
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const { control, handleSubmit, errors, register } = useForm();

  const onDrop = useCallback((files) => {
    setAcceptedFiles(files);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.jpeg, .png, .jpg, .pdf, .docx',
  });
  const disabled = false;
  const history = useHistory();

  const {
    addDocument,
    state: { loading },
  } = useDocument();

  const { user } = useUser();

  const onSubmitData = (s) => {
    const fileFormData = new FormData();
    fileFormData.append('file', acceptedFiles[0]);
    Object.keys(s).forEach(
      (key) => s[key] !== undefined && fileFormData.append(key, s[key])
    );
    fileFormData.append('userId', user.id);
    addDocument(fileFormData);
  };

  return (
    <StyledContainerWrapper>
      <ContentHeader
        heading="Add Document"
        handleBack={() => history.push('/documents')}
      />
      <StyledFormWrapper>
        <form onSubmit={handleSubmit(onSubmitData)}>
          <Grid container spacing={4}>
            <Grid item xs={12} lg={6}>
              <StyledDropzoneWrapper {...getRootProps()}>
                <input {...getInputProps()} />
                <div>
                  {' '}
                  <BackupRoundedIcon size={60} />{' '}
                </div>
                <div>
                  {' '}
                  <StyledButton color="primary">
                    {' '}
                    Browse or Drag and Drop Files{' '}
                  </StyledButton>{' '}
                </div>
              </StyledDropzoneWrapper>
            </Grid>
            <Grid item xs={12} lg={6}>
              {acceptedFiles.length > 0 && (
                <StyledFileList>
                  {acceptedFiles.map((file) => (
                    <StyledAcceptedFiles>
                      <div>
                        <Avatar>
                          <AttachmentRoundedIcon />
                        </Avatar>
                      </div>
                      <div style={{ fontWeight: 'bold' }}>{file.name}</div>
                    </StyledAcceptedFiles>
                  ))}
                </StyledFileList>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item xs={12} lg={6}>
              <Controller
                name="documentName"
                as={
                  <TextField
                    fullWidth
                    id="documentName"
                    label="Document Name"
                    variant="outlined"
                    type="text"
                    size="small"
                    error={
                      errors.documentName &&
                      errors.documentName.type === 'required'
                    }
                    helperText={
                      errors.documentName && 'Document Name is required'
                    }
                    disabled={disabled}
                  />
                }
                control={control}
                rules={{
                  required: true,
                }}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Controller
                name="startDate"
                as={
                  <TextField
                    fullWidth
                    id="startDate"
                    label="Issue Date"
                    variant="outlined"
                    type="date"
                    size="small"
                    error={
                      errors.startDate && errors.startDate.type === 'required'
                    }
                    helperText={errors.startDate && 'Start Date is required'}
                    disabled={disabled}
                  />
                }
                control={control}
                rules={{
                  required: false,
                }}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Controller
                name="expiryDate"
                as={
                  <TextField
                    fullWidth
                    id="expiry_date"
                    label="Expiry Date"
                    variant="outlined"
                    type="date"
                    size="small"
                    error={
                      errors.expiryDate && errors.expiryDate.type === 'required'
                    }
                    helperText={errors.expiryDate && 'Expiry Date is required'}
                    disabled={disabled}
                  />
                }
                control={control}
                rules={{
                  required: false,
                }}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <InputLabel
                htmlFor={'type'}
                style={{
                  fontSize: 12,
                  color: '#8798AD',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                }}
              >
                Category
              </InputLabel>
              <Controller
                name="type"
                as={
                  <Select
                    disabled={disabled}
                    fullWidth
                    label="Document Category"
                    labelId="type"
                    id="type"
                    input={<Input />}
                    ref={register({
                      minLength: {
                        value: 1,
                        message: 'Document Category is required',
                      },
                    })}
                    defaultValue={['trades and qualifications']}
                  >
                    <MenuItem value={'trades and qualifications'}>
                      {' '}
                      Trades and Qualifications{' '}
                    </MenuItem>
                    <MenuItem value={'temporary certificates'}>
                      {' '}
                      Temporary Certificates and Licenses{' '}
                    </MenuItem>
                    <MenuItem value={'proof of identification'}>
                      {' '}
                      Proof of Identification{' '}
                    </MenuItem>
                    <MenuItem value={'cultural heritage identification'}>
                      {' '}
                      Cultural Heritage Identification{' '}
                    </MenuItem>
                    <MenuItem value={'employment'}> Employment </MenuItem>
                  </Select>
                }
                control={control}
                rules={{
                  required: true,
                }}
              />
              {errors.type && (
                <FormHelperText>Document Category is required</FormHelperText>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item xs={4}>
              {!disabled && (
                <StyledButton
                  color="primary"
                  type="submit"
                  variant="contained"
                  submitBtn
                  endIcon={
                    loading && <CircularProgress color="white" size={15} />
                  }
                >
                  Submit
                </StyledButton>
              )}
              <StyledButton
                type="button"
                color="secondary"
                variant="contained"
                onClick={() => history.push('/documents')}
                style={{ marginLeft: '10px' }}
              >
                Cancel
              </StyledButton>
            </Grid>
          </Grid>
        </form>
      </StyledFormWrapper>
    </StyledContainerWrapper>
  );
};

export default ExperienceDocs;
