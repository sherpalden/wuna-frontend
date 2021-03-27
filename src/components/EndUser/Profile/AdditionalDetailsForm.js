import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  CircularProgress,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core';
import TextField, { Input } from 'components/common/inputs/TextInput';
import Checkbox from 'components/common/inputs/Checkbox';
import { StyledButton } from 'components/common/Button';

const useStyles = makeStyles(() => ({
  selectLabel: {},
  label: {
    fontSize: 14,
    color: '#8798AD',
    textTransform: 'uppercase',
    fontWeight: 500,
  },
  error: {
    fontSize: 14,
    color: 'red',
    marginTop: '8px',
  },
}));

const defaultValues = {
  languagesSpoken: [],
  region: '',
  nationality: '',
  currentVisaType: '',
  emergencyHealthCondition: '',
  emergencyContact: {
    name: {
      firstName: '',
      middleName: '',
      lastName: '',
    },
    phone: '',
    relation: '',
  },
  diversity: '',
  gender: '',
  impairments: {
    physicalImpairment: false,
    mentalHealthImpairment: false,
  },
  originality: '',
  maternalGrandFather: {
    skinGroup: '',
    oldestAncestor: '',
    estateBelongings: '',
  },
  maternalGrandMother: {
    skinGroup: '',
    oldestAncestor: '',
    estateBelongings: '',
  },
  paternalGrandFather: {
    skinGroup: '',
    oldestAncestor: '',
    estateBelongings: '',
  },
  paternalGrandMother: {
    skinGroup: '',
    oldestAncestor: '',
    estateBelongings: '',
  },
};

