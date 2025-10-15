import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Input } from '../../ui/Input'
import { Form } from '../../ui/Form'
import { Button } from '../../ui/Button'
import { FileInput } from '../../ui/FileInput'
import Textarea from '../../ui/Textarea'
import { createCabin, updateCabin } from '../../services/api/apiCabins'
import { FormRow } from '../../ui/FormRow'
import type { Database } from '../../services/supabase/database.types'

interface CabinFormProps {
  cabinToUpdate?: Database['public']['Tables']['Cabins']['Row']
}

interface FormValues {
  name: string
  maxCapacity: number
  regularPrice: number
  discount: number
  description: string
  image: FileList | string
}

export const CabinForm = ({ cabinToUpdate }: CabinFormProps) => {
  const { id: editCabinId, ...editValues } = cabinToUpdate ?? {}
  const isEditingCabin = Boolean(editCabinId)

  const queryClient = useQueryClient()

  const { mutate: createCabinMutation, isPending: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('New Cabin successfully created')
      queryClient.invalidateQueries({ queryKey: ['cabins'] })
      reset()
    },
    onError: error => toast.error(error.message),
  })

  const { mutate: updateCabinMutation, isPending: isUpdating } = useMutation({
    mutationFn: updateCabin,
    onSuccess: () => {
      toast.success('Cabin successfully updated')
      queryClient.invalidateQueries({ queryKey: ['cabins'] })
      reset()
    },
    onError: error => toast.error(error.message),
  })

  const isPending = isCreating || isUpdating

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm<Database['public']['Tables']['Cabins']['Row'], any, FormValues>({
    disabled: isPending,
    defaultValues: isEditingCabin ? editValues : {},
  })

  const onFormSubmit: SubmitHandler<FormValues> = data => {
    if (!isEditingCabin)
      return createCabinMutation({
        ...data,
        image: (data.image as FileList)[0],
      })

    const image = typeof data.image === 'string' ? data.image : data.image[0]

    updateCabinMutation({ updatedCabin: { ...data, image }, id: editCabinId })
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
            validate: (value, formValues) =>
              value <= formValues.regularPrice ||
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
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', {
            required: isEditingCabin ? false : 'This field is required.',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isPending}>
          {isEditingCabin ? 'Update cabin' : 'Create new cabin'}
        </Button>
      </FormRow>
    </Form>
  )
}
