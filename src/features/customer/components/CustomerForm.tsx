import { Box, Button, CircularProgress } from '@material-ui/core';
import { RadioGroupField } from 'components/FormFields';
import { InputField } from 'components/FormFields/InputField';
import { SelectField } from 'components/FormFields/SelectField';
import { Customer } from 'models';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Alert } from '@material-ui/lab';
import { toast } from 'react-toastify';
import { selectCityOptions } from 'features/city/citySlice';
import { useAppSelector } from 'app/hooks';

export interface CustomerFormProps {
  initialValues?: Customer;
  onSubmit?: (formValues: Customer) => void;
}

const schema = yup.object().shape({
  name: yup.string()
    .required('Please enter name')
    .test(
      'two-words',
      'Please enter at least two words',
      (value) => (value as string)?.split(' ').filter(x => x).length >=2
    ),
  age: yup
    .number()
    .positive('Please enter positive number')
    .integer('Please enter integer number')
    .min(18, 'Min age is 18')
    .max(65, 'Max age is 65')
    .required('Please enter age')
    .typeError('Please enter a valid number'),
  memberScore: yup
    .number()
    .positive('Please enter positive number')
    .max(1, 'Min score is 1')
    .max(10, 'Max score is 10')
    .required('Please enter score')
    .typeError('Please enter a valid number'),
  gender: yup
    .string()
    .oneOf(['male', 'female'], 'Please choose value male or female')
    .required('Please select gender'),
  address: yup
    .string()
    .required('Please enter address'),
});

export function CustomerForm ({ initialValues, onSubmit }: CustomerFormProps) {
  const cityOptions = useAppSelector(selectCityOptions)
  const [error, setError] = React.useState<string>('')
  const {
    control,
    handleSubmit,
    formState: {
      isSubmitting
    }
  } = useForm<Customer>({
    defaultValues: initialValues,
    resolver: yupResolver(schema)
  })
  const handleFormSubmit = async (formValues: Customer) => {
    // console.log('Submit',formValues);
    // await new Promise(resolve => {
    //   setTimeout(resolve , 1000)
    // })
    try {
      setError('')
      await onSubmit?.(formValues)
    } catch (error) {
      console.log('Failed to add/update customer', error);
      setError(error.message)
      toast.error(error.message);
    }
  }
  return (
    <Box>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField 
          name="name"
          control={control}
          label="Full name"
          />
        <RadioGroupField 
          name="gender"
          control={control}
          label="Gender"
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
          />
        {/* <SelectField
          name="gender"
          control={control}
          label="Gender"
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
        /> */}
        <InputField 
          name="age"
          control={control}
          label="Age"
          type="number"
          />
        <SelectField
          name="cityId"
          control={control}
          label="city name"
          options={cityOptions}
          />
        <InputField 
          name="memberScore"
          control={control}
          label="Member score"
          type="number"
          />
        <InputField 
          name="address"
          control={control}
          label="Address"
          />
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            {isSubmitting && <CircularProgress size={16} />}&nbsp;Save
          </Button>
        </Box>
        {/* show error */}
        {error && <Alert severity="error">{error}</Alert>}
        
      </form>
    </Box>
  );
}
