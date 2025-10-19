import type { FocusEvent } from 'react'
import type { Database } from '../../services/supabase/database.types'
import { Form } from '../../ui/Form'
import { FormRow } from '../../ui/FormRow'
import { Input } from '../../ui/Input'
import { Spinner } from '../../ui/Spinner'
import { useSettings } from './useSettings'
import { useUpdateSetting } from './useUpdateSetting'

export const UpdateSettingsForm = () => {
  const { isLoadingSettings, settings } = useSettings()
  const { isUpdatingSetting, updateSetting } = useUpdateSetting()

  if (isLoadingSettings) return <Spinner />

  const handleUpdate = (
    e: FocusEvent<HTMLInputElement, Element>,
    settingFieldName: keyof Database['public']['Tables']['Settings']['Insert']
  ) => {
    if (isUpdatingSetting) return
    const { value } = e.target

    if (!value) return

    updateSetting({ [settingFieldName]: value })
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isUpdatingSetting}
          defaultValue={settings?.minBookingLength}
          onBlur={e => handleUpdate(e, 'minBookingLength')}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isUpdatingSetting}
          defaultValue={settings?.maxBookingLength}
          onBlur={e => handleUpdate(e, 'maxBookingLength')}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isUpdatingSetting}
          defaultValue={settings?.maxNumberOfGuestsPerBooking}
          onBlur={e => handleUpdate(e, 'maxNumberOfGuestsPerBooking')}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isUpdatingSetting}
          defaultValue={settings?.breakfastPrice}
          onBlur={e => handleUpdate(e, 'breakfastPrice')}
        />
      </FormRow>
    </Form>
  )
}
