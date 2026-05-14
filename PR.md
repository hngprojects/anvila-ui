# PR Description

## Overview
This PR introduces the new Pricing, Explore, and FAQ pages, along with supporting components to the Anvila UI. It includes a complete restructuring of public routes into a `(public)` route group, upda

## Changes Made
- **Route Restructuring**: Moved public pages (Home, Pricing, Explore, FAQ) into a `(public)` route group for better organization and shared layout management.
- **Explore Page**:
    - Created `src/app/(public)/explore/page.tsx`.
    - Implemented `ExplorePage.tsx` and `DummyData.tsx` in `src/components/explore/`.
- **FAQ Page**:
    - Created `src/app/(public)/faq/page.tsx`.
    - Implemented `FAQPage.tsx` and `FAQData.tsx` in `src/components/faq/`.
- **Global Styles & Layout**:
    - Updated `src/app/globals.css` with refined Tailwind CSS theme and scrollbar aesthetics.
    - Updated `src/app/layout.tsx` to include the new Navbar and Footer.
- **Components**:
    - Added `src/components/navbar.tsx` and `src/components/footer.tsx`.
    - Updated `AuthDialog.tsx` with a polished interface for social login.
    - Refined `PricingPage.tsx` layout.
- **Assets**:
    - Replaced default Next.js/Vercel assets with custom `favicon-32.svg` and `favicon-64.svg`.
    - Removed unused default SVG files from `public/`.

## Verification
- Verified all public routes (/ , /pricing, /explore, /faq) render correctly.
- Checked responsiveness across different screen sizes.
- Tested interactive elements like FAQ toggles and the Auth Dialog.
- Confirmed the new Navbar and Footer are consistent across all public pages.