const AdditionalDetailsForm = ({
  disabled,
  initialState,
  loading,
  onSubmit,
}) => {
  const { control, handleSubmit, errors, register, setValue, watch } = useForm({
    defaultValues: initialState ?? defaultValues,
  });

  const isOriginalityNone =
    watch('originality') ===
    'NOT_ABORIGINAL_INDIGENOUS_OR_TORRES_STRAIT_ISLANDER';

  useEffect(() => {
    if (disabled && initialState) {
      Object.keys(initialState).forEach((key) =>
        setValue(key, initialState[key])
      );
    }
  }, [disabled, setValue, initialState]);

  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormLabel component="legend">General Information</FormLabel>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <FormControl
            fullWidth
            error={
              errors.languagesSpoken?.length === 0 &&
              errors.languagesSpoken?.type === 'required'
            }
          >
            <InputLabel
              id="languagesSpoken"
              shrink
              classes={{ root: classes.label, error: classes.error }}
            >
              Speaking Language
            </InputLabel>
            <Controller
              name="languagesSpoken"
              as={
                <Select
                  disabled={disabled}
                  fullWidth
                  label="Speaking Language"
                  labelId="languagesSpoken"
                  id="languagesSpoken"
                  input={<Input />}
                  multiple
                  ref={register({
                    minLength: {
                      value: 1,
                      message: 'Speaking Language is required',
                    },
                  })}
                  defaultValue={[]}
                >
                  {/* TODO: validation of array for hook form */}
                  {/* TODO: insert valid Speaking language */}
                  <MenuItem value={'ENG'}>English</MenuItem>
                  <MenuItem value={'CHN'}>Chinese</MenuItem>
                  <MenuItem value={'JPN'}>Japanese</MenuItem>
                  <MenuItem value={'OTHER'}>Other</MenuItem>
                </Select>
              }
              control={control}
              rules={{
                required: true,
              }}
            />
            {errors.languagesSpoken && (
              <FormHelperText>Speaking Language is required</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Controller
            name="region"
            as={
              <TextField
                disabled={disabled}
                fullWidth
                id="region"
                label="Region"
                variant="outlined"
                type="text"
                size="small"
                error={errors.region && errors.region.type === 'required'}
                helperText={errors.region && 'Region is required'}
              />
            }
            control={control}
            rules={{
              required: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Controller
            name="emergencyHealthCondition"
            as={
              <TextField
                disabled={disabled}
                fullWidth
                id="emergencyHealthCondition"
                label="Emergency Health Condition"
                variant="outlined"
                type="text"
                size="small"
              />
            }
            control={control}
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <FormControl
            fullWidth
            error={errors.nationality && errors.nationality.type === 'required'}
          >
            <InputLabel
              id="nationality"
              shrink
              classes={{ root: classes.label, error: classes.error }}
            >
              Nationality
            </InputLabel>
            <Controller
              name="nationality"
              as={
                <Select
                  disabled={disabled}
                  onChange={control}
                  fullWidth
                  label="Nationality"
                  labelId="nationality"
                  id="nationality"
                  input={<Input />}
                  defaultValue={''}
                >
                  <MenuItem value={'AUSTRALIAN'}>Australia</MenuItem>
                  <MenuItem value={'NEW_ZEALAND'}>New Zealand</MenuItem>
                  <MenuItem value={'OTHER'}>Other</MenuItem>
                </Select>
              }
              control={control}
              rules={{
                required: true,
              }}
            />
            {errors.nationality && (
              <FormHelperText>Nationality is required</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <FormControl
            fullWidth
            error={
              errors.currentVisaType &&
              errors.currentVisaType.type === 'required'
            }
          >
            <InputLabel
              id="currentVisaType"
              shrink
              classes={{ root: classes.label, error: classes.error }}
            >
              Current Visa Type
            </InputLabel>
            <Controller
              name="currentVisaType"
              as={
                <Select
                  disabled={disabled}
                  fullWidth
                  id="currentVisaType"
                  input={<Input />}
                  defaultValue={''}
                >
                  <MenuItem value={'PERMANENT_RESIDENT'}>
                    Permanent Resident
                  </MenuItem>
                  <MenuItem value={'GRADUATE_VISA'}>Graduate Visa</MenuItem>
                  <MenuItem value={'WORKING_VISA'}>Working Visa</MenuItem>
                </Select>
              }
              control={control}
              rules={{
                required: true,
              }}
            />
            {errors.currentVisaType && (
              <FormHelperText>Current Visa Type is required</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <FormControl fullWidth>
            <InputLabel
              id="originality"
              shrink
              classes={{ root: classes.label, error: classes.error }}
            >
              Originality
            </InputLabel>
            <Controller
              name="originality"
              as={
                <Select
                  fullWidth
                  disabled={disabled}
                  label="Originality"
                  labelId="originality"
                  id="originality"
                  input={<Input />}
                >
                  <MenuItem value={'ABORIGINAL_INDIGENOUS'}>
                    Aboriginal / Indigenous{' '}
                  </MenuItem>
                  <MenuItem value={'TORRES_STRAIT_ISLANDER'}>
                    Torres Strait Islander
                  </MenuItem>
                  <MenuItem
                    value={'ABORIGINAL_INDIGENOUS_AND_TORRES_STRAIT_ISLANDER'}
                  >
                    Both
                  </MenuItem>
                  <MenuItem
                    value={
                      'NOT_ABORIGINAL_INDIGENOUS_OR_TORRES_STRAIT_ISLANDER'
                    }
                  >
                    None
                  </MenuItem>
                </Select>
              }
              control={control}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Controller
            name="diversity"
            as={
              <TextField
                disabled={disabled}
                fullWidth
                id="diversity"
                label="Diversity"
                variant="outlined"
                type="text"
                size="small"
              />
            }
            rules={{
              required: true,
            }}
            control={control}
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <FormControl
            fullWidth
            error={errors.gender && errors.gender.type === 'required'}
          >
            <InputLabel
              id="gender"
              shrink
              classes={{ root: classes.label, error: classes.error }}
            >
              Gender
            </InputLabel>
            <Controller
              name="gender"
              as={
                <Select
                  fullWidth
                  label="Gender"
                  labelId="gender"
                  id="gender"
                  defaultValue={''}
                  input={<Input />}
                >
                  <MenuItem value={'MALE'}>MALE</MenuItem>
                  <MenuItem value={'FEMALE'}>FEMALE</MenuItem>
                  <MenuItem value={'LGBTQ'}>LGBTQ</MenuItem>
                </Select>
              }
              control={control}
              rules={{ required: true }}
            />
            {errors.gender && (
              <FormHelperText>Gender is required</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormLabel component="legend">Impairments</FormLabel>
        </Grid>
        <Grid container item xs={12} lg={12}>
          <Grid item xs={12} md={4} lg={4}>
            <FormControl
              disabled={disabled}
              name="impairments.physicalImpairment"
            >
              <Controller
                name="impairments.physicalImpairment"
                as={
                  <Checkbox
                    disabled={disabled}
                    id="impairments.physicalImpairment"
                    label="Physical Impairment"
                  />
                }
                control={control}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <FormControl
              disabled={disabled}
              name="impairments.mentalHealthImpairment"
            >
              <Controller
                name="impairments.mentalHealthImpairment"
                as={
                  <Checkbox
                    disabled={disabled}
                    id="impairments.mentalHealthImpairment"
                    label="Mental Health Impairment"
                  />
                }
                control={control}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <FormLabel component="legend">Emergency Contact</FormLabel>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Controller
            name="emergencyContact.name.firstName"
            as={
              <TextField
                disabled={disabled}
                fullWidth
                id="emergencyContact.name.firstName"
                label="First Name *"
                variant="outlined"
                type="text"
                size="small"
                error={
                  errors.emergencyContact?.name?.firstName &&
                  errors.emergencyContact?.name?.firstName?.type === 'required'
                }
                helperText={
                  errors.emergencyContact?.name?.firstName &&
                  'First Name is required'
                }
              />
            }
            control={control}
            rules={{
              required: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Controller
            name="emergencyContact.name.middleName"
            as={
              <TextField
                disabled={disabled}
                fullWidth
                id="emergencyContact.name.middleName"
                label="Middle Name"
                variant="outlined"
                type="text"
                size="small"
              />
            }
            control={control}
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Controller
            name="emergencyContact.name.lastName"
            as={
              <TextField
                disabled={disabled}
                fullWidth
                id="emergencyContact.name.lastName"
                label="Last Name *"
                variant="outlined"
                type="text"
                size="small"
                error={
                  errors.emergencyContact?.name?.lastName &&
                  errors.emergencyContact?.name?.lastName.type === 'required'
                }
                helperText={
                  errors.emergencyContact?.name?.lastName &&
                  'Last Name is required'
                }
              />
            }
            control={control}
            rules={{
              required: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Controller
            name="emergencyContact.phone"
            as={
              <TextField
                disabled={disabled}
                fullWidth
                id="emergencyContact.phone"
                label="Phone No *"
                variant="outlined"
                type="text"
                size="small"
                error={
                  errors.emergencyContact?.phone &&
                  errors.emergencyContact?.phone.type === 'required'
                }
                helperText={
                  errors.emergencyContact?.phone && 'Phone No is required'
                }
              />
            }
            control={control}
            rules={{
              required: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Controller
            name="emergencyContact.relation"
            as={
              <TextField
                disabled={disabled}
                fullWidth
                id="emergencyContact.relation"
                label="Relation *"
                variant="outlined"
                type="text"
                size="small"
                error={
                  errors.emergencyContact?.relation &&
                  errors.emergencyContact?.relation.type === 'required'
                }
                helperText={
                  errors.emergencyContact?.relation && 'Relation is required'
                }
              />
            }
            control={control}
            rules={{
              required: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormLabel component="legend">Maternal Grand Father Side</FormLabel>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Controller
            name="maternalGrandFather.skinGroup"
            as={
              <TextField
                disabled={disabled}
                fullWidth
                id="maternalGrandFather.skinGroup"
                label="Skin Group *"
                variant="outlined"
                type="text"
                size="small"
                error={
                  errors.maternalGrandFather?.skinGroup &&
                  errors.maternalGrandFather?.skinGroup?.type === 'required'
                }
                helperText={
                  errors.maternalGrandFather?.skinGroup &&
                  'Skin Group is required'
                }
              />
            }
            control={control}
            rules={{
              required: !isOriginalityNone,
            }}
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Controller
            name="maternalGrandFather.oldestAncestor"
            as={
              <TextField
                disabled={disabled}
                fullWidth
                id="maternalGrandFather.oldestAncestor"
                label="Oldest Ancestor *"
                variant="outlined"
                type="text"
                size="small"
                error={
                  errors.maternalGrandFather?.oldestAncestor &&
                  errors.maternalGrandFather?.oldestAncestor?.type ===
                    'required'
                }
                helperText={
                  errors.maternalGrandFather?.oldestAncestor &&
                  'Oldest Ancestor is required'
                }
              />
            }
            control={control}
            rules={{
              required: !isOriginalityNone,
            }}
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Controller
            name="maternalGrandFather.estateBelongings"
            as={
              <TextField
                disabled={disabled}
                fullWidth
                id="maternalGrandFather.estateBelongings"
                label="Estate Belongings *"
                variant="outlined"
                type="text"
                size="small"
                error={
                  errors.maternalGrandFather?.estateBelongings &&
                  errors.maternalGrandFather?.estateBelongings?.type ===
                    'required'
                }
                helperText={
                  errors.maternalGrandFather?.estateBelongings &&
                  'Estate Belongings is required'
                }
              />
            }
            control={control}
            rules={{
              required: !isOriginalityNone,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormLabel component="legend">Maternal Grand Mother Side</FormLabel>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Controller
            name="maternalGrandMother.skinGroup"
            as={
              <TextField
                disabled={disabled}
                fullWidth
                id="maternalGrandMother.skinGroup"
                label="Skin Group *"
                variant="outlined"
                type="text"
                size="small"
                error={
                  errors.maternalGrandMother?.skinGroup &&
                  errors.maternalGrandMother?.skinGroup?.type === 'required'
                }
                helperText={
                  errors.maternalGrandMother?.skinGroup &&
                  'Skin Group is required'
                }
              />
            }
            control={control}
            rules={{
              required: !isOriginalityNone,
            }}
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Controller
            name="maternalGrandMother.oldestAncestor"
            as={
              <TextField
                disabled={disabled}
                fullWidth
                id="maternalGrandMother.oldestAncestor"
                label="Oldest Ancestor *"
                variant="outlined"
                type="text"
                size="small"
                error={
                  errors.maternalGrandMother?.oldestAncestor &&
                  errors.maternalGrandMother?.oldestAncestor?.type ===
                    'required'
                }
                helperText={
                  errors.maternalGrandMother?.oldestAncestor &&
                  'Oldest Ancestor is required'
                }
              />
            }
            control={control}
            rules={{
              required: !isOriginalityNone,
            }}
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Controller
            name="maternalGrandMother.estateBelongings"
            as={
              <TextField
                disabled={disabled}
                fullWidth
                id="maternalGrandMother.estateBelongings"
                label="Estate Belongings *"
                variant="outlined"
                type="text"
                size="small"
                error={
                  errors.maternalGrandMother?.estateBelongings &&
                  errors.maternalGrandMother?.estateBelongings?.type ===
                    'required'
                }
                helperText={
                  errors.maternalGrandMother?.estateBelongings &&
                  'Estate Belongings is required'
                }
              />
            }
            control={control}
            rules={{
              required: !isOriginalityNone,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormLabel component="legend">Paternal Grand Father Side</FormLabel>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Controller
            name="paternalGrandFather.skinGroup"
            as={
              <TextField
                disabled={disabled}
                fullWidth
                id="paternalGrandFather.skinGroup"
                label="Skin Group *"
                variant="outlined"
                type="text"
                size="small"
                error={
                  errors.paternalGrandFather?.skinGroup &&
                  errors.paternalGrandFather?.skinGroup?.type === 'required'
                }
                helperText={
                  errors.paternalGrandFather?.skinGroup &&
                  'Skin Group is required'
                }
              />
            }
            control={control}
            rules={{
              required: !isOriginalityNone,
            }}
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Controller
            name="paternalGrandFather.oldestAncestor"
            as={
              <TextField
                disabled={disabled}
                fullWidth
                id="paternalGrandFather.oldestAncestor"
                label="Oldest Ancestor *"
                variant="outlined"
                type="text"
                size="small"
                error={
                  errors.paternalGrandFather?.oldestAncestor &&
                  errors.paternalGrandFather?.oldestAncestor?.type ===
                    'required'
                }
                helperText={
                  errors.paternalGrandFather?.oldestAncestor &&
                  'Oldest Ancestor is required'
                }
              />
            }
            control={control}
            rules={{
              required: !isOriginalityNone,
            }}
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Controller
            name="paternalGrandFather.estateBelongings"
            as={
              <TextField
                disabled={disabled}
                fullWidth
                id="paternalGrandFather.estateBelongings"
                label="Estate Belongings *"
                variant="outlined"
                type="text"
                size="small"
                error={
                  errors.paternalGrandFather?.estateBelongings &&
                  errors.paternalGrandFather?.estateBelongings?.type ===
                    'required'
                }
                helperText={
                  errors.paternalGrandFather?.estateBelongings &&
                  'Estate Belongings is required'
                }
              />
            }
            control={control}
            rules={{
              required: !isOriginalityNone,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormLabel component="legend">Paternal Grand Mother Side</FormLabel>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Controller
            name="paternalGrandMother.skinGroup"
            as={
              <TextField
                disabled={disabled}
                fullWidth
                id="paternalGrandMother.skinGroup"
                label="Skin Group *"
                variant="outlined"
                type="text"
                size="small"
                error={
                  errors.paternalGrandMother?.skinGroup &&
                  errors.paternalGrandMother?.skinGroup?.type === 'required'
                }
                helperText={
                  errors.paternalGrandMother?.skinGroup &&
                  'Skin Group is required'
                }
              />
            }
            control={control}
            rules={{
              required: !isOriginalityNone,
            }}
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Controller
            name="paternalGrandMother.oldestAncestor"
            as={
              <TextField
                disabled={disabled}
                fullWidth
                id="paternalGrandMother.oldestAncestor"
                label="Oldest Ancestor *"
                variant="outlined"
                type="text"
                size="small"
                error={
                  errors.paternalGrandMother?.oldestAncestor &&
                  errors.paternalGrandMother?.oldestAncestor?.type ===
                    'required'
                }
                helperText={
                  errors.paternalGrandMother?.oldestAncestor &&
                  'Oldest Ancestor is required'
                }
              />
            }
            control={control}
            rules={{
              required: !isOriginalityNone,
            }}
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Controller
            name="paternalGrandMother.estateBelongings"
            as={
              <TextField
                disabled={disabled}
                fullWidth
                id="paternalGrandMother.estateBelongings"
                label="Estate Belongings *"
                variant="outlined"
                type="text"
                size="small"
                error={
                  errors.paternalGrandMother?.estateBelongings &&
                  errors.paternalGrandMother?.estateBelongings?.type ===
                    'required'
                }
                helperText={
                  errors.paternalGrandMother?.estateBelongings &&
                  'Estate Belongings is required'
                }
              />
            }
            control={control}
            rules={{
              required: !isOriginalityNone,
            }}
          />
        </Grid>
        <Grid item xs={12} lg={12}>
          {!disabled && (
            <StyledButton
              type="submit"
              color="primary"
              submitBtn
              variant="contained"
              endIcon={loading && <CircularProgress color="white" size={15} />}
            >
              save
            </StyledButton>
          )}
        </Grid>
      </Grid>
    </form>
  );
};

export default AdditionalDetailsForm;
