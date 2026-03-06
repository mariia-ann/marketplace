// Thesea are type for step 5:
export type DeliveryMethodKey =
  | 'SELF_PICKUP'
  | 'NP_BRANCH'
  | 'NP_LOCKER'
  | 'NP_COURIER'
  | 'UP_BRANCH'
  | 'MEEST';

export type DeliveryCostMode = 'FREE' | 'CARRIER_TARIFF';

export type DeliveryFormState = {
  methods: Record<DeliveryMethodKey, boolean>; // checkbox state

  costMode: DeliveryCostMode; // radio state

  shipmentTimeText: string; // input: "1-3 дні"

  uaOblasts: string[]; // selected checkboxes, can be codes or names

  countries: string[]; // selected checkboxes (e.g. 'DE', 'PL')
};
