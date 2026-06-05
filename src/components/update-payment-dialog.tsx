import { useEffect, useState } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { tv } from 'tailwind-variants'
import { Button } from './ui/button'
import { Dialog, DialogClose } from './ui/dialog'
import { Input } from './ui/input'
import { Select } from './ui/select'
import { updatePaymentSchema, type Participant, type UpdatePaymentInput, normalizePaymentUpdate } from '../schemas/participant'
import { useUpdatePayment } from '../hooks/useUpdatePayment'
import { formatCurrency } from '../utils/formatters'

const fieldLabel = tv({ base: 'text-sm font-medium text-[#92929D]' })
const suffixWrap = tv({ base: 'relative' })
const suffixLabel = tv({ base: 'pointer-events-none absolute right-3 top-2 text-sm text-[#92929D]' })

const statusOptions = [
  { label: 'Unpaid', value: 'unpaid' },
  { label: 'Partial', value: 'partial' },
  { label: 'Paid', value: 'paid' },
]

export function UpdatePaymentDialog({
  participant,
  slug,
  paymentMethods,
}: {
  participant: Participant
  slug: string
  paymentMethods: string[]
}) {
  const [open, setOpen] = useState(false)
  const updatePayment = useUpdatePayment(slug)

  const form = useForm<UpdatePaymentInput>({
    resolver: zodResolver(updatePaymentSchema) as Resolver<UpdatePaymentInput>,
    defaultValues: {
      paidAmount: participant.paidAmount,
      paymentStatus: participant.paymentStatus,
      paymentMethod: participant.paymentMethod ?? paymentMethods[0] ?? '',
    },
  })

  useEffect(() => {
    form.reset({
      paidAmount: participant.paidAmount,
      paymentStatus: participant.paymentStatus,
      paymentMethod: participant.paymentMethod ?? paymentMethods[0] ?? '',
    })
  }, [participant, paymentMethods, form])

  async function onSubmit(data: UpdatePaymentInput) {
    const normalized = normalizePaymentUpdate(data, participant.pledgeAmount)
    await updatePayment.mutateAsync({
      participantId: participant.id,
      participantName: participant.name,
      data: normalized,
    })
    setOpen(false)
  }

  function handleStatusChange(value: string) {
    const status = value as UpdatePaymentInput['paymentStatus']
    form.setValue('paymentStatus', status, { shouldDirty: true })

    if (status === 'paid') {
      const current = form.getValues('paidAmount')
      if (!current || current <= 0) {
        form.setValue('paidAmount', participant.pledgeAmount, { shouldDirty: true })
      }
    } else if (status === 'unpaid') {
      form.setValue('paidAmount', 0, { shouldDirty: true })
    }
  }

  const methodOptions =
    paymentMethods.length > 0
      ? paymentMethods.map((method) => ({ label: method, value: method }))
      : [{ label: 'Cash', value: 'Cash' }]

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button variant="outline" size="sm">
          Update
        </Button>
      }
      title={`Update payment — ${participant.name}`}
      description="Adjust paid amount and payment status."
    >
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <label className="block">
          <span className={fieldLabel()}>Amount Paid</span>
          <p className="mt-0.5 text-xs text-[#92929D]">
            Pledged {formatCurrency(participant.pledgeAmount)} — marking as paid fills this automatically.
          </p>
          <div className={`mt-1 ${suffixWrap()}`}>
            <Input type="number" min={0} variant="suffix" {...form.register('paidAmount')} />
            <span className={suffixLabel()}>RWF</span>
          </div>
        </label>

        <label className="block">
          <span className={fieldLabel()}>Payment Status</span>
          <div className="mt-1">
            <Select
              value={form.watch('paymentStatus')}
              onValueChange={handleStatusChange}
              options={statusOptions}
            />
          </div>
        </label>

        <label className="block">
          <span className={fieldLabel()}>Payment Method</span>
          <div className="mt-1">
            <Select
              value={form.watch('paymentMethod') ?? ''}
              onValueChange={(value) => form.setValue('paymentMethod', value)}
              options={methodOptions}
            />
          </div>
        </label>

        <div className="flex justify-end gap-2 pt-2">
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" disabled={updatePayment.isPending}>
            {updatePayment.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Dialog>
  )
}
