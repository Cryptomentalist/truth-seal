/** Dane przykładowe używane w trybie testowym (podgląd treści e-maili i webhooków). */

export const TEST_ORDER = {
  orderNo: "TEST-000123",
  name: "Anna Testowa",
  street: "ul. Morska 30B/5",
  zip: "84-240",
  city: "Reda",
  countryCode: "PL",
  shippingMethod: "courier",
  currency: "PLN",
  subtotal: 149,
  shipping: 16,
  total: 165,
  items: [
    { name: "Koszulka — Komplementarność ponad rywalizację", variant: "M · Granat", qty: 1, price: 149 },
  ],
  trackingNumber: "TEST1234567890PL",
  trackingUrl: "https://www.printful.com/tracking/TEST1234567890PL",
}

/** Buduje templateData dla wybranego szablonu w trybie testowym. */
export function testTemplateData(lang: "pl" | "en" = "pl") {
  return {
    name: TEST_ORDER.name,
    orderNo: TEST_ORDER.orderNo,
    lang,
    trackingNumber: TEST_ORDER.trackingNumber,
    trackingUrl: TEST_ORDER.trackingUrl,
    items: TEST_ORDER.items,
    subtotal: TEST_ORDER.subtotal,
    shipping: TEST_ORDER.shipping,
    total: TEST_ORDER.total,
    currency: TEST_ORDER.currency,
    shippingMethod: TEST_ORDER.shippingMethod,
    city: TEST_ORDER.city,
    zip: TEST_ORDER.zip,
    street: TEST_ORDER.street,
    isTest: true,
  }
}

/** Przykładowy payload webhooka Printful (event „package_shipped”). */
export function testWebhookPayload(orderNo = TEST_ORDER.orderNo) {
  return {
    type: "package_shipped",
    test: true,
    created: Math.floor(Date.now() / 1000),
    data: {
      shipment: {
        id: 999999,
        tracking_number: TEST_ORDER.trackingNumber,
        tracking_url: TEST_ORDER.trackingUrl,
        carrier: "InPost",
        service: "Kurier",
      },
      order: {
        id: 999999,
        external_id: orderNo,
        status: "fulfilled",
      },
    },
  }
}
