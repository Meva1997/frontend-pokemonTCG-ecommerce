"use client";
import {
  Description,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Select,
  Textarea,
} from "@headlessui/react";

export default function AddUserForm() {
  return (
    <div className="w-full max-w-lg px-4">
      <Fieldset className="space-y-6 rounded-xl bg-white/5 p-6 sm:p-10">
        <Legend className="text-base/7 font-semibold text-white">
          Shipping details
        </Legend>
        <Field>
          <Label className="text-sm/6 font-medium text-white">
            Street address
          </Label>
          <Input className="mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white" />
        </Field>
        <Field>
          <Label className="text-sm/6 font-medium text-white">Country</Label>
          <Description className="text-sm/6 text-white/50">
            We currently only ship to North America.
          </Description>
          <div className="relative">
            <Select className="mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white">
              <option>Canada</option>
              <option>Mexico</option>
              <option>United States</option>
            </Select>
          </div>
        </Field>
        <Field>
          <Label className="text-sm/6 font-medium text-white">
            Delivery notes
          </Label>
          <Description className="text-sm/6 text-white/50">
            If you have a tiger, we&apos;d like to know about it.
          </Description>
          <Textarea
            className="mt-3 block w-full resize-none rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
            rows={3}
          />
        </Field>
      </Fieldset>
    </div>
  );
}
