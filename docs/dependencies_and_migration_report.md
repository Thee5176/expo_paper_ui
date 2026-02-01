# Dependencies and Migration Report

## 1. Dependencies Report

### Core Dependencies

Based on `package.json` (Project: `native_expo_paper`):

| Package                | Version   | Purpose                                                                                                                            |
| :--------------------- | :-------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| **react-native-paper** | `^5.14.5` | **UI Framework**. Used for all inputs (`TextInput`), layout (`Card`), and typography (`Text`) to ensure consistent Native styling. |
| **expo-router**        | `~6.0.22` | **Navigation**. File-based routing (`app/`).                                                                                       |
| **react-hook-form**    | `^7.71.1` | **Form Management**. Handles state, validation, and submission for the multi-step form.                                            |
| **react-native-auth0** | `^5.4.0`  | **Authentication**. Native Auth0 SDK. **Note**: Requires dev client or proxy (`web:https`) for development.                        |
| **axios**              | `^1.13.4` | **API Client**. Used in `utils/FormUtils.ts` to communicate with the Command Service.                                              |

### Helper Scripts

- **web:https**: `concurrently "expo start --web --port 9001" "npm run proxy" "npm run redirect"`
  - **Why**: Auth0 requires HTTPS. This script runs a local SSL proxy to forward `https://localhost:9001` to Expo's `http://localhost:8081`.

## 2. Migration Steps & Fixes

### A. React Native Paper Form Migration

**Context**: Moving from standard/web-based inputs to a unified Mobile UI.
**Conversations**: "React Native Paper Form Migration"

**Key Changes:**

1.  **Component Replacement**:
    - **Wrappers**: Replaced generic `View` wrappers with `<Card>` and `<Card.Content>` for material design elevation and spacing.
    - **Inputs**: Replaced `input` or standard `TextInput` with Paper's `<TextInput mode="outlined" />` (inside `DateField`, `DescriptionField`).
    - **Typography**: Replaced raw text strings with `<Text variant="...">` (e.g., `headlineLarge`, `bodyLarge`) to utilize the theme.

2.  **File Structure Refactor**:
    - **Previous**: Likely monolithic or flat components.
    - **Current**:
      - `components/ledger_form/EntryForm/index.tsx`: Encapsulates the entry inputs.
      - `components/ledger_form/BalanceReview/index.tsx`: Encapsulates the review summary using `<DataTable>`.
      - `components/ledger_form/FormFields/`: Reusable field components.

### B. Fixing MultiStep Form

**Context**: resolving rendering issues and bugs in the progress flow.
**Conversations**: "Fixing MultiStep Form"

**Key Changes:**

1.  **Logic Logic Fix**:
    - **Issue**: A `switch` statement for step rendering was placed directly inside JSX, causing syntax errors.
    - **Fix**: Extracted logic to `const renderStep = () => { switch(activeStep) ... }` in `MultiStepFormContent.tsx`.
    - **Result**: Form correctly switches between `EntryForm` (Step 0) and `BalanceReview` (Step 1).

2.  **Context Integration**:
    - **Issue**: Form state was lost between steps or progress was calculating incorrectly.
    - **Fix**: Wrapped `MultiStepFormContent` with:
      - `FormProvider` (react-hook-form)
      - `ProvideStepper` (step state)
      - `ProvideBalance` (calculation context)

## 3. Breaking Code & Rewrite Requirement

The following items are "breaking" in the context of moving from a Web/HTML mindset to React Native, or specific operational constraints:

1.  **Switch Statement in JSX (Fixed)**
    - **Status**: **REWRITTEN**.
    - **Code**: `switch (step) { case 0: return <EntryForm /> ... }`
    - **Why**: JSX expressions (`{}`) only accept expressions, not statements (like `switch` or `if`).
    - **Rewrite**: Moved to a helper function `renderStep()`.

2.  **HTML Tags (<div>, <input>)**
    - **Status**: **CLEARED**.
    - **Verification**: `grep` search confirms no `<div>`, `<input>`, `<form>` tags in the active source (`app/`, `components/`). All have been rewritten to `<View>`, `<TextInput>`, `<Card>`.

3.  **Auth0 on Expo Go (Android)**
    - **Status**: **WARNING**.
    - **Code**: `react-native-auth0` relies on native intent filters.
    - **Breaking Aspect**: Standard Expo Go client on Android cannot handle the custom scheme redirects defined in `android/build.gradle` (or `local.properties` configuration).
    - **Rewrite/Workaround**:
      - Use **Development Build** (`expo run:android`) instead of Expo Go.
      - OR use the `web:https` proxy for testing Auth flows on Web.
