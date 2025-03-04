class Contact {
    constructor(firstName, lastName, address, city, state, zip, phoneNumber, email) {
        this.firstName = this.validateName(firstName);
        this.lastName = this.validateName(lastName);
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = this.validateZip(zip);
        this.phoneNumber = this.validatePhone(phoneNumber);
        this.email = this.validateEmail(email);
    }

    validateName(name) {
        let nameRegex = /^[A-Z][a-z]{1,}$/;
        if (!nameRegex.test(name)) {
            throw new Error("Invalid Name: Must start with a capital letter and be at least 2 characters long.");
        }
        return name;
    }

    validateZip(zip) {
        let zipRegex = /^[1-9][0-9]{5}$/;
        if (!zipRegex.test(zip)) {
            throw new Error("Invalid ZIP Code: Must be 6 digits.");
        }
        return zip;
    }

    validatePhone(phoneNumber) {
        let phoneRegex = /^[6-9][0-9]{9}$/;
        if (!phoneRegex.test(phoneNumber)) {
            throw new Error("Invalid Phone Number: Must be 10 digits starting with 6-9.");
        }
        return phoneNumber;
    }

    // Validate Email
    validateEmail(email) {
        let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            throw new Error("Invalid Email Format.");
        }
        return email;
    }
}

// Array to store contacts
let addressBook = [];

// Function to Add Contact
function addContact(contact) {
    addressBook.push(contact);
    console.log("Contact Added Successfully!");
}

// Function to Display All Contacts
function displayContacts() {
    console.log("\n--- Address Book Contacts ---");
    addressBook.forEach((contact, index) => {
        console.log(`${index + 1}. ${contact.firstName} ${contact.lastName} - ${contact.phoneNumber}, ${contact.email}`);
    });
}

// Function to Update Contact by Name
function updateContact(name, updatedData) {
    let contact = addressBook.find(c => c.firstName.toLowerCase() === name.toLowerCase());
    if (contact) {
        Object.assign(contact, updatedData);
        console.log("Contact Updated Successfully!");
    } else {
        console.log("Contact Not Found!");
    }
}

// Function to Delete Contact by Name
function deleteContact(name) {
    let index = addressBook.findIndex(c => c.firstName.toLowerCase() === name.toLowerCase());
    if (index !== -1) {
        addressBook.splice(index, 1);
        console.log("Contact Deleted Successfully!");
    } else {
        console.log("Contact Not Found!");
    }
}

// Test the Program
try {
    let contact1 = new Contact("John", "Doe", "123 Street", "Mumbai", "Maharashtra", "400001", "9876543210", "john.doe@example.com");
    addContact(contact1);
    let contact2 = new Contact("Alice", "Smith", "456 Lane", "Delhi", "Delhi", "110001", "9123456789", "alice.smith@example.com");
    addContact(contact2);

    displayContacts();
    updateContact("John", { city: "Pune", email: "john.new@example.com" });
    displayContacts();
    deleteContact("Alice");
    displayContacts();
} catch (error) {
    console.error(error.message);
}
