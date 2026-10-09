# AMGK SkyVision — SkyVision Black

A responsive, multi-route marketing website for AMGK SkyVision, built with React, TypeScript, Vite, React Router, Framer Motion and Lucide icons.

## Local setup

From the workspace root:

```sh
pnpm install
pnpm --filter @workspace/amgk-skyvision run dev
```

Production build and type checking:

```sh
pnpm --filter @workspace/amgk-skyvision run build
pnpm --filter @workspace/amgk-skyvision run typecheck
```

The application uses the Vite `BASE_URL` as React Router's basename, so routes work when hosted below a path prefix.

## Centralized business and content data

Edit `src/data.ts` to update:

- Business name, supplied local-format phone number, contact name and social handles.
- Services, package deliverables and pricing, project concepts, campaign months, process, FAQ and reporting categories.

Contact-related verification flags and integration placeholders are in the `business` object in the same file. Supplied social handles are displayed as text; no social destinations, email address or portfolio URL have been guessed or linked.

## Before launch: contact and enquiry integrations

The enquiry form currently performs accessible, client-side required-field and email validation only. It does **not** send, retain or claim submission of information. There is no backend/CRM endpoint in this frontend demo.

To enable live enquiries:

1. Implement an authenticated/abuse-protected HTTPS server endpoint with server-side validation, consent and data-retention policies. Keep provider credentials on the server; never expose secrets in Vite client variables.
2. Configure the secure endpoint through an owner-reviewed integration and replace the local-only form completion state with explicit pending, success and failure responses from that endpoint. Do not show success before the server confirms receipt.
3. Verify and configure the business WhatsApp number in international format in `business.verifiedWhatsAppInternational` before implementing any `wa.me` handoff. The supplied `011-3582 8706` is shown only in that local display format; no country code is inferred. Current WhatsApp actions explain that verification is required and do not open a handoff.
4. Confirm live Instagram/TikTok profile URLs, portfolio URL, business contact details, and the legal privacy notice with the owner. Until then, the supplied social handles are text-only and privacy copy is explicitly a demo placeholder.
5. Review production arrangements, any additional costs, and the final privacy wording with the business before publication.

The project gallery images in `public/skyvision-*.jpg` are generated illustrative concept stills. They are not AMGK client work, performance results or playable video footage. The reporting visualization is also labelled as illustrative and contains no example results.
