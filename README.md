# FASTBlood --- Blood Donation Platform

FASTBlood connects blood donors with people who need blood. This README
summarizes the frontend routes and backend API endpoints listed in the
supplied API documentation.

## Base URLs

-   **Frontend:** https://fastbloodprojectpfrontend.vercel.app
-   **Backend API:** https://fastbloodprojectpfrontend.vercel.app/api/v1

API endpoint paths below are relative to the backend API base URL.

## Main Frontend Routes

### Public Pages

-   `/home` --- Home page
-   `/about` --- About the platform
-   `/how-it-works` --- How the platform works

### Authentication Pages

-   `/login` --- Sign in
-   `/signup` --- Register
-   `/verify-email` --- Verify email using OTP
-   `/forgot-password` --- Start password recovery
-   `/reset-password` --- Reset password

### User Pages

-   `/find-blood` --- Find donors
-   `/all-requests` --- Browse blood requests
-   `/become-donor` --- Apply to become a donor
-   `/blood-request` --- Create a blood request
-   `/my-donations` --- View donation assignments or records
-   `/my-profile` --- View profile
-   `/my-profile/settings` --- Update profile/settings
-   `/premium` --- View or start a premium subscription
-   `/payment` --- Start a payment
-   `/payment/success` --- Payment completion page
-   `/payment/failure` --- Payment failure page

### Admin Pages

-   `/admin/dashboard` --- Admin overview
-   `/admin/dashboard/assignments` --- Manage assignments
-   `/admin/dashboard/blood-requests` --- Manage blood requests
-   `/admin/dashboard/donation-assignments` --- Manage donor assignments
-   `/admin/dashboard/donations` --- View donation records
-   `/admin/dashboard/donors` --- Manage donor profiles and applications
-   `/admin/dashboard/payments` --- View payments
-   `/admin/dashboard/subscriptions` --- View subscriptions
-   `/admin/dashboard/users` --- Manage users and roles

## Backend API Endpoints

### Authentication --- `/auth`

  Method   Endpoint                  Purpose
  -------- ------------------------- -------------------------
  POST     `/auth/login`             Sign in
  POST     `/auth/logout`            Log out
  POST     `/auth/google`            Google login
  POST     `/auth/forget-password`   Start password recovery
  POST     `/auth/reset-password`    Reset password
  POST     `/auth/refresh-token`     Refresh access token
  POST     `/auth/resend-otp`        Resend verification OTP

### Users --- `/user`

  Method   Endpoint                 Purpose
  -------- ------------------------ -------------------------------
  POST     `/user/register`         Register a user
  POST     `/user/verify-email`     Verify email
  GET      `/user/me`               Get current user's profile
  PUT      `/user/update-profile`   Update current user's profile

### Admin --- `/admin`

  Method   Endpoint                       Purpose
  -------- ------------------------------ ---------------------------
  GET      `/admin/users`                 List users
  GET      `/admin/donors`                List donor profiles
  PATCH    `/admin/update/status/:id`     Update user status
  PATCH    `/admin/update/role/:id`       Update user role
  PATCH    `/admin/delete/user/:id`       Delete/deactivate a user
  PUT      `/admin/profile-approve/:id`   Process donor application
  GET      `/admin/subscriptions`         List subscriptions
  GET      `/admin/payments`              List payments

### Blood Requests --- `/blood`

  Method   Endpoint                      Purpose
  -------- ----------------------------- -----------------------------
  POST     `/blood/new-request`          Create a blood request
  PATCH    `/blood/update-request/:id`   Update blood request status
  GET      `/blood/view-request/:id`     View a request
  GET      `/blood/all`                  List blood requests

### Donations --- `/donation`

  -----------------------------------------------------------------------------------
  Method                  Endpoint                            Purpose
  ----------------------- ----------------------------------- -----------------------
  POST                    `/donation/new-assignment`          Create a donor
                                                              assignment

  GET                     `/donation/view-assignment/:id`     View an assignment

  POST                    `/donation/new-record`              Create a donation
                                                              record

  PATCH                   `/donation/update-assignment/:id`   Update assignment
                                                              status

  GET                     `/donation/all`                     List all assignments

  GET                     `/donation/donor/assignments`       Get assignments for the
                                                              signed-in donor

  GET                     `/donation/records`                 Get donation records
  -----------------------------------------------------------------------------------

### Donors --- `/donor`

  Method   Endpoint                            Purpose
  -------- ----------------------------------- ---------------------------
  POST     `/donor/become-donor`               Apply to become a donor
  GET      `/donor/profile/:id`                Get a donor profile
  GET      `/donor/find-donor`                 Find/list donor profiles
  PUT      `/donor/upadate/availability/:id`   Update donor availability

### Payments and Subscriptions --- `/subscription`

  -----------------------------------------------------------------------------------------
  Method                  Endpoint                                  Purpose
  ----------------------- ----------------------------------------- -----------------------
  POST                    `/subscription/create-checkout-session`   Create a checkout
                                                                    session

  POST                    `/subscription/webhook`                   Handle payment provider
                                                                    webhook

  POST                    `/subscription/bkash-payment`             Start a bKash payment

  GET                     `/subscription/bkash/callback`            Handle bKash callback

  GET                     `/subscription/payment/:id`               Retrieve payment data
  -----------------------------------------------------------------------------------------

## Access and Security Notes

-   The API uses JWT/auth middleware, but the supplied documentation
    does not specify the exact cookie/header transport.
-   Endpoint permissions vary by role: `ADMIN`, `DONOR`, and
    `REQUESTER`. Check the backend router before relying on a route
    being public or available to a particular role.
-   The supplied router shows `/donor/find-donor` without active
    authentication middleware.
-   The supplied router does not show authentication middleware on
    `/subscription/payment/:id`; verify payment ownership and
    authorization before exposing payment data.
-   The donor availability route is documented as
    `/donor/upadate/availability/:id` (spelled `upadate`). Use that
    exact path unless the backend route is corrected.
-   The documentation does not provide request/response schemas,
    status-code details, or a dedicated payment-failure API endpoint.

## Notes

-   Frontend routes are page URLs; backend endpoints are API URLs.
-   Replace `:id` in an endpoint with the relevant resource ID.
-   Confirm frontend route groups and actual route files against the
    current Next.js `src/app` directory.
