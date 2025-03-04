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

    toString() {
        return `${this.firstName} ${this.lastName} | ${this.address}, ${this.city}, ${this.state} | ZIP: ${this.zip} | Phone: ${this.phoneNumber} | Email: ${this.email}`;
    }
}

class AddressBook {
    constructor() {
        this.contacts = [];
    }

    addContact(contact) {
        if (this.contacts.some(c => c.firstName.toLowerCase() === contact.firstName.toLowerCase())) {
            console.log(`Duplicate Contact: ${contact.firstName} already exists.`);
            return;
        }
        this.contacts.push(contact);
        console.log("Contact Added Successfully!");
    }

    displayContacts() {
        console.log("\n--- Address Book Contacts ---");
        this.contacts.forEach(contact => console.log(contact.toString()));
    }

    sortContactsByName() {
        this.contacts.sort((a, b) => a.firstName.localeCompare(b.firstName));
        console.log("\nSorted Address Book Entries:");
        this.displayContacts();
    }
}

let addressBook = new AddressBook();

try {
    let contact1 = new Contact("Mokshini", "Baglekar", "Ahinsa Vihar", "Bhopal", "Madhya Pradesh", "400001", "9301000083", "mokshini.baglekar@gmail.com");
    let contact2 = new Contact("Bhavesh", "Malviya", "Vijay Nagar", "Indore", "Madhya Pradesh", "110001", "7690000686", "bhavesh.malviya@gmail.com");
    let contact3 = new Contact("Rohan", "Sharma", "Kolar", "Bhopal", "Madhya Pradesh", "400002", "9826000011", "rohan.sharma@gmail.com");
    let contact4 = new Contact("Aisha", "Khan", "Hinjewadi", "Pune", "Maharashtra", "411057", "9922000022", "aisha.khan@gmail.com");

    addressBook.addContact(contact1);
    addressBook.addContact(contact2);
    addressBook.addContact(contact3);
    addressBook.addContact(contact4);

    addressBook.displayContacts();
    addressBook.sortContactsByName();
} catch (error) {
    console.error(error.message);
}
