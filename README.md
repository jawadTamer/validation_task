# 🧠 Smart Dynamic Form – Angular Challenge

This project is a solution to the "**Evil Manager and the Long Form**" task, where you're asked to build a form with 20 fields and individual validation — but you're smarter than that! 😎

Instead of manually building each input and writing 20 separate validation rules, this project uses a **dynamic and reusable approach** using Angular.

---

## 🚀 Features

- 🧩 20 dynamic form fields generated from a single config array
- ✅ Real-time validation with helpful error messages
- 💡 Clean, scalable, and reusable code
- 🎨 Styled using **Bootstrap** and **Angular Material**
- 💬 Sweet alert popups using **SweetAlert2**

---

## 🛠️ Tech Stack

| Tool             | Purpose                          |
|------------------|----------------------------------|
| Angular          | Main framework                   |
| Angular Material | UI components                    |
| Bootstrap        | Layout and styling               |
| SweetAlert2      | Success/Error popups             |
| Reactive Forms   | Form building and validation     |

---

## 📦 Installation

Follow these steps to run the project locally:

```bash
# 1. Clone the repo or create the project
ng new smart-form --standalone
cd smart-form

# 2. Install dependencies
npm install bootstrap sweetalert2
ng add @angular/material

# 3. Add Bootstrap to angular.json
# under "styles":
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.css"
]

# 4. Serve the project
ng serve
```
# ✅ How the Task Was Solved
The form was generated dynamically using a single array of field definitions. Each field specifies its own name, type, label, and list of validators.

Instead of creating 20 manual FormControl instances, a loop builds the entire FormGroup programmatically. In the template, *ngFor is used to render each field dynamically based on its configuration.

A key challenge during implementation was that some fields had optional or missing validators, which caused Angular’s FormBuilder.control to throw an overload error. This was solved by filtering out any falsy values and explicitly casting the validator list as ValidatorFn[] before use.

This approach made the form:

=✅ Easy to scale

=🔁 Fully reusable

=🧼 Clean and maintainable


