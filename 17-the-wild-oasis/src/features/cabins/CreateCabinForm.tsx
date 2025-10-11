import styled from 'styled-components'

import { Input } from '../../ui/Input'
import { Form } from '../../ui/Form'
import { Button } from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Textarea from '../../ui/Textarea'
import {
  useForm,
  type SubmitErrorHandler,
  type SubmitHandler,
} from 'react-hook-form'
import { createCabin } from '../../services/api/apiCabins'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { FormRow } from '../../ui/FormRow'

interface FormValues {
  name: string
  maxCapacity: number
  regularPrice: number
  discount: number
  description: string
  image: string
}

export const CreateCabinForm = () => {
  const queryClient = useQueryClient()

  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('New Cabin successfully created')
      queryClient.invalidateQueries({ queryKey: ['cabins'] })
      reset()
    },
    onError: error => toast.error(error.message),
  })

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors: formErrors },
  } = useForm<FormValues>({ disabled: isCreating })

  const onFormSubmit: SubmitHandler<FormValues> = data => {
    mutate(data)
  }

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <FormRow label="Cabin name" error={formErrors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register('name', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        error={formErrors?.maxCapacity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          defaultValue={0}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: { value: 1, message: 'Max capacity should be at least 1' },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={formErrors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register('regularPrice', {
            valueAsNumber: true,
            required: 'This field is required',
            min: { value: 1, message: 'Regular price should be at least 1' },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={formErrors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register('discount', {
            valueAsNumber: true,
            required: 'This field is required',
            validate: value =>
              value <= getValues().regularPrice ||
              'Discount should be less than the regular price',
          })}
        />
      </FormRow>

      <FormRow label="Description" error={formErrors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register('description', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={formErrors?.image?.message}>
        <FileInput id="image" accept="image/*" {...register('image')} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  )
}
