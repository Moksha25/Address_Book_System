class Contact {
    constructor(firstName, lastName, address, city, state, zip, phoneNumber, email) {
        this.firstName = this.validateName(firstName, "First Name");
        this.lastName = this.validateName(lastName, "Last Name");
        this.address = this.validateAddress(address, "Address");
        this.city = this.validateAddress(city, "City");
        this.state = this.validateAddress(state, "State");
        this.zip = this.validateZip(zip);
        this.phoneNumber = this.validatePhone(phoneNumber);
        this.email = this.validateEmail(email);
    }

    validateName(name, fieldName) {
        let nameRegex = /^[A-Z][a-zA-Z]{2,}$/;
        if (!nameRegex.test(name)) {
            throw new Error(`${fieldName} Invalid: Must start with a capital letter and be at least 3 characters long.`);
        }
        return name;
    }

    validateAddress(value, fieldName) {
        if (value.length < 4) {
            throw new Error(`${fieldName} Invalid: Must be at least 4 characters long.`);
        }
        return value;
    }

    validateZip(zip) {
        let zipRegex = /^[1-9][0-9]{5}$/;
        if (!zipRegex.test(zip)) {
            throw new Error("Invalid ZIP Code: Must be a 6-digit number.");
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

    validateEmail(email) {
        let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            throw new Error("Invalid Email Format.");
        }
        return email;
    }
}

let addressBook = [];

function addContact(contact) {
    addressBook.push(contact);
    console.log("Contact Added Successfully!");
}

function displayContacts() {
    console.log("\n--- Address Book Contacts ---");
    addressBook.forEach((contact, index) => {
        console.log(`${index + 1}. ${contact.firstName} ${contact.lastName} - ${contact.phoneNumber}, ${contact.email}`);
    });
}

function updateContact(name, updatedData) {
    let contact = addressBook.find(c => c.firstName.toLowerCase() === name.toLowerCase());
    if (contact) {
        Object.keys(updatedData).forEach(key => {
            try {
                contact[key] = contact[`validate${key.charAt(0).toUpperCase() + key.slice(1)}`](updatedData[key]);
            } catch (error) {
                console.error(error.message);
            }
        });
        console.log("Contact Updated Successfully!");
    } else {
        console.log("Contact Not Found!");
    }
}

function deleteContact(name) {
    let index = addressBook.findIndex(c => c.firstName.toLowerCase() === name.toLowerCase());
    if (index !== -1) {
        addressBook.splice(index, 1);
        console.log("Contact Deleted Successfully!");
    } else {
        console.log("Contact Not Found!");
    }
}

try {
    let contact1 = new Contact("Mokshini", "Baglekar", "Ahinsa vihar", "Bhopal", "Madhya Pradesh", "400001", "9301000083", "mokshini.baglekar@gmail.com");
    addContact(contact1);

    let contact2 = new Contact("Bhavesh", "Malviya", "Vijay nagar", "Indore", "Indore", "110001", "7690000686", "bhavesh.malviya@gmail.com");
    addContact(contact2);

    displayContacts();

    updateContact("Pallavi", { city: "Bhopal", email: "pallavi.parihar@gmail.com" });
    displayContacts();

    deleteContact("pallavi");
    displayContacts();
} catch (error) {
    console.error(error.message);
}
