# Security Specification: Famous Store

This security specification defines the exact data invariants, security policies, and test matrices designed to verify the integrity and isolation of the Firestore database.

## 1. Data Invariants

- **Product Invariants**:
  - A product cannot be created or modified by anyone other than an authenticated Admin.
  - A product document ID must be a safe, clean alphanumeric string (`isValidId`).
  - A product document must strictly have exactly 10 schema fields: `name`, `price`, `condition`, `batteryHealth`, `storage`, `imageUrl`, `category`, `isNew`, `createdAt`, `updatedAt`.
  - The `createdAt` field is immutable.

- **Inquiry Invariants**:
  - Anyone can submit an inquiry, but they cannot forge the `status` (must start as 'new') or custom creation timestamps (must equal server time `request.time`).
  - An inquiry cannot exist without a valid, referenced product ID (`exists()`).
  - Only authorized Admins can view/list inquiries.

- **Admin Invariants**:
  - Administration rules are strictly server-authoritative.
  - The master bootstrap admin `aerinotiazer@gmail.com` can never be deleted.
  - Only existing admins (or the master bootstrap admin) can register new administrators.

- **Settings Invariants**:
  - Anyone can read global settings (such as the support Whatsapp number).
  - Only authorized Admins can update settings.

---

## 2. The "Dirty Dozen" (Malicious Attack Payloads)

### Payload 1: Unauthorized Product Creation (Identity Attack)
- **Actor**: Non-Admin user
- **Action**: Create document `/products/iphone-16`
- **Result**: `PERMISSION_DENIED`

### Payload 2: Ghost Field Injection (Schema Attack)
- **Actor**: Admin user
- **Action**: Create/Update `/products/iphone-16` with extra field `isPromoted: true`
- **Result**: `PERMISSION_DENIED` (strictly 10 keys required by `hasAll` and `size()`)

### Payload 3: Value Poisoning - Extreme Health (Boundary Attack)
- **Actor**: Admin user
- **Action**: Create `/products/iphone-16` with `batteryHealth: 150`
- **Result**: `PERMISSION_DENIED` (health range must be `<= 100`)

### Payload 4: Value Poisoning - Negative Price (Boundary Attack)
- **Actor**: Admin user
- **Action**: Create `/products/iphone-16` with `price: -100`
- **Result**: `PERMISSION_DENIED` (price must be `>= 0`)

### Payload 5: Immutable field modification (Creation Lockout)
- **Actor**: Admin user
- **Action**: Update `/products/iphone-15` altering `createdAt` from original timestamp
- **Result**: `PERMISSION_DENIED`

### Payload 6: Inquiry Spoofing - Pre-completed status (State Bypass)
- **Actor**: Anonymous user
- **Action**: Create `/inquiries/inq-123` with `status: 'closed'`
- **Result**: `PERMISSION_DENIED` (must equal 'new' on create)

### Payload 7: Inquiry Spoofing - Forged creation time (Temporal Attack)
- **Actor**: Anonymous user
- **Action**: Create `/inquiries/inq-123` with `createdAt: Timestamp(1000)` (forged client time)
- **Result**: `PERMISSION_DENIED` (must equal `request.time`)

### Payload 8: Orphaned Inquiry - Non-existent product reference (Relational Integrity)
- **Actor**: Anonymous user
- **Action**: Create `/inquiries/inq-123` referencing physical product of non-existent value `ghost-iphone-999`
- **Result**: `PERMISSION_DENIED` (database product must exist)

### Payload 9: Inquiry Scraping - Read all inquiries (Information Disclosure)
- **Actor**: Non-Admin user
- **Action**: List entire collection `/inquiries`
- **Result**: `PERMISSION_DENIED`

### Payload 10: Admin privilege self-escalation (Privilege Escalation)
- **Actor**: Non-Admin user `malicious@gmail.com`
- **Action**: Register self in `/admins/malicious@gmail.com`
- **Result**: `PERMISSION_DENIED`

### Payload 11: Master Admin Deletion (Denial of Service)
- **Actor**: Secondary Admin
- **Action**: Delete `/admins/aerinotiazer@gmail.com`
- **Result**: `PERMISSION_DENIED`

### Payload 12: Injection Attack on Custom Document ID (Poisoning Attack)
- **Actor**: Admin user
- **Action**: Create product document `/products/invalid$$character!!slug`
- **Result**: `PERMISSION_DENIED` (matches regex filter `[^a-zA-Z0-9_\-]+`)

---

## 3. Test Coverage Matrix

The companion file `firestore.rules.test.ts` lists concrete unit-testing cases simulating auth scopes (`unauthenticated`, `authenticated`, `admin`, `master_admin`) to confirm all 12 scenarios fail securely as expected.
