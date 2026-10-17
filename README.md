# ECH — EarlyChildHomeschooling

A responsive, static marketing website for ECH, intended to help families learn about early-learning options for preschool kids in Karachi, Pakistan, and start a conversation through WhatsApp.

## Project files

- `index.html` — semantic page content, navigation, learning information, pricing, FAQ, contact form, location, and footer.
- `style.css` — visual system and responsive layouts for mobile, tablet, laptop, and desktop.
- `script.js` — centralized contact details, WhatsApp message links, mobile navigation, accessible FAQ behavior, automatic copyright year, and contact-form handling.

No photos or image assets have been added. The hero and activity visuals are made with HTML and CSS.

## Run locally

1. Download or clone this repository.
2. Open the folder in Visual Studio Code.
3. Open `index.html` in a browser, or use the VS Code **Live Server** extension and choose **Open with Live Server**.
4. Test the WhatsApp links on a device/browser where WhatsApp Web or the WhatsApp app is available.

There is no build step, database, authentication, or backend service required.

## Deploy

This is a static frontend. It can be deployed to GitHub Pages or Vercel with the repository root as the site root; no build command is needed. For Vercel, use the framework preset **Other**, leave the build command empty, and deploy the root directory. Deployment must be completed in the hosting account.

## Centralized contact details

The contact configuration is at the beginning of `script.js` in `ECH_CONFIG`:

- Display phone: `03333375121`
- WhatsApp destination (international format): `92333375121`
- Location label: Karachi, Pakistan
- Standard price display: $18.05

Update the configuration if the business confirms a change. All WhatsApp links are built from the same destination, with section-specific prefilled messages.

## Pricing and contact-form behavior

The site displays a standard price of **$18.05**, as provided. The billing period, inclusions, and any additional charges are not specified, so the website explicitly asks parents to confirm those details with ECH.

The contact form does not submit information to a server or save it to a database. It prepares a WhatsApp message and opens it for the visitor to review and send. A visible fallback link is provided in case the new tab does not open. Avoid entering sensitive personal or medical information about a child.

## Business details to confirm before publication

- Specific physical address and visiting arrangements (the public page currently says Karachi, Pakistan and asks visitors to contact ECH for the specific location).
- Exact preschool eligibility requirements.
- Confirmed program names and availability.
- Which educational toys, materials, and learning activities are actually available.
- What the $18.05 standard price covers, its billing period and inclusions, and any additional fees.
- Schedule and frequency options.
- Actual enrollment process and parent communication arrangements.
- Staff qualifications, facilities, certifications, or policies, if these will be mentioned.
- Approved brand photographs, if photos are to be added in a future update.
- Official website domain if a canonical URL is to be configured.

## Implementation notes

- The page uses semantic HTML, native keyboard-accessible FAQ controls, visible focus states, and reduced-motion support.
- The navigation collapses into an accessible mobile menu.
- No addresses, testimonials, credentials, ratings, or enrollment statistics have been invented.
- The website is not deployed automatically by repository commits; deployment and live-browser QA must be completed in the hosting/browser environment.
