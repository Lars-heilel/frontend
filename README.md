## Frontend

### Features

🔐 **Authentication (Auth)**
* User registration with data validation
* Login with token persistence
* Protected routes
* Automatic token refresh

✉️ **Mail Operations (Mails)**
* Email confirmation
* Resend confirmation email
* Password reset request
* Password reset confirmation

---

### Tech Stack

* **UI Framework**: React 18
* **State Management**: Zustand
* **HTTP Client**: Axios
* **Validation**: Zod
* **Styling**: Tailwind CSS + shadcn/ui
* **Routing**: React Router 6
* **Form**: React Hook Form (RHF)

---

### Quick Start

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Lars-heilel/frontend.git
    ```
2.  **Navigate to the project directory**:
    ```bash
    cd frontend
    ```
3.  **Install dependencies**:
    ```bash
    npm install 
    ```
4.  **Run the application**:
    ```bash
    npm run dev
    ```

---

### Next Steps

* **Backend Integration**
* **Chat Implementation**
    * WebSocket connection for real-time communication
    * Components for displaying message history
    * New message notifications
    * Message read receipts
* **Friend Management**
    * Friend request sending/receiving system
    * User search by name/email
    * Friend list with online status
* **User Profile**
    * Profile editing (name, description)
    * Activity history

---

### Architecture

* FSD (Feature-Sliced Design)
